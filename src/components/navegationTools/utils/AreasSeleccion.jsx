// importaciones ol
import { SelectItem, Select, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getDataGjson } from "@/app/services/espaciales/espaciales";
import environment from "@/config/enviroment";
import { Draw as DrawInteraction } from "ol/interaction";
import { createBox } from "ol/interaction/Draw.js";
// importaciones ol
import MultiPolygon from "ol/geom/MultiPolygon";
import WKT from "ol/format/WKT";
import { GeoJSON } from "ol/format";
import Feature from "ol/Feature";
import { Style, Stroke, Circle as CircleStyle, Fill } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { transformExtent } from "ol/proj";
import { boundingExtent } from "ol/extent";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function SelectorUbigeo(mapa) {
  const [listDepartamento, setListDepartamento] = useState([]);
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [TypeDraw, setTypeDraw] = useState([]);
  const map = mapa.mapa.map;

  const typesDraw = [
    // { value: "Circle", label: "Circulo" },
    { value: "PoligonoLibre", label: "Dibujo Libre" },
    { value: "Polygon", label: "Polígono" },
    { value: "Rectangulo", label: "Rectángulo" },
  ];
  const geoserver = environment.geoserver + "/wms";
  const workspace = environment.workSpace;

  useEffect(() => {
    if (!map) return;
    EliminarInteraccion();
    if (TypeDraw[0] === undefined) return;
    CrearInteraccion(TypeDraw[0]);
  }, [TypeDraw]);

  useEffect(() => {
    obteniendoDepartamentos();
    // console.log(map.mapa.map);
  }, [map]);

  const EliminarInteraccion = () => {
    map
      .getInteractions()
      .getArray()
      .filter(
        (interaccion) => interaccion.interaction_type === "interaccion-dibujo"
      )
      .forEach((layer) => map.removeInteraction(layer));
  };

  function lineStyleFunction(feature, resolution) {
    var colorRelleno = "rgba(0, 0, 0, 0)";
    var colorBorde = "#34e1eb";
    return new Style({
      fill: new Fill({
        color: colorRelleno,
      }),
      // BORDE
      stroke: new Stroke({
        color: colorBorde,
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: colorRelleno,
        }),
        stroke: new Stroke({
          color: colorBorde,
          width: 2,
        }),
      }),
      // text: createTextStyle(feature, resolution),
    });
  }

  const CrearInteraccion = (value) => {
    mapa.setLayerDibujado(false);
    eliminarGeometria();
    const source = new VectorSource({ wrapX: false });
    const funcion = lineStyleFunction;
    const vector = new VectorLayer({
      source: source,
      style: funcion,
    });
    vector.layer_type = "vector-ubicacion-ubigeo";
    vector.draw_type = true;
    map.addLayer(vector);
    let draw;
    switch (value) {
      case "Rectangulo":
        draw = new DrawInteraction({
          source: source,
          type: "Circle",
          freehand: true,
          geometryFunction: createBox(),
        });
        draw.interaction_type = "interaccion-dibujo";
        map.addInteraction(draw);
        break;
      case "PoligonoLibre":
        // geometryFunction
        draw = new DrawInteraction({
          source: source,
          type: "Polygon",
          freehand: true,
        });
        draw.interaction_type = "interaccion-dibujo";
        map.addInteraction(draw);
        break;

      case "Circle":
        // geometryFunction
        draw = new DrawInteraction({
          source: source,
          type: value,
          freehand: true,
          //   geometryFunction: geometryCircleFunction
        });
        draw.interaction_type = "interaccion-dibujo";
        map.addInteraction(draw);
        break;
      default:
        draw = new DrawInteraction({
          source: source,
          type: value,
          // freehand: true,
        });
        draw.interaction_type = "interaccion-dibujo";
        map.addInteraction(draw);
        break;
    }
    draw.on("drawstart", function () {
      draw.get();
    });
    draw.on("drawend", function () {
      console.log(draw.sketchCoords_);
      mapa.setLayerDibujado(true);
      map.removeInteraction(draw);
      setTypeDraw([]);
    });
  };

  const obteniendoDepartamentos = async function () {
    const geo = "sp_departamentos";
    const url =
      geoserver +
      "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
      workspace +
      ":" +
      geo +
      "&outputFormat=application/json&propertyName=iddpto,nombdep";
    // console.log(url);
    const featuresDepartamento = await getDataGjson(url);
    // console.log(featuresDepartamento);
    var propiedadesDepartamento = [];
    featuresDepartamento.map((element) => {
      propiedadesDepartamento.push({
        value: element.properties.iddpto,
        label: element.properties.nombdep,
      });
    });
    setProvincia("");
    setDistrito("");
    setListDepartamento(propiedadesDepartamento);
  };

  function changeTypeDraw(seleccionado) {
    const select = seleccionado[seleccionado.length - 1];
    setTypeDraw([select]);
  }

  const eliminarGeometria = function () {
    console.log(map);
    map
      .getLayers()
      .getArray()
      .filter((layer) => layer.layer_type === "vector-ubicacion-ubigeo")
      .forEach((layer) => map.removeLayer(layer));
  };

  const dibujarGeometria = function (coordenadas) {
    const feature = new Feature({
      geometry: new MultiPolygon([coordenadas]),
      name: "Linea",
    });
    // console.log(feature.getGeometry());
    feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
    var layerLines = new VectorLayer({
      source: new VectorSource({ features: [feature] }),
      style: new Style({
        stroke: new Stroke({
          color: "#34e1eb",
          width: 3,
        }),
      }),
    });
    layerLines.layer_type = "vector-ubicacion-ubigeo";
    console.log(layerLines);
    console.log(map);
    mapa.setLayerDibujado(true);
    map.addLayer(layerLines);
  };

  const ubicar = function (features) {
    // console.log(features);
    var mayor = 0;
    var coordenadas = [];
    var dibujo = [];
    eliminarGeometria();
    for (let i = 0; i < features.length; i++) {
      const element = features[i][0].length;
      dibujo.push(features[i][0]);
      if (element > mayor) {
        mayor = element;
        coordenadas = features[i][0];
      }
    }
    dibujarGeometria(dibujo);
    const extent = boundingExtent(coordenadas);
    const transformado = transformExtent(extent, "EPSG:4326", "EPSG:3857");
    map.getView().fit(transformado);
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <Card>
          <CardBody>
            <div className="flex">
              <CheckboxGroup
                orientation="horizontal"
                color="primary"
                value={TypeDraw}
                onValueChange={(e) => changeTypeDraw(e)}
              >
                {typesDraw.map((e) => (
                  <Checkbox key={e.value} value={e.value}>
                    <span className="text-sm">{e.label}</span>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
