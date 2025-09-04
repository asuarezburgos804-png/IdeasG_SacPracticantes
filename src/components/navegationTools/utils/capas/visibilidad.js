import { getRenderPixel } from "ol/render.js";
import { crearArchivoShape, crearTablaExcelCapas, zoomByBoxTable } from "@/app/services/espaciales/espaciales";
import environment from "@/config/enviroment";
import { transformExtent } from "ol/proj";

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Fill } from 'ol/style';
import Polygon from 'ol/geom/Polygon';
import Feature from 'ol/Feature';

/**
 * Dibuja un rectángulo del extent en el mapa.
 * @param {ol.Map} map - Mapa de OpenLayers.
 * @param {Array<number>} extent - [minX, minY, maxX, maxY].
 */



const changeVisibleMassive = (map, id_c, pertenece,visible,setLayersChecked) => {
    const layers = map.getLayers().getArray();
    layers.forEach(item => {    
      if (item.getProperties().pertenece === pertenece && item.getProperties().id_capa === id_c) {     
        item.setVisible(visible);

        setLayersChecked(prev => 
          prev.map(layer => 
            layer.id_capa === id_c && layer.pertenece === pertenece ? { ...layer, visible: visible } : layer
          )
        );
      }
    });
  };

  export const changeVisibleCapaSuperGrupo = (map,id_sg,layersChecked,setLayersChecked) => {
    const currentVisible = layersChecked.some(layer => 
      layer.id_sg === id_sg && 
      layer.visible
    )
    const lista = layersChecked.filter((item)=>item.id_sg == id_sg)
    lista.map((item)=>changeVisibleMassive(map, item.id_capa,item.pertenece,!currentVisible,setLayersChecked))
  }

  export const changeVisibleCapaGrupo = (map,id_grupo,layersChecked,setLayersChecked) => {
    const currentVisible = layersChecked.some(layer => 
      layer.id_grupo === id_grupo && 
      layer.pertenece === 'grupo' && 
      layer.visible
    )

    const lista = layersChecked.filter((item)=>item.id_grupo == id_grupo && item.pertenece== 'grupo')
    lista.map((item)=>changeVisibleMassive(map, item.id_capa,item.pertenece,!currentVisible,setLayersChecked))
  }

  export const changeVisibleCapa = (id_c, pertenece, map, setLayersChecked) => {    
    const layers = map.getLayers().getArray();
    layers.forEach(item => {
      if (item.getProperties().pertenece === pertenece && item.getProperties().id_capa === id_c) {    
        console.log(item.getProperties());
         
        const currentVisibility = item.getVisible();
        item.setVisible(!currentVisibility);
        setLayersChecked(prev => 
          prev.map(layer => 
            layer.id_capa === id_c && layer.pertenece === pertenece ? { ...layer, visible: !currentVisibility } : layer
          )
        );
      }
    });
  };

  export const changeOpacity = (map,opa, id_c, pertenece, setLayersChecked) => {
    setLayersChecked(prev =>
      prev.map(layer => 
        layer.id_capa === id_c && layer.pertenece === pertenece
          ? { ...layer, n_opacity: opa }
          : layer
      )
    );
    
    // Asumiendo que también quieres actualizar la opacidad en el mapa en sí:
    const layers = map.getLayers().getArray();
    layers.forEach(item => {
      if (item.getProperties().id_capa === id_c && item.getProperties().pertenece === pertenece) {
        item.setOpacity(parseFloat(opa));
      }
    });
  };

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

  async function obtenerExtentWMS(url, layerName) {
    const capabilitiesUrl = `${url}?SERVICE=WMS&REQUEST=GetCapabilities`;
    console.log("obtenerExtentWMS", capabilitiesUrl, layerName);
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
        if (name === layerName) {
          const boundingBoxes = element.getElementsByTagName('BoundingBox');
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
  
  function polygonFromExtent(extent) {
  return new Polygon([[
    [extent[0], extent[1]],
    [extent[0], extent[3]],
    [extent[2], extent[3]],
    [extent[2], extent[1]],
    [extent[0], extent[1]], // cerrar el polígono
  ]]);
}

  function dibujarExtent(map, extent) {
  // Limpiar capas anteriores si deseas
  const layers = map.getLayers().getArray();
  const existing = layers.find(l => l.get('name') === 'extentLayer');
  if (existing) map.removeLayer(existing);

  const polygon = polygonFromExtent(extent);
  const feature = new Feature(polygon);

  const vectorSource = new VectorSource({
    features: [feature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.1)',
      }),
    }),
  });

  vectorLayer.set('name', 'extentLayer'); // para poder eliminarlo luego si deseas
  map.addLayer(vectorLayer);
}

  export async function zoomLayer(map, cliente, layerName, dataCliente) {
    console.log( dataCliente)
    console.log("zoomLayer", cliente, layerName);
    const geoserver = cliente.servidor_gs;
    const workspace  = cliente.workspace;
    const extent = await obtenerExtentWMS(`${geoserver}/${workspace}/wms`, layerName);
    // dibujarExtent(map, extent);
    if (extent) {
      map.getView().fit(extent);
    } else {
      console.log("No se pudo obtener la extensión.");
    }
  }

  export function descargarExcel(esquema,layer) {
    const body = {
      esquema,
      layer: layer,
    };
    crearTablaExcelCapas(body);
  }

  export async function descargarShape(workspace,layer) {
    const geoserver = environment.geoserver + "/wms";
    // const workspace = environment.workSpace;
    const body = {
      geoserver: geoserver,
      workspace: workspace,
      layer: layer,
      simbolo: "",
      column: "",
      inputBt: "",
    };
    crearArchivoShape(body);
    try {
      // shpwrite.download(geojson, options);
    } catch (error) {
      console.error("Error al generar el archivo Shapefile:", error);
    }
  }

  export const changeSwipe = (map,swipeValue, id_c, pertenece, setLayersChecked) => {
    setLayersChecked(prev =>
      prev.map(layer => 
        layer.id_capa === id_c && layer.pertenece === pertenece
          ? { ...layer, n_swipe: swipeValue }
          : layer
      )
    );
    
    const arrayCapas = map.getLayers().getArray();
    arrayCapas.map((e) => {
      if ( e.getProperties().id_capa === id_c && e.getProperties().pertenece === pertenece) {
        // console.log(e);
        e.on("prerender", function (event) {
          const ctx = event.context;
          ctx.restore();
          const mapSize = map.getSize();
          const width = mapSize[0] * parseFloat(swipeValue);
          const tl = getRenderPixel(event, [width, 0]);
          const tr = getRenderPixel(event, [mapSize[0], 0]);
          const bl = getRenderPixel(event, [width, mapSize[1]]);
          const br = getRenderPixel(event, mapSize);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tl[0], tl[1]);
          ctx.lineTo(bl[0], bl[1]);
          ctx.lineTo(br[0], br[1]);
          ctx.lineTo(tr[0], tr[1]);
          ctx.closePath();
          ctx.clip();
        });
        e.on("postrender", function (event) {
          const ctx = event.context;
          ctx.restore();
        });
        map.render();
      }
    });
  };