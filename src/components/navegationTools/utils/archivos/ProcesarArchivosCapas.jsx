import JSZip from "jszip";
import { read } from "shapefile";
import KML from "ol/format/KML";
import { GeoJSON } from "ol/format";
import { transform } from "ol/proj";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import wktParser from 'wkt-parser';
import * as DxfParser from 'dxf-parser';

export class FileProcessor {
  
  // Procesa archivos Shapefile (.zip)
  static async processShapefile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const fileBuffer = e.target.result;
          const zip = new JSZip();
          const archive = await zip.loadAsync(fileBuffer);
          const extractedFiles = [];

          archive.forEach((relativePath, file) => {
            extractedFiles.push(
              file.async("arraybuffer").then((content) => ({
                name: file.name,
                content,
              }))
            );
          });

          const files = await Promise.all(extractedFiles);
          const shpFile = files.find((file) => file.name.endsWith(".shp"));
          const dbfFile = files.find((file) => file.name.endsWith(".dbf"));
          const prjFile = files.find((file) => file.name.endsWith(".prj"));

          if (!shpFile || !dbfFile || !prjFile) {
            throw new Error("El archivo ZIP debe contener .shp, .dbf y .prj");
          }

          const shpBuffer = shpFile.content;
          const dbfBuffer = dbfFile.content;
          const prjBuffer = prjFile.content;
          const decoder = new TextDecoder();
          const prjCode = decoder.decode(prjBuffer);

          // Detecta el SRS original del .prj
          const origen = this.getEpsgFromPrj(prjCode) || "4326";
          proj4.defs(origen, prjCode);
          register(proj4);

          // Lee el shapefile
          const shp = await read(shpBuffer, dbfBuffer, prjBuffer);

          const result = {
            success: true,
            originalSRS: origen,
            originalFeatures: shp.features,
            transformedFeatures: this.transformFeatures(shp.features, origen, "EPSG:3857"),
            fileType: "shapefile"
          };

          resolve(result);
        } catch (error) {
          reject({
            success: false,
            error: error.message,
            fileType: "shapefile"
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // Procesa archivos GeoJSON
  static async processGeoJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const geojsonData = e.target.result;
          const geojsonObject = JSON.parse(geojsonData);

          const origen = this.detectEpsgFromGeoJSON(geojsonObject);
          const originalFeatures = geojsonObject.features;
          const transformedFeatures = this.transformGeoJSONFeatures(geojsonObject, origen);

          const result = {
            success: true,
            originalSRS: origen,
            originalFeatures,
            transformedFeatures,
            fileType: "geojson"
          };

          resolve(result);
        } catch (error) {
          reject({
            success: false,
            error: error.message,
            fileType: "geojson"
          });
        }
      };

      reader.readAsText(file);
    });
  }

  // Procesa archivos KML
  static async processKML(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const kmlData = e.target.result;
          const origen = this.detectEpsgFromKML(kmlData);
          
          const kmlFormat = new KML();
          const geoJSONFormat = new GeoJSON();

          // Leer sin reproyección para obtener features originales
          const originalFeaturesRaw = kmlFormat.readFeatures(kmlData, {
            dataProjection: `EPSG:${origen}`,
            featureProjection: `EPSG:${origen}`,
          });

          const originalGeojsonData = geoJSONFormat.writeFeatures(originalFeaturesRaw);
          const originalGeojsonObject = JSON.parse(originalGeojsonData);
          const originalFeatures = this.cleanZCoordinates(originalGeojsonObject);

          // Leer con reproyección a EPSG:3857
          const featuresKml = kmlFormat.readFeatures(kmlData, {
            dataProjection: `EPSG:${origen}`,
            featureProjection: "EPSG:3857",
          });

          const geojsonData = geoJSONFormat.writeFeatures(featuresKml);
          const geojsonObject = JSON.parse(geojsonData);
          const transformedFeatures = this.cleanZCoordinates(geojsonObject);

          const result = {
            success: true,
            originalSRS: origen,
            originalFeatures,
            transformedFeatures,
            fileType: "kml"
          };

          resolve(result);
        } catch (error) {
          reject({
            success: false,
            error: error.message,
            fileType: "kml"
          });
        }
      };

      reader.readAsText(file);
    });
  }

  // Procesa archivos CSV
  static async processCSV(file, columnaX, columnaY, selectedSRS = "4326") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvData = e.target.result;
          const rows = csvData.trim().split("\n");
          const headers = rows[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
          const idxX = headers.indexOf(columnaX);
          const idxY = headers.indexOf(columnaY);

          if (idxX === -1 || idxY === -1) {
            throw new Error("Los nombres de columnas X o Y no coinciden con los del CSV.");
          }

          const geojsonFeatures4326 = [];

          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(",").map(cell => cell.trim().replace(/^"|"$/g, ""));
            const lat = parseFloat(row[idxY]);
            const lon = parseFloat(row[idxX]);

            if (isNaN(lat) || isNaN(lon)) continue;

            let coords = [lon, lat];
            if (selectedSRS !== "4326") {
              coords = proj4("EPSG:" + selectedSRS, "EPSG:4326", coords);
            }

            const feature = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coords,
              },
              properties: {
                ...headers.reduce((obj, key, idx) => {
                  obj[key] = row[idx];
                  return obj;
                }, {}),
              },
            };

            geojsonFeatures4326.push(feature);
          }

          const originalFeatures = geojsonFeatures4326.map(f => ({ ...f }));

          // Transformar a EPSG:3857 para visualización
          const transformedFeatures = geojsonFeatures4326.map(f => {
            const [lon, lat] = f.geometry.coordinates;
            const coords3857 = proj4("EPSG:4326", "EPSG:3857", [lon, lat]);

            return {
              ...f,
              geometry: {
                ...f.geometry,
                coordinates: coords3857,
              },
            };
          });

          const result = {
            success: true,
            originalSRS: selectedSRS,
            originalFeatures,
            transformedFeatures,
            fileType: "csv",
            headers
          };

          resolve(result);
        } catch (error) {
          reject({
            success: false,
            error: error.message,
            fileType: "csv"
          });
        }
      };

      reader.readAsText(file);
    });
  }

  // REEMPLAZAR todo el método processDXF y las funciones auxiliares con esta versión limpia:

// Procesa archivos DXF
static async processDXF(file, srs = "32718") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const dxfData = e.target.result;
        
        console.log('📄 Procesando archivo DXF...');
        console.log(`🗺️ SRS especificado: EPSG:${srs}`);
        
        // Parsear entidades HATCH del archivo
        const hatchEntities = this.extractHatchEntities(dxfData);
        console.log(`✅ Encontradas ${hatchEntities.length} entidades HATCH`);
        
        if (hatchEntities.length === 0) {
          throw new Error('No se encontraron polígonos HATCH en el archivo DXF');
        }
        
        // Convertir a features GeoJSON
        const originalFeatures = this.convertHatchesToGeoJSON(hatchEntities);
        console.log(`✅ Creados ${originalFeatures.length} polígonos`);
        
        // Transformar coordenadas para visualización usando el SRS especificado
        const transformedFeatures = this.transformDXFFeatures(originalFeatures, srs);
        
        const result = {
          success: true,
          originalSRS: srs,
          originalFeatures,
          transformedFeatures,
          fileType: "dxf"
        };
        
        resolve(result);
        
      } catch (error) {
        console.error('❌ Error procesando DXF:', error);
        reject({
          success: false,
          error: error.message,
          fileType: "dxf"
        });
      }
    };

    reader.readAsText(file);
  });
}

// Extrae las coordenadas EXTMIN/EXTMAX del header
static extractDXFExtents(dxfText) {
  const lines = dxfText.split('\n').map(line => line.trim());
  let extents = null;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '$EXTMIN') {
      // Buscar coordenadas EXTMIN
      let j = i + 1;
      let minX = null, minY = null;
      
      while (j < lines.length && lines[j] !== '$EXTMAX') {
        if (lines[j] === '10') minX = parseFloat(lines[j + 1]);
        if (lines[j] === '20') minY = parseFloat(lines[j + 1]);
        j++;
      }
      
      // Buscar coordenadas EXTMAX
      let maxX = null, maxY = null;
      while (j < lines.length && !lines[j].startsWith('$') && lines[j] !== '0') {
        if (lines[j] === '10') maxX = parseFloat(lines[j + 1]);
        if (lines[j] === '20') maxY = parseFloat(lines[j + 1]);
        j++;
      }
      
      if (minX !== null && minY !== null && maxX !== null && maxY !== null) {
        extents = { minX, minY, maxX, maxY };
        break;
      }
    }
  }
  
  return extents;
}

// Modifica extractHatchEntities para aceptar extents
static extractHatchEntities(dxfText) {
  const entities = [];
  const lines = dxfText.split('\n').map(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === 'HATCH') {
      const entity = this.parseHatchEntity(lines, i);
      if (entity && entity.vertices.length > 2) {
        entities.push(entity);
      }
    }
  }
  
  return entities;
}

// Modifica parseHatchEntity para usar extents dinámicos
static parseHatchEntity(lines, startIndex) {
  const entity = {
    type: 'HATCH',
    vertices: [],
    handle: null,
    layer: '0'
  };
  
  let i = startIndex + 1;
  let currentX = null;
  
  while (i < lines.length && lines[i] !== '0') {
    const code = lines[i];
    const value = i + 1 < lines.length ? lines[i + 1] : '';
    
    switch (code) {
      case '5':  // Handle
        entity.handle = value;
        break;
      case '8':  // Layer
        entity.layer = value;
        break;
      case '10': // Coordenada X
        currentX = parseFloat(value);
        break;
      case '20': // Coordenada Y
        const y = parseFloat(value);
        if (currentX !== null && this.isValidCoordinate(currentX, y)) {
          entity.vertices.push({ x: currentX, y });
          currentX = null;
        }
        break;
    }
    
    i += 2;
  }
  
  return entity;
}

// OPCIÓN 1: Rango ampliado fijo para cubrir todos los lotes
static isValidCoordinate(x, y) {
  // Solo filtrar coordenadas problemáticas básicas
  return !(x === 0 && y === 0) &&           // Evitar (0,0)
         !isNaN(x) && !isNaN(y) &&          // Evitar NaN
         isFinite(x) && isFinite(y);        // Evitar Infinity
}

// Convierte entidades HATCH a features GeoJSON
static convertHatchesToGeoJSON(hatchEntities) {
  const features = [];
  
  hatchEntities.forEach((entity, index) => {
    const coordinates = entity.vertices.map(v => [v.x, v.y]);
    
    // Cerrar polígono si es necesario
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      coordinates.push([first[0], first[1]]);
    }
    
    const feature = {
      type: "Feature",
      id: index + 1,
      geometry: {
        type: "Polygon",
        coordinates: [coordinates]
      },
      properties: {
        id: index + 1,
        layer: entity.layer,
        source: "DXF_HATCH",
        originalId: entity.handle,
        vertices: entity.vertices.length
      }
    };
    
    features.push(feature);
  });
  
  return features;
}

// Transforma coordenadas DXF a Web Mercator para visualización
static transformDXFFeatures(features, sourceSRS = "32718") {
  return features.map(feature => {
    const coords = feature.geometry.coordinates[0];
    const transformedCoords = coords.map(coord => 
      proj4(`EPSG:${sourceSRS}`, "EPSG:3857", coord)
    );
    
    return {
      ...feature,
      geometry: {
        ...feature.geometry,
        coordinates: [transformedCoords]
      }
    };
  });
}

  // Extrae headers de archivos CSV
  static async extractCSVHeaders(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.trim().split("\n");
          const headers = lines[0]
            .split(",")
            .map((h) => h.trim().replace(/^"|"$/g, ""));

          const headerObjects = headers.map((h) => ({
            id: h,
            label: h,
          }));

          resolve({
            success: true,
            headers: headerObjects,
            rawHeaders: headers
          });
        } catch (error) {
          reject({
            success: false,
            error: error.message
          });
        }
      };

      reader.readAsText(file);
    });
  }

  // Métodos utilitarios privados
  static getEpsgFromPrj(prjWkt) {
    const parsed = wktParser(prjWkt);
    const name = parsed.name ? parsed.name.toUpperCase() : '';
    const datumCode = parsed.datumCode ? parsed.datumCode.toUpperCase() : '';

    // WGS84
    if (name.includes('WGS') || name.includes('4326') || datumCode.includes('WGS')) {
      return '4326';
    }
    // UTM 17S WGS84
    if (name.includes('UTM') && name.includes('17S') && (name.includes('WGS') || datumCode.includes('WGS'))) {
      return '32717';
    }
    // UTM 18S WGS84
    if (name.includes('UTM') && name.includes('18S') && (name.includes('WGS') || datumCode.includes('WGS'))) {
      return '32718';
    }
    // UTM 19S WGS84
    if (name.includes('UTM') && name.includes('19S') && (name.includes('WGS') || datumCode.includes('WGS'))) {
      return '32719';
    }
    // PSAD56 UTM 17S
    if (name.includes('UTM') && name.includes('17S') && (name.includes('PSAD') || datumCode.includes('PSAD'))) {
      return '24877';
    }
    // PSAD56 UTM 18S
    if (name.includes('UTM') && name.includes('18S') && (name.includes('PSAD') || datumCode.includes('PSAD'))) {
      return '24878';
    }
    // PSAD56 UTM 19S
    if (name.includes('UTM') && name.includes('19S') && (name.includes('PSAD') || datumCode.includes('PSAD'))) {
      return '24879';
    }

    return null;
  }

  static detectEpsgFromGeoJSON(geojsonObject) {
    if (geojsonObject.crs && geojsonObject.crs.properties && geojsonObject.crs.properties.name) {
      const name = geojsonObject.crs.properties.name;

      if (name.includes("EPSG::")) {
        return name.split("EPSG::")[1];
      }
      if (name.includes("EPSG:")) {
        return name.split("EPSG:")[1];
      }
      if (name.includes("CRS84")) {
        return "4326";
      }
    }

    return "4326";
  }

  static detectEpsgFromKML(kmlText) {
    const comentarioMatch = kmlText.match(/EPSG[:=](\d{4,5})/i);
    if (comentarioMatch) {
      return comentarioMatch[1];
    }

    const etiquetaMatch = kmlText.match(/<SimpleData[^>]*>(EPSG:\d{4,5})<\/SimpleData>/i);
    if (etiquetaMatch) {
      return etiquetaMatch[1].split(":")[1];
    }

    const textoPlanoMatch = kmlText.match(/EPSG[:=]?\s?(\d{4,5})/i);
    if (textoPlanoMatch) {
      return textoPlanoMatch[1];
    }

    return "4326";
  }

  static transformFeatures(features, fromSRS, toSRS) {
    return features.map((feature) => {
      const geometryType = feature.geometry.type;
      let transformedCoordinates;

      switch (geometryType) {
        case "Point":
          transformedCoordinates = transform(
            feature.geometry.coordinates,
            fromSRS,
            toSRS
          );
          break;

        case "Polygon":
          transformedCoordinates = feature.geometry.coordinates.map((ring) =>
            ring.map((c) => transform(c, fromSRS, toSRS))
          );
          break;

        case "LineString":
          transformedCoordinates = feature.geometry.coordinates.map((c) =>
            transform(c, fromSRS, toSRS)
          );
          break;

        case "MultiLineString":
        case "MultiPolygon":
          transformedCoordinates = feature.geometry.coordinates.map((multiGeom) =>
            multiGeom.map((ring) => ring.map((c) => transform(c, fromSRS, toSRS)))
          );
          break;

        default:
          console.warn("Tipo de geometría no soportado:", geometryType);
          transformedCoordinates = feature.geometry.coordinates;
      }

      return {
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: transformedCoordinates,
        },
      };
    });
  }

  static transformGeoJSONFeatures(geojson, origen = "4326") {
    return geojson.features
      .filter((feature) => feature.geometry && feature.geometry.coordinates)
      .map((feature) => {
        const geometryType = feature.geometry.type;
        const coordinates = feature.geometry.coordinates;
        let transformedCoordinates;

        const transformar = (coord) => {
          if (origen === "3857") return coord;
          if (origen === "4326") return proj4("EPSG:4326", "EPSG:3857", coord);
          return proj4("EPSG:" + origen, "EPSG:3857", coord);
        };

        if (geometryType === "Point") {
          transformedCoordinates = transformar(coordinates);
        } else if (geometryType === "LineString") {
          transformedCoordinates = coordinates.map(transformar);
        } else if (geometryType === "Polygon") {
          transformedCoordinates = coordinates.map((ring) =>
            ring.map(transformar)
          );
        } else if (geometryType === "MultiLineString") {
          transformedCoordinates = coordinates.map((line) =>
            line.map(transformar)
          );
        } else if (geometryType === "MultiPolygon") {
          transformedCoordinates = coordinates.map((polygon) =>
            polygon.map((ring) => ring.map(transformar))
          );
        } else {
          console.warn("Tipo de geometría no soportado:", geometryType);
          return null;
        }

        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: transformedCoordinates,
          },
        };
      })
      .filter(Boolean);
  }

  static cleanZCoordinates(geojsonObject) {
    const cleanFeatures = geojsonObject.features.map((feature) => {
      const geom = feature.geometry;
      const tipo = geom.type;

      if (!geom || !geom.coordinates) return feature;

      if (tipo === "Point") {
        geom.coordinates = geom.coordinates.slice(0, 2);
      } else if (tipo === "LineString" || tipo === "MultiPoint") {
        geom.coordinates = geom.coordinates.map((coord) => coord.slice(0, 2));
      } else if (tipo === "Polygon" || tipo === "MultiLineString") {
        geom.coordinates = geom.coordinates.map((ring) =>
          ring.map((coord) => coord.slice(0, 2))
        );
      } else if (tipo === "MultiPolygon") {
        geom.coordinates = geom.coordinates.map((poly) =>
          poly.map((ring) =>
            ring.map((coord) => coord.slice(0, 2))
          )
        );
      }

      return feature;
    });

    return cleanFeatures;
  }
}