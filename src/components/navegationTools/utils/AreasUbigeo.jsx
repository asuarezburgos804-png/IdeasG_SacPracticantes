// importaciones ol
import {
  SelectItem,
  Select,
  CheckboxGroup,
  Checkbox,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  getDataGjson,
  getDataGjsonFull,
} from "@/app/services/espaciales/espaciales";
import environment from "@/config/enviroment";
import { Draw as DrawInteraction } from "ol/interaction";
import { createBox } from "ol/interaction/Draw.js";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import WKT from "ol/format/WKT";
import { GeoJSON } from "ol/format";
import { Style, Stroke, Circle as CircleStyle, Fill } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export default function SelectorUbigeo(mapa) {
  const [listDepartamento, setListDepartamento] = useState([]);
  const [listProvincia, setListProvincia] = useState([]);
  const [listDistrito, setListDistrito] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [selectedDistrito, setSelectedDistrito] = useState(null);
  const [TypeDraw, setTypeDraw] = useState([]);
  const map = mapa.mapa.map;
  const geoserver = environment.geoserver + "/wms";
  const workspace = environment.workSpace;

  const onChangeDepartamento = function (event) {
    setSelectedDepartamento(event);
    obteniendoProvincias(event);
    setListDistrito([]);
    const ubigeo = event;
    searchUbigeo(ubigeo, "departamento");
  };

  const onChangeProvincia = function (event) {
    setSelectedProvincia(event);
    obteniendoDistritos(event);
    const ubigeo = event;
    searchUbigeo(ubigeo, "provincia");
  };

  const onChangeDistrito = function (event) {
    setSelectedDistrito(event);
    const ubigeo = event;
    searchUbigeo(ubigeo, "distrito");
  };

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
    eliminarGeometria();
    const source = new VectorSource({ wrapX: false });
    const funcion = lineStyleFunction;
    const vector = new VectorLayer({
      source: source,
      style: funcion,
    });
    vector.layer_type = "vector-ubicacion-ubigeo";
    vector.draw_type = true;
    mapa.setLayerDibujado(true);
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
      // const extent = boundingExtent(draw.sketchCoords_);
      // setExtentBody(extent)
      // const view = map.getView();
      // view.fit(extent);
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
    // console.log(propiedadesDepartamento);
    setListDepartamento(propiedadesDepartamento);
  };

  const obteniendoProvincias = async function (id_dpto) {
    console.log(id_dpto);
    const geo = "sp_provincias";
    const url =
      geoserver +
      "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
      workspace +
      ":" +
      geo +
      "&outputFormat=application/json&SORTBY=nombprov%20ASC&CQL_FILTER=iddpto=%27" +
      id_dpto +
      "%27&propertyName=nombprov,idprov";
    // console.log(url);
    const featuresProvincia = await getDataGjson(url);
    // console.log(featuresProvincia);
    var propiedadesProvincia = [];
    featuresProvincia.map((element) => {
      propiedadesProvincia.push({
        value: element.properties.idprov,
        label: element.properties.nombprov,
      });
    });
    setListProvincia(propiedadesProvincia);
  };

  const obteniendoDistritos = async function (id_prov) {
    const geo = "sp_distritos";
    const url =
      geoserver +
      "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
      workspace +
      ":" +
      geo +
      "&outputFormat=application/json&SORTBY=nombdist&CQL_FILTER=idprov=%27" +
      id_prov +
      "%27&propertyName=nombdist,iddist";
    // console.log(url);
    const featuresDistritos = await getDataGjson(url);
    var propiedadesDistritos = [];
    featuresDistritos.map((element) => {
      propiedadesDistritos.push({
        value: element.properties.iddist,
        label: element.properties.nombdist,
      });
    });
    setListDistrito(propiedadesDistritos);
  };

  const eliminarGeometria = function () {
    console.log(map);
    map
      .getLayers()
      .getArray()
      .filter((layer) => layer.layer_type === "vector-ubicacion-ubigeo")
      .forEach((layer) => map.removeLayer(layer));
  };

  const ubicar = async function (url) {
    eliminarGeometria();
    const result = await getDataGjsonFull(url);
    var vectorSource = new VectorSource();
    const features = new GeoJSON().readFeaturesFromObject(result);

    features.forEach((feature) => {
      feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
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
        var features = vectorSource.getFeatures();
        var wktStringArray = [];
        var wktFormat = new WKT();
        features.forEach(function (feature) {
          // Convertir la geometría al sistema de coordenadas 4326 (WGS 84)
          var geometry = feature.getGeometry().clone();
          geometry.transform("EPSG:3857", "EPSG:4326");

          // Generar la cadena WKT
          var wktString = wktFormat.writeGeometry(geometry);
          wktStringArray.push(wktString);
        });
        const cqlFilter =
          "INTERSECTS(geom,SRID=4326; " + wktStringArray[0] + ")";
        mapa.setCqlFilter(cqlFilter);
        // setTipoSeleccionado(tipo)
        // handleSelect(cqlFilter, tipo);
      }
    });
    mapa.setLayerDibujado(true);
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
    map.addLayer(vectorLayer);
  };

  const searchUbigeo = async function (ubigeo, tipo) {
    var geo, url, res, resJson, features;
    switch (tipo) {
      case "departamento":
        geo = "sp_departamentos";
        url =
          geoserver +
          "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
          workspace +
          ":" +
          geo +
          "&outputFormat=application/json&CQL_FILTER=iddpto=%27" +
          ubigeo +
          "%27";
        ubicar(url);
        break;
      case "provincia":
        console.log(ubigeo, tipo);
        geo = "sp_provincias";
        url =
          geoserver +
          "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
          workspace +
          ":" +
          geo +
          "&outputFormat=application/json&CQL_FILTER=idprov=%27" +
          ubigeo +
          "%27";
        ubicar(url);
        break;
      case "distrito":
        geo = "sp_distritos";
        url =
          geoserver +
          "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
          workspace +
          ":" +
          geo +
          "&outputFormat=application/json&CQL_FILTER=iddist=%27" +
          ubigeo +
          "%27";
        ubicar(url);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <Card>
          <CardBody>
            <Autocomplete
              variant="underlined"
              defaultItems={listDepartamento}
              label="Departamento"
              placeholder="Buscas..."
              className="max-w-xs"
              selectedKey={selectedDepartamento}
            >
              {(departamento) => (
                <AutocompleteItem
                  key={departamento.value}
                  onPress={() => onChangeDepartamento(departamento.value)}
                >
                  {departamento.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              variant="underlined"
              defaultItems={listProvincia}
              label="Provincia"
              placeholder="Buscas..."
              className="max-w-xs"
              selectedKey={selectedProvincia}
            >
              {(provincia) => (
                <AutocompleteItem
                  key={provincia.value}
                  onPress={() => onChangeProvincia(provincia.value)}
                >
                  {provincia.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              variant="underlined"
              defaultItems={listDistrito}
              label="Distrito"
              placeholder="Buscas..."
              className="max-w-xs"
              selectedKey={selectedDistrito}
            >
              {(distrito) => (
                <AutocompleteItem
                  key={distrito.value}
                  onPress={() => onChangeDistrito(distrito.value)}
                >
                  {distrito.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
