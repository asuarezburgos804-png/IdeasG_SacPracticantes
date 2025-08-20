import { Style, Stroke, Circle as CircleStyle, Fill, Text, Icon } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import environment from "@/config/enviroment";
import { getDataGjsonFull } from "@/app/services/espaciales/espaciales";
const geoserver = environment.geoserver + "/wms";
const workspace = environment.workSpace;

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
    const font = "Arial"
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
        image: new Icon({
            src: '../../assets/images/map/pngwing.png', // Reemplaza 'URL_DEL_ICONO' con la URL del icono que deseas utilizar como marcador
            imgSize: [2, 2], // Reemplaza 'ANCHO_DEL_ICONO' y 'ALTO_DEL_ICONO' con las dimensiones de tu icono
            scale: 0.03, // Opcional: ajusta la escala del icono según sea necesario
            anchor: [0.5, 1] // Ajusta el origen del icono para que la parte inferior esté en la coordenada
        })
    });
  }

// function lineStyleTextoFunction(feature, resolution, text) {
//     return new Style({
//         fill: new Fill({
//         color: "rgba(0, 0, 0, 0)", // Relleno transparente
//         }),
//         // BORDE
//         stroke: new Stroke({
//         color: "#f6af0f", // Color del borde
//         width: 2,
//         }),
//         image: new CircleStyle({
//         radius: 7,
//         fill: new Fill({
//             color: "rgba(0, 0, 0, 0)", // Relleno transparente
//         }),
//         stroke: new Stroke({
//             color: "#f6af0f", // Borde del círculo
//             width: 3, // Ancho del borde
//         }),
//         }),
//         text: createTextStyle(text),
//     });
// }

export default async function localizarPunto(mapa,nombre,event) {
    console.log(mapa,nombre,event);
    const geo = "sp_centros_poblados";
    var terminoCodificado = encodeURIComponent("'"+event+"'");
    const url =
    geoserver +
    "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
    workspace +
    ":" +
    geo +
    "&outputFormat=application/json&CQL_FILTER=idccpp_21="+terminoCodificado+"&maxFeatures=1";
    // searchUbigeo(ubigeo, "distrito");
    console.log(url);
    const data = await getDataGjsonFull(url);
    var features = new GeoJSON().readFeatures(data, { featureProjection: 'EPSG:3857'});
    // Verificar si hay características
    if (features.length > 0) {
      // Obtener las coordenadas del primer punto (asumiendo que solo hay uno)
      var coordinates = features[0].getGeometry().getCoordinates();
      // coordinates = transform(coordinates, 'EPSG:4326', 'EPSG:3857');
      // Centrar el mapa en las coordenadas del punto con un nivel de zoom
      console.log(coordinates);
      // mapa.getView().animate({
      //     center: coordinates,
      //     zoom: 12, // Nivel de zoom deseado
      //     duration: 1000 // Duración de la animación en milisegundos
      // }); 

      // Crear una fuente vectorial
      var vectorSource = new VectorSource({
        features: features
      });

      // Crear una capa vectorial
      var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function(feature, resolution) {
          return lineStyleTextoFunction(feature, resolution, nombre); // Pasar el ID como texto
        }
      });
      vectorLayer.layer_type = "punto-capital-filtro";
      mapa.addLayer(vectorLayer)
    }
}
