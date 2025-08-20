"use client";
import jwt from "jsonwebtoken"
import {
  ImageWMS,
  TileWMS,
  TileArcGISRest,
  Vector as VectorSource
} from "ol/source";
import { GeoJSON, WFS} from "ol/format";
import {
  Image as ImageLayer,
  Tile,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import { Fill, Style, Circle, Stroke } from "ol/style";
import environment from "@/config/enviroment";
import { createTileLayer, createImageLayer, createTileLayerArcGIS } from "@/components/navegationTools/layers/layerUtils";

export default async function loadLayers(mapa, capas, session) {
  capas.reverse(); // con esto invierto el orden de capas para dar un efecto diferente en la visualización del mapa, los que están arriba irán sobrepuestos a las demás capas.
  let decodedRefresToken = {
    id_rol: undefined
  }
  if (session) {
    decodedRefresToken = jwt.decode(
      session.user.backendTokens.refresToken
    );
  }

  const legendEstilo = "&legend_options=;fontSize:11;layout:vertical";
  const filtrosCQLporTablas = [
    {capa: 'encuesta_mo', CQL: 'rol_id='+decodedRefresToken.id_rol}
    // {capa: 'encuesta_mo', CQL: "idaq='5f3b6a20-5a44-11ef-be78-8fa403acac43'"}
  ]

  // Procesar cada capa
  await Promise.all(capas.map(async (capa) => {
    let la;
    // Capa interna
    if (capa.c_tipo === "interno") {
      let url = `${environment.geoserver}/${capa.c_workspace}/wms`;
      switch (capa.c_servicio) {
        case "arcgis":
          url = capa.c_url;
          const layerArcGIS = capa.c_sql_capa;
          var arcGISRestSource = new TileArcGISRest({
            url: url,
            params: {
              layers: `show:${layerArcGIS}`,
            },
          });
  
          la = new TileLayer({
            source: arcGISRestSource,
            opacity: 1,
            type_capa: "interno",
            sg_orden: capa.sg_orden,
            g_orden: capa.g_orden,
            c_orden: capa.c_orden,
            servicio: capa.c_servicio,
            capas_id: capa.capas_id,
            id_super_grupo: capa.id_sg,
            id_sg: capa.id_sg,
            nombre_supergrupo: capa.nombre_supergrupo,
            id_grupo: capa.id_grupo,
            nombre_grupo: capa.nombre_grupo,
            id_capa: capa.id_capa,
            geoserver: capa.c_nombre_geoserver,
            tabla: capa.capas_nombre,
            workspace: capa.c_workspace,
            legend: `${url.replace(`/${capa.c_workspace}`, "")}?TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${capa.c_workspace}:${capa.c_nombre_geoserver}${legendEstilo}`,
            title: capa.c_nombre_publico,
          });
          break;
        case "raster":
          const rasterWMS = {
            url: url,
            params: {
              LAYERS: capa.c_nombre_geoserver,
              SRS: "EPSG:900913",
              format: "image/png",  // Ajusta el formato si es necesario
              TRANSPARENT: true,
            },
            ratio: 1,
            serverType: "geoserver",
            crossOrigin: "anonymous",
            transition: 0,
          };
          la = new TileLayer({
            source: new TileWMS(rasterWMS),
            opacity: 1,
            type_capa: "interno",
            sg_orden: capa.sg_orden,
            g_orden: capa.g_orden,
            c_orden: capa.c_orden,
            pertenece: capa.pertenece,
            capas_id: capa.capas_id,
            id_super_grupo: capa.id_sg,
            id_sg: capa.id_sg,
            nombre_supergrupo: capa.nombre_supergrupo,
            servicio: capa.c_servicio,
            id_grupo: capa.id_grupo,
            nombre_grupo: capa.nombre_grupo,
            id_capa: capa.capas_id,
            geoserver: capa.c_nombre_geoserver,
            tabla: capa.capas_nombre,
            workspace: capa.c_workspace,
            esquema: capa.c_esquema,
            legend: `${url.replace(`/${capa.c_workspace}`, "")}?TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${capa.c_workspace}:${capa.c_nombre_geoserver}${legendEstilo}`,
            title: capa.c_nombre_publico,
          });
          break;
        default:
          const imagenWMS = {
            url: url,
            params: {
              LAYERS: capa.c_nombre_geoserver,
              SRS: "EPSG:900913",
              format: "image/png",
            },
            ratio: 1,
            serverType: "geoserver",
            crossOrigin: "anonymous",
            transition: 0,
          };
          // Verificar si existe un filtro CQL para la capa actual
          const filtroCQL = filtrosCQLporTablas.find(
            (item) => item.capa === capa.c_nombre_geoserver
          );
  
          if (filtroCQL) {
            imagenWMS.params.CQL_FILTER = filtroCQL.CQL;
          }
          la = new ImageLayer({
            source: new ImageWMS(imagenWMS),
            opacity: 1,
            type_capa: "interno",
            sg_orden: capa.sg_orden,
            g_orden: capa.g_orden,
            c_orden: capa.c_orden,
            capas_id: capa.capas_id,
            pertenece: capa.pertenece,
            servicio: capa.c_servicio,
            id_super_grupo: capa.id_sg,
            id_sg: capa.id_sg,
            nombre_supergrupo: capa.nombre_supergrupo,
            id_grupo: capa.id_grupo,
            nombre_grupo: capa.nombre_grupo,
            id_capa: capa.capas_id,
            geoserver: capa.c_nombre_geoserver,
            tabla: capa.capas_nombre,
            workspace: capa.c_workspace,
            esquema: capa.c_esquema,
            legend: `${url.replace(`/${capa.c_workspace}`, "")}?TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${capa.c_workspace}:${capa.c_nombre_geoserver}${legendEstilo}`,
            title: capa.c_nombre_publico,
          });
          break;
      }
    } 
    // Capa externa
    else if (capa.c_tipo === "externo") {
      const servicio = capa.c_servicio;
      const url_low = capa.c_url.toLowerCase();
      switch (servicio) {
        case "arcgis": {
          try {
            let newUrl = capa.c_url;
            let layerArcGIS = capa.c_capa_seleccionada_arcgis;
        
            // Verificamos si layerArcGIS es null, vacío o no tiene valor
            if (!layerArcGIS || layerArcGIS === "") {
              // Usamos una expresión regular para buscar los números al final de la URL
              const match = newUrl.match(/\/(\d+)$/);
        
              // Si se encontraron coincidencias, tomamos el último conjunto de números
              if (match && match.length > 1) {
                layerArcGIS = match[1];
                newUrl = newUrl.replace(/\/\d+$/, "");
              }
            }

            var arcGISRestSource = new TileArcGISRest({
              url: newUrl,
              params: {
                layers: "show:" + layerArcGIS, // aquí se puede cargar
              },
              crossOrigin: "anonymous",
            });
        
            la = new Tile({
              source: arcGISRestSource,
            });
        
            if (la) {
              la.values_.id_capa_arcgis = layerArcGIS;
              la.values_.c_servicio = capa.c_servicio;
              la.values_.c_url = newUrl + "/" + layerArcGIS;
              la.values_.title = capa.c_nombre_publico;
              la.values_.pertenece = capa.pertenece;
              la.values_.opacity = 1;
              la.values_.type_capa = "externo";
              la.values_.id_super_grupo = capa.id_super_grupo;
              la.values_.c_nombre_super_grupo = capa.c_nombre_super_grupo;
              la.values_.id_grupo = capa.id_grupo;
              la.values_.c_nombre_grupo = capa.c_nombre_grupo;
              la.values_.id_capa = capa.id_capa;
              la.values_.capas_id = capa.id_capa;
              la.values_.capa = capa.c_nombre_tabla_capa;
              la.values_.id_grupo = capa.id_grupo;
              la.values_.id_super_grupo = capa.id_sg;
              la.values_.id_sg = capa.id_sg;
              la.values_.legend = capa.legend;
            }
          } catch (error) {
            console.error("Error processing ArcGIS layer:", error);
          }
          break;
        }        
        case "wms":
          if (capa.c_url_seleccionado != "" && capa.c_url_seleccionado) {
            const selectedLayer = capas.c_url_seleccionado;
            if (url_low.includes("mapserver")) {
              let i_service = url_low.indexOf("services");
              let i_mapser = url_low.toLowerCase().indexOf("mapserver");
              let arc_wms =
                url.substr(0, i_service) +
                "rest/" +
                url.substr(i_service, i_mapser - i_service + 9);
              la = createTileLayer(arc_wms);
            } else {
              la = createImageLayer(url_low, selectedLayer);
            }
            la.namePopup = "capa-cargada-form";
            la.values_.title = "Capa Externa WMS";
            la.values_.servicio = "wms";
            console.log(la);
          } else {
            if (url_low.includes("mapserver")) {
              let i_service = url_low.indexOf("services");
              let i_mapser = url_low.toLowerCase().indexOf("mapserver");
              let arc_wms =
                capa.c_url.substr(0, i_service) +
                "rest/" +
                capa.c_url.substr(i_service, i_mapser - i_service + 9);
              la = createTileLayer(arc_wms);
              la.values_.c_servicio = 'wmsArcgis';

              const legendUrl = `${arc_wms}/legend?f=json`;
              const responseLegend = await fetch(legendUrl)
              .then(res => res.json())
              .catch(err => console.error("Error fetching legend:", err));

              if (responseLegend && responseLegend.layers) {
                // Recorrer todas las capas y obtener todas las leyendas
                responseLegend.layers.forEach((layerLegend,index) => {
                  const legendArray = [];
                  const laTemporal = createTileLayerArcGIS(arc_wms+'/', layerLegend.layerId);
                  if (layerLegend.legend.length > 0) {
                    layerLegend.legend.forEach(legendItem => {
                      if (legendItem.imageData) {
                        // Convertir imageData en una URL en base64
                        // legend = `data:${legendItem.contentType};base64,${legendItem.imageData}`;
                        legendArray.push({label:legendItem.label , legend: `data:${legendItem.contentType};base64,${legendItem.imageData}`});
                        // la.values_.legend = `data:${legendItem.contentType};base64,${legendItem.imageData}`;
                        // legendArray.push({label:legendItem.label, legend: legendItem.url});
                      } else if (legendItem.url) {
                        // Si hay una URL de leyenda en lugar de imageData
                        legendArray.push({label:legendItem.label , legend: legendItem.url});
                        // la.values_.legend = legendItem.url;
                      }
                    });
                  }
                // mapa.addLayer(laTemporal);
                  if (laTemporal) {
                    // setCcountPrj((prevCountPrj) => prevCountPrj + 1);
                    // console.log(`${capas.id_capa.toString()}-${index}`);
                    // console.log(capa);
                    
                    laTemporal.layer_type =`${index}`;
                    laTemporal.namePopup = "capa-cargada-form";
                    laTemporal.values_.title = `${index}-${layerLegend.layerName}`;
                    laTemporal.values_.type_capa = "externoTemporal"
                    laTemporal.values_.c_url = arc_wms+'/' + layerLegend.layerId;
                    laTemporal.values_.id_capa_arcgis = layerLegend.layerId;
                    laTemporal.values_.c_servicio = capa.c_servicio;
                    laTemporal.values_.title = capa.c_nombre_public_capa;
                    laTemporal.values_.opacity = 1;
                    laTemporal.values_.type_capa = "externo";
                    laTemporal.values_.id_super_grupo = capa.id_super_grupo;
                    laTemporal.values_.c_nombre_super_grupo = capa.c_nombre_super_grupo;
                    laTemporal.values_.id_grupo = capa.id_grupo;
                    laTemporal.values_.c_nombre_grupo = capa.c_nombre_grupo;
                    laTemporal.values_.id_capa = `${capa.capas_id.toString()}-${layerLegend.layerId}`;
                    laTemporal.values_.capa = capa.c_nombre_tabla_capa;
                    // setCapas((prevCapas) => [...prevCapas, nuevaCapa]);
                    mapa.addLayer(laTemporal);
                    // setIsLoading(false);
                  }
                });
              }
            } else {
              const layer_selected = capa.layer_selected;
              la = createImageLayer(url_low, layer_selected);
              la.values_.c_servicio = capas.c_servicio;
            }          
          }
          if (la) {
            la.values_.c_servicio = capa.c_servicio;
            la.values_.c_url = url_low;
            la.values_.title = capa.c_nombre_publico;
            la.values_.pertenece = capa.pertenece;
            la.values_.opacity = 1;
            la.values_.type_capa = "externo";
            la.values_.id_super_grupo = capa.id_super_grupo;
            la.values_.c_nombre_super_grupo = capa.c_nombre_super_grupo;
            la.values_.id_grupo = capa.id_grupo;
            la.values_.c_nombre_grupo = capa.c_nombre_grupo;
            la.values_.id_capa = capa.id_capa;
            la.values_.capas_id = capa.id_capa;
            la.values_.capa = capa.c_nombre_tabla_capa;
            la.values_.id_grupo = capa.id_grupo;
            la.values_.id_super_grupo = capa.id_sg;
            la.values_.id_sg = capa.id_sg;
            la.values_.legend = capa.legend;
          }
          break;
        case "wfs":
          let url = capa.c_url;
          if (url_low.includes("mapserver")) {
            const i_service = url_low.indexOf("services");
            const i_mapser = url_low.toLowerCase().indexOf("mapserver");
            const arc_wms = `${url.substr(0, i_service)}rest/${url.substr(i_service, i_mapser - i_service + 9)}`;
            la = createTileLayer(arc_wms);
          } else {
            if (capa.c_url_seleccionado) {
              const selectedLayer = capa.c_url_seleccionado;
              let strUrl = `${url}`;
              if (strUrl.indexOf("?") <= 0) strUrl += "?";
              if (strUrl.toLowerCase().indexOf("service=wfs") <= 0) strUrl += "&service=WFS";
              if (strUrl.toLowerCase().indexOf("request=getcapabilities") <= 0) strUrl += "&request=GetCapabilities";
              const featureRequest = new WFS().writeGetFeature({
                srsName: "EPSG:3857",
                featureNS: "http://openstreemapa.org",
                featurePrefix: selectedLayer.split(":")[0],
                featureTypes: [selectedLayer.split(":")[1]],
                outputFormat: "application/json",
              });

              try {
                const response = await fetch(strUrl, {
                  method: "POST",
                  body: new XMLSerializer().serializeToString(featureRequest),
                });
                const json = await response.json();
                const features = new GeoJSON().readFeatures(json);
                const vectorSource = new VectorSource();
                vectorSource.addFeatures(features);

                la = new VectorLayer({
                  source: vectorSource,
                  style: new Style({
                    fill: new Fill({
                      color: "rgba(0, 0, 0, 0)",
                    }),
                    stroke: new Stroke({
                      color: "rgba(0, 0, 0, 1)",
                      width: 2,
                    }),
                    image: new Circle({
                      radius: 7,
                      fill: new Fill({
                        color: "rgba(0, 0, 0, 0)",
                      }),
                      stroke: new Stroke({
                        color: "rgba(0, 0, 0, 1)",
                        width: 2,
                      }),
                    }),
                  }),
                  opacity: 1,
                  type_capa: "externo",
                  sg_orden: capa.sg_orden,
                  g_orden: capa.g_orden,
                  c_orden: capa.c_orden,
                  id_sg: capa.id_sg,
                  id_super_grupo: capa.id_sg,
                  nombre_supergrupo: capa.nombre_supergrupo,
                  id_grupo: capa.id_grupo,
                  nombre_grupo: capa.nombre_grupo,
                  id_capa: capa.id_capa,
                  tabla: capa.capas_nombre,
                  workspace: capa.c_workspace,
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
          break;

        case "geojson":
          la = new VectorLayer({
            source: new VectorSource({
              url: capa.c_url,
              format: new GeoJSON(),
            }),
            opacity: 1,
            type_capa: "externo",
            sg_orden: capa.sg_orden,
            g_orden: capa.g_orden,
            c_orden: capa.c_orden,
            id_sg: capa.id_sg,
            id_super_grupo: capa.id_sg,
            nombre_supergrupo: capa.nombre_supergrupo,
            id_grupo: capa.id_grupo,
            nombre_grupo: capa.nombre_grupo,
            id_capa: capa.id_capa,
            workspace: capa.c_workspace,
            tabla: capa.capas_nombre,
          });
          break;

        default:
          console.log("Tipo de servicio desconocido");
          break;
      }
    }

    if (la) {
      la.setVisible(capa.b_visible)
      mapa.addLayer(la);
    }
  }));

  return;
}
