import { getDataGjsonWFSFullParams } from "@/app/services/espaciales/espaciales";
import environment from "@/config/enviroment";
import { transformExtent } from "ol/proj";

const getCrs = async (geoserver, layer,workspace) => {
    const wfsUrl = `${geoserver}/${workspace}/wfs`;
    const params = {
        typeName: workspace + ":" + layer,
        outputFormat: "application/json",
        maxFeatures: 1
    }
    const response  = await getDataGjsonWFSFullParams(wfsUrl,params);
    if (!response?.crs) {
        return "EPSG:4326"
    }
    const name = response.crs.properties.name;
    const segments = name .split(':');
    return segments[4]+':'+segments[6];
}

async function obtenerExtentWMS(url, layerName) {
    const capabilitiesUrl = `${url}?SERVICE=WMS&REQUEST=GetCapabilities`;
    try {
        const response = await fetch(capabilitiesUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const layers = xmlDoc.getElementsByTagName('Layer');

        let bboxReturned = null;
        
        // Itera correctamente sobre los nodos con for...of
        for (const element of layers) {
        const name = element.getElementsByTagName('Name')[0].textContent;
        console.log(layerName);
        
        if (name === layerName) {
            const boundingBoxes = element.getElementsByTagName('BoundingBox');
            console.log(boundingBoxes);
            
            let bbox = null;
            // Itera correctamente sobre los BoundingBox con for...of
            for (const box of boundingBoxes) {
            const crs = box.getAttribute('CRS');
            if (crs === 'CRS:84') {
                bbox = box;
                break;
            }
            }
            
            if (bbox) {
            const minx = parseFloat(bbox.getAttribute('minx'));
            const miny = parseFloat(bbox.getAttribute('miny'));
            const maxx = parseFloat(bbox.getAttribute('maxx'));
            const maxy = parseFloat(bbox.getAttribute('maxy'));

            // La extensión en EPSG:4326
            const extent4326 = [minx, miny, maxx, maxy];
            console.log(extent4326);
            
            // Verifica si la extensión es válida
            if (isValidExtent(extent4326)) {
                console.log("Extent is valid:", extent4326);
                bboxReturned = transformExtent(extent4326, 'EPSG:4326', 'EPSG:3857');
                return bboxReturned; // Devuelve la extensión transformada en este punto
            }
            }
        }
        }
        return bboxReturned; // Devuelve null si no se encuentra o es inválido
    } catch (error) {
        console.error("Error al obtener GetCapabilities:", error);
        return null;
    }
}

function isValidExtent(extent) {
    if (!Array.isArray(extent) || extent.length !== 4) {
      console.error("Invalid extent format.");
      return false;
    }
  
    const [minX, minY, maxX, maxY] = extent;
  
    // Verifica que los valores no sean NaN (Not-a-Number)
    if (extent.some(value => value === 0)) {
      console.error("Extent contains 0 values.");
      return false;
    }
  
    // Verifica que los valores no sean NaN (Not-a-Number)
    if (isNaN(minX) || isNaN(minY) || isNaN(maxX) || isNaN(maxY)) {
      console.error("Extent contains NaN values.");
      return false;
    }
  
    // Verifica que los valores sean números finitos
    if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
      console.error("Extent contains non-finite numbers.");
      return false;
    }
  
    // Verifica que minX < maxX y minY < maxY
    if (minX >= maxX || minY >= maxY) {
      console.error("Extent has invalid coordinates (minX should be less than maxX and minY should be less than maxY).");
      return false;
    }
  
    // Opcional: Verifica que los valores estén dentro de un rango razonable
    // Puedes ajustar los rangos según tus necesidades específicas
    const MIN_LONGITUDE = -180;
    const MAX_LONGITUDE = 180;
    const MIN_LATITUDE = -90;
    const MAX_LATITUDE = 90;
  
    if (minX < MIN_LONGITUDE || maxX > MAX_LONGITUDE ||
        minY < MIN_LATITUDE || maxY > MAX_LATITUDE) {
      console.error("Extent is out of valid geographic range.");
      return false;
    }
  
    return true;
}

export async function handleDownload(layerName, outputFormat, cliente) {
    try {
      const crs = await getCrs(cliente.servidor_gs, layerName, cliente.workspace);
      const extent = await obtenerExtentWMS(`${cliente.servidor_gs}/${cliente.workspace}/wms`, layerName);
      const transformedCoords = transformExtent(extent, 'EPSG:3857', crs);
      const bbox = transformedCoords.join(',');
  
      // Construcción dinámica de la URL del endpoint en Next.js
      const params = new URLSearchParams({
        geoserver: cliente.servidor_gs,
        workspace: cliente.workspace,
        user_geoserver: cliente.usuario_gs,
        pass_geoserver: cliente.contrasena_gs,
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: layerName,
        outputFormat: outputFormat,
        bbox: bbox,
        srsName: 'EPSG:4326'
      });

      const downloadUrl = `/api/geoserver?${params.toString()}`;
      window.open(downloadUrl, '_blank'); // Abre en una nueva pestaña o inicia la descarga
  
    } catch (error) {
      console.error("Error al generar la URL de descarga:", error);
    }
}
