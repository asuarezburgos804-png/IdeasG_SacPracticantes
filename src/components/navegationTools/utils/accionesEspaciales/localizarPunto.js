import { Style, Stroke, Fill, Text, Icon, Circle as CircleStyle } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { transform } from "ol/proj";

const createTextStyle = function (text) {
  const alignS = "center";
  const baselineS = "middle";
  const sizeS = "12px";
  const heightS = "1";
  const offsetXS = parseInt("0", 10);
  const offsetYS = parseInt("0", 10);
  const weightS = "normal";
  const placementS = "point";
  const maxAngleS = "0.7853981633974483";
  const overflowS = "false";
  const font = "Arial";
  const rotationS = parseFloat("0");
  if (font === "'Open Sans'" && !openSansAdded) {
    const openSans = document.createElement("link");
    openSans.href = "https://fonts.googleapis.com/css?family=Open+Sans";
    openSans.rel = "stylesheet";
    document.head.appendChild(openSans);
    openSansAdded = true;
  }
  const fontS = weightS + " " + sizeS + "/" + heightS + " " + font;
  const fillColor = "#ffffff";
  const outlineColor = "#282828";
  const outlineWidthS = parseInt("3", 10);
  var colorOutText = new Stroke({
    color: outlineColor,
    width: outlineWidthS,
  });
  const textStyle = new Text({
    font: fontS,
    textBaseline: baselineS,
    text: text,
    textAlign: alignS === "" ? undefined : alignS,
    fill: new Fill({ color: fillColor }),
    offsetX: offsetXS,
    offsetY: offsetYS,
    placement: placementS,
    maxAngle: maxAngleS,
    overflow: overflowS,
    rotation: rotationS,
    stroke: colorOutText,
  });
  return textStyle;
};

function lineStyleTextoFunction(feature, resolution, text) {
  return new Style({
    text: createTextStyle(text),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  });
}

function lineStyleTextoFunctionSimbolo(feature, resolution, text) {
  return new Style({
    text: createTextStyle(text),
    image: new Icon({
      src: '../../assets/images/map/pngwing.png', // Reemplaza 'URL_DEL_ICONO' con la URL del icono que deseas utilizar como marcador
      imgSize: [2, 2], // Reemplaza 'ANCHO_DEL_ICONO' y 'ALTO_DEL_ICONO' con las dimensiones de tu icono
      scale: 0.03, // Opcional: ajusta la escala del icono según sea necesario
      anchor: [0.5, 1] // Ajusta el origen del icono para que la parte inferior esté en la coordenada
    })
  });
}

export function eliminarPunto(map) {
    map
    .getLayers()
    .getArray()
    .filter((layer) => layer.layer_type === "punto-filtro")
    .forEach((layer) => map.removeLayer(layer));
}

export async function localizarPunto(lon, lat, proj, map, titulo, simbolo) {
  eliminarPunto(map)
  // Transformar las coordenadas si es necesario
  const coordinates = transform([lon, lat], proj, 'EPSG:3857');
  
  // Centrar el mapa en las coordenadas del punto con un nivel de zoom
  map.getView().animate({
    center: coordinates,
    zoom: 12, // Nivel de zoom deseado
    duration: 1000 // Duración de la animación en milisegundos
  });

  // Crear una característica (feature) para el punto
  const feature = new Feature({
    geometry: new Point(coordinates)
  });

  // Crear una fuente vectorial con la característica
  const vectorSource = new VectorSource({
    features: [feature]
  });

  let vectorLayer
  if(simbolo){
    vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function(feature, resolution) {
        return lineStyleTextoFunctionSimbolo(feature, resolution, titulo); // Reemplaza "Punto" con el texto deseado
      }
    });
  } else {
    // Crear una capa vectorial
    vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function(feature, resolution) {
        return lineStyleTextoFunction(feature, resolution, titulo); // Reemplaza "Punto" con el texto deseado
      }
    });
  }


  vectorLayer.layer_type = "punto-filtro";

  // Añadir la capa al mapa
  map.addLayer(vectorLayer);
}
