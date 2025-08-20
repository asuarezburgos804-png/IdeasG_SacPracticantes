import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Circle as CircleStyle, Fill, Text} from "ol/style";
import { GeoJSON } from "ol/format";
import WKT from "ol/format/WKT";
import { getDataGjsonFull } from "@/app/services/espaciales/espaciales";

export const eliminarGeometria = function (map) {
// console.log(mapa);
    map
    .getLayers()
    .getArray()
    .filter((layer) => layer.layer_type === "vector-ubicacion-ubigeo")
    .forEach((layer) => map.removeLayer(layer));
};

export const ubicarLineas = async function (url, map) {
    console.log(url);
    
    eliminarGeometria(map);
    const result = await getDataGjsonFull(url);
    const projCrs = result.crs.properties.name.split(':');
    const projOriginalDetected = `EPSG:${projCrs[6]}`;

    var vectorSource = new VectorSource();
    const features = new GeoJSON().readFeaturesFromObject(result);
    features.forEach((feature) => {
      feature.getGeometry().transform(projOriginalDetected, "EPSG:3857");
    });
    
    vectorSource.once("change", function (event) {
      if (vectorSource.getState() === "ready") {
        var extent = vectorSource.getExtent();
        if (
          extent[0] !== Infinity &&
          extent[1] !== Infinity &&
          extent[2] !== -Infinity &&
          extent[3] !== -Infinity
        ) {
          map.getView().fit(extent);
        } else {
          console.log("La extensión del GeoJSON es inválida.");
        }
      }
    });

    vectorSource.addFeatures(features);
    var vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "#34e1eb",
          width: 3,
        }),
      }),
    });
    vectorLayer.layer_type = "vector-ubicacion-ubigeo";
    
    // Agregar metadatos útiles al layer
    vectorLayer.set('originalSRS', projOriginalDetected);
    vectorLayer.set('geoJsonData', result);
    
    map.addLayer(vectorLayer);
    
    // RETORNAR el vector layer junto con los datos originales
    return {
        vectorLayer: vectorLayer,
        features: features,
        originalGeoJson: result,
        originalSRS: projOriginalDetected
    };
};

const eliminarLotesEtiquetados = function (map) {
    map
    .getLayers()
    .getArray()
    .filter((layer) => layer.layer_type === "vector-lotes-etiquetados")
    .forEach((layer) => map.removeLayer(layer));
};

// NUEVA FUNCIÓN: Dibujar lotes con etiquetas de texto
export const dibujarLotesConEtiquetas = async function (url, map, projOriginal = "EPSG:4326") {
    console.log("Dibujando lotes con etiquetas:", url);
    
    // Limpiar capas anteriores de lotes etiquetados
    eliminarLotesEtiquetados(map);
    
    try {
        const result = await getDataGjsonFull(url);
        
        // Detectar proyección original
        let projOriginalDetected = projOriginal;
        if (result.crs && result.crs.properties && result.crs.properties.name) {
            const projCrs = result.crs.properties.name.split(':');
            projOriginalDetected = `EPSG:${projCrs[6]}`;
        }

        const vectorSource = new VectorSource();
        const features = new GeoJSON().readFeaturesFromObject(result);
        
        // Transformar geometrías y preparar features
        features.forEach((feature) => {
            feature.getGeometry().transform(projOriginalDetected, "EPSG:3857");
        });

        vectorSource.addFeatures(features);

        // Crear capa con estilo personalizado que incluye texto
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: function(feature) {
                const properties = feature.getProperties();
                const codigoLote = properties.c_cod_lote || properties.codigo || 'N/A';
                
                return new Style({
                    stroke: new Stroke({
                        color: '#00bcd4', // Celeste
                        width: 2,
                    }),
                    fill: new Fill({
                        color: 'rgba(0, 188, 212, 0.1)', // Celeste transparente
                    }),
                    text: new Text({
                        text: codigoLote,
                        font: 'bold 12px Arial',
                        fill: new Fill({
                            color: '#000000', // Negro
                        }),
                        stroke: new Stroke({
                            color: '#ffffff', // Borde blanco para legibilidad
                            width: 2,
                        }),
                        offsetY: 0,
                    }),
                });
            }
        });

        vectorLayer.layer_type = "vector-lotes-etiquetados";

        // Agregar metadatos útiles al layer
        vectorLayer.set('originalSRS', projOriginalDetected);
        vectorLayer.set('geoJsonData', result);
        
        map.addLayer(vectorLayer);

        // Ajustar vista al extent de los lotes
        const extent = vectorSource.getExtent();
        if (
            extent[0] !== Infinity &&
            extent[1] !== Infinity &&
            extent[2] !== -Infinity &&
            extent[3] !== -Infinity
        ) {
            map.getView().fit(extent, { padding: [20, 20, 20, 20] });
        }

        return {
            layer: vectorLayer,
            vectorLayer: vectorLayer,
            features: features,
            originalGeoJson: result,
            originalSRS: projOriginalDetected
        };

    } catch (error) {
        console.error("Error al dibujar lotes con etiquetas:", error);
        return null;
    }
};