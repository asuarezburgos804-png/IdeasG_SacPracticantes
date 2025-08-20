"use client";

import { useEffect, useRef, useState } from "react";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, transform } from "ol/proj";
import { toast } from "sonner";
import { getRepository, getRepositoryList, saveRepositoryTable } from "@/modules/import/services/repositories";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Slider,
  Spacer,
  Spinner,
  Input
} from "@nextui-org/react";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import { useRepositories } from "@/app/hooks/espaciales/useEspaciales";
import Arriba from "@/icons/tools/ControlCapasArriba";
import Abajo from "@/icons/tools/ControlCapasAbajo";
import { toggleItem, toggleLayers } from "./expansion";
import FieldSet from "@/components/dashboard/general/fieldset";
import IconLayerGroup from "@/icons/suite/IconLayerGroup";
import { Image as ImageLayer } from "ol/layer";
import { ImageWMS } from "ol/source";

export default function CapasRepositorios({ mapa, dataCliente}) {
    const [capasGeoserver, setCapasGeoserver] = useState([]);
    const [expandedSuperGroups, setExpandedSuperGroups] = useState([]);
    const [expandedGroups, setExpandedGroups] = useState([]);
    const [expandedLayers, setExpandedLayers] = useState([]);
    const {
        isLoading: isLoadingCapas,
        data,
        isError,
        isFetching,
        refetch,
    } = useRepositories();
    // console.log(data);
    const [loadingCapa, setLoadingCapa] = useState({});
    const [capas, setCapas] = useState([]);
    const [transparency, setTransparency] = useState({});
    const [activeChecks, setActiveChecks] = useState({});
    const layerRefs = useRef({});

    useEffect(()=>{
        if (data?.data && data?.data.length > 0) {
            setCapas(data.data);
            setCapasGeoserver(filtrarSoloGeoserver(data.data));
            const initialChecks = {};
            (data.data || []).forEach(repo => {
                repo.capas?.forEach(capa => {
                initialChecks[`${capa.fk_repositorio}_${capa.id}`] = !!capa.b_active;
                });
            });
            setActiveChecks(initialChecks);
        }
    },[data])

    function filtrarSoloGeoserver(repositorios) {
        const SoloGeoserver = repositorios.flatMap(repo =>
            (repo.capas || [])
            .filter(capa => capa.c_tipo_capa === "Geoserver")
            .map(capa => ({
                ...capa
            }))
        );
        return SoloGeoserver;
    }

    // Agrega las capas Geoserver al mapa (solo una vez)
    useEffect(() => {
        if (!mapa || !dataCliente?.cliente || capasGeoserver.length === 0) return;
        const newLayers = [];
        const newTransparency = {};
        capasGeoserver.forEach(capa => {
            const url = `${dataCliente.cliente.servidor_gs}/${dataCliente.cliente.workspace}/wms`;
            const layerName = `${dataCliente.cliente.workspace}:${capa.c_capa}`;
            const legendEstilo = "&legend_options=;fontSize:11;layout:vertical";

            const imageWMSOptions = {
            url: url,
            params: {
                LAYERS: layerName,
                SRS: "EPSG:900913",
                format: "image/png",
                TRANSPARENT: true,
            },
            ratio: 1,
            serverType: "geoserver",
            crossOrigin: "anonymous",
            transition: 0,
            };

            const la = new ImageLayer({
            source: new ImageWMS(imageWMSOptions),
            opacity: capa.n_transparency ?? 1,
            visible: capa.b_active, // inicia apagada
            legend: `${url.replace(`/${dataCliente.cliente.workspace}`, "")}?TRANSPARENT=TRUE&SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${layerName}${legendEstilo}`,
            title: capa.c_nombre,
            });
            mapa.addLayer(la);
            newLayers.push({ repoId: capa.fk_repositorio, capaId: capa.id, layer: la });
            newTransparency[capa.id] = capa.n_transparency || 1; // Asigna la transparencia inicial
            layerRefs.current[capa.id] = la; // Guarda la referencia de la capa
        });
        setTransparency((prev) => ({ ...prev, ...newTransparency }));
        // Solo cuando cambian las capas o el mapa
    }, [mapa, dataCliente?.cliente, capasGeoserver]);

    function transformarFeaturesTo3857(features) {
        return features.map((item) => {
            const geometry = item.geometry;
            const epsgFull = geometry?.crs?.properties?.name || "EPSG:4326";
            const origen = epsgFull;
            const destino = "EPSG:3857";
            let transformedCoordinates = geometry.coordinates;

            if (geometry.type === "Point") {
            transformedCoordinates = transform(geometry.coordinates, origen, destino);
            } else if (geometry.type === "LineString" || geometry.type === "MultiPoint") {
            transformedCoordinates = geometry.coordinates.map(coord =>
                transform(coord, origen, destino)
            );
            } else if (geometry.type === "Polygon" || geometry.type === "MultiLineString") {
            transformedCoordinates = geometry.coordinates.map(ring =>
                ring.map(coord => transform(coord, origen, destino))
            );
            } else if (geometry.type === "MultiPolygon") {
            transformedCoordinates = geometry.coordinates.map(polygon =>
                polygon.map(ring =>
                ring.map(coord => transform(coord, origen, destino))
                )
            );
            }

            return {
            ...item,
            geometry: {
                ...geometry,
                coordinates: transformedCoordinates,
            },
            };
        });
    }

    const handleTransparencyChange = (repoId, capaId, value) => {
        const layer = layerRefs.current[capaId];
        if (layer) {
        layer.setOpacity(value);
        setTransparency((prev) => ({ ...prev, [capaId]: value }));
        }
    };

    const _cleanGeoJSON = (data) => {
        return data.map((item) => {
            // Extrae geometry y el resto de propiedades
            const { geometry, ...rest } = item;
            return {
                type: "Feature",
                geometry: {
                    ...geometry,
                    coordinates: geometry.coordinates,
                },
                properties: {
                    ...rest, // aquí van todas las propiedades excepto geometry
                },
            };
        });
    };

    const _shapeProcess = (data, nameCapa, visible) => {
        const cleanedData = _cleanGeoJSON(data);
        const geojsonData = {
            type: "FeatureCollection",
            features: cleanedData.map((item) => ({
                type: "Feature",
                geometry: item.geometry,
                properties: item.properties,
            })),
        };
        const geojsonFormat = new GeoJSON();
        const vectorSource = new VectorSource({
            features: geojsonFormat.readFeatures({
                type: "FeatureCollection",
                features: geojsonData.features,
            }),
        });
        const vectorLayer = new VectorLayer({
            source: vectorSource,
            visible: visible,
            nombreCapa: nameCapa,
        });
        mapa.addLayer(vectorLayer);

        // Hacer zoom a la extensión de la capa
        const extent = vectorSource.getExtent();
        if (extent && extent.every(Number.isFinite)) {
            mapa.getView().fit(extent, { duration: 800, maxZoom: 18 });
        }

        return vectorLayer;
    };

    function changeVisible(repoId, capaId, value) {
        const layer = layerRefs.current[capaId];
        if (layer) {
        layer.setVisible(value);
        }
        // Actualiza el estado del check
        setActiveChecks(prev => ({
            ...prev,
            [`${repoId}_${capaId}`]: value
        }));
    }

    const createCustomStyle = (fillColor, strokeColor, strokeWidth) => {
        return new Style({
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({
                color: strokeColor && strokeColor !== "rgba(0, 0, 0, 0)" ? strokeColor : undefined,
                width: strokeWidth > 0 ? strokeWidth : 1,
            }),
            image: new CircleStyle({
                radius: 5,
                fill: new Fill({ color: fillColor }),
                stroke: new Stroke({
                    color: strokeColor && strokeColor !== "rgba(0, 0, 0, 0)" ? strokeColor : undefined,
                    width: strokeWidth > 0 ? strokeWidth : 1,
                }),
            }),
        });
    };

    function changeLayerStyle(capaId, activeColorRelleno, activeColorBorde, fillColor, strokeColor, strokeWidth) {
        let colorRellenoFinal = "rgba(0, 0, 0, 0)";
        let colorBordeFinal = "rgba(0, 0, 0, 0)";
        if (activeColorBorde) {
            colorBordeFinal = strokeColor;
        }
        if (activeColorRelleno) {
            colorRellenoFinal = fillColor;
        }
        const layer = layerRefs.current[capaId];
        if (layer) {
        const customStyle = createCustomStyle(
            colorRellenoFinal,
            colorBordeFinal,
            strokeWidth
        );
        layer.setStyle(customStyle);
        }
    }
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.random().toFixed(2); // Transparencia entre 0 y 1
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    // Función para generar un ancho de línea aleatorio
    const getRandomStrokeWidth = () => {
        return Math.floor(Math.random() * 5) + 1; // Ancho de línea entre 1 y 5
    };

    const handleStyleChange = (capaId) => {
        // Aquí puedes pasar los valores deseados por el usuario para el estilo
        changeLayerStyle(
        capaId,
        true,
        true,
        getRandomColor(),
        getRandomColor(),
        getRandomStrokeWidth()
        );
    };

    const cargarTablaPorCapa = async (capa) => {
        try {
            setLoadingCapa((prev) => ({ ...prev, [capa.id]: true }));
            const response = await saveRepositoryTable(capa);
            const newTableData = transformarFeaturesTo3857(response.data);
            const colorRelleno = '#f5f7f5';
            const colorBorde = '#282828';
            actualizarCapaConTableData(capa.id, newTableData, colorRelleno, colorBorde);
    
            setTransparency((prevTransparency) => ({
                ...prevTransparency,
                [capa.id]: capa.n_transparency
            }));
            const visible = activeChecks[`${capa.fk_repositorio}_${capa.id}`] ?? false;
            const vectorLayer = _shapeProcess(
            newTableData,
            capa.c_nombre,
            visible
            );
            layerRefs.current[capa.id] = vectorLayer;
            setLoadingCapa((prev) => ({ ...prev, [capa.id]: false }));
            // color inicial por defecto de la capa
            changeLayerStyle(
                capa.id,
                true,
                true,
                colorRelleno,
                colorBorde,
                2
            );
            toast.success("Carga satisfactoria");
        } catch (error) {
            toast.error("error de carga : " + error.message);
        }
    };

    // Función para actualizar una capa específica con tableData
    const actualizarCapaConTableData = (idCapa, tableData, colorRelleno, colorBorde) => {
        setCapas((prevCapas) => 
        prevCapas.map((repositorio) => ({
            ...repositorio,
            capas: repositorio.capas.map((capa) =>
            capa.id === idCapa ? { ...capa, tableData, colorRelleno, colorBorde, activeColorBorde: true, activeColorRelleno:true} : capa
            ),
        }))
        );
    };

    function cambiarColorCapa(tipo, capa, val) {
        const idCapa = capa.id;
        capa[tipo] = val;
        changeLayerStyle(
            idCapa,
            capa['activeColorRelleno'],
            capa['activeColorBorde'],
            capa['colorRelleno'],
            capa['colorBorde'],
            2
        );
        setCapas((prevCapas) => 
            prevCapas.map((repositorio) => ({
                ...repositorio,
                capas: repositorio.capas.map((capa) =>
                capa.id === idCapa ? { ...capa, [tipo]:val } : capa
                ),
            }))
        );
    }

    return (
        <>
            <div className="flex">
                <IconLayerGroup />
                <div>Repositorios Personales</div>
                <button
                    onClick={() =>
                    toggleItem(
                        "1",
                        setExpandedSuperGroups
                    )
                    }
                >
                {expandedSuperGroups.some((item) => item === "1") ? (
                    <Abajo />
                ) : (
                    <Arriba />
                )}
                </button>
            </div>
            {expandedSuperGroups.some((item) => item === "1") ? (
                <>
                    {/* {console.log(capas)} */}
                    {/* {console.log(dataCliente.cliente.servidor_gs)} */}
                    {capas.map((repo)=>(
                        <>
                            <div className="flex ml-8">
                                <IconLayerGroup />
                                <div>{repo.c_nombre}</div>
                                <button
                                    onClick={() =>
                                    toggleItem(
                                        repo.id,
                                        setExpandedGroups
                                    )
                                    }
                                >
                                {expandedGroups.some((item) => item === repo.id) ? (
                                    <Abajo />
                                ) : (
                                    <Arriba />
                                )}
                                </button>
                            </div>
                            {
                                expandedGroups.some((item) => item === repo.id) ? 
                                <>
                                {repo.capas.map((capa) => (
                                    <>
                                        <div className="flex flex-col">
                                            <div className="flex ml-16">
                                                <Checkbox
                                                isSelected={activeChecks[`${repo.id}_${capa.id}`] ?? false}
                                                key={capa.id}
                                                onValueChange={(e) => changeVisible(repo.id, capa.id, e)}
                                                >
                                                {capa.c_nombre}
                                                </Checkbox>
                                                <button
                                                    onClick={() =>
                                                    toggleItem(
                                                        capa.id,
                                                        setExpandedLayers
                                                    )
                                                    }
                                                >
                                                    {expandedLayers.some((item) =>item === capa.id) ? (
                                                    <Abajo />
                                                    ) : (
                                                    <Arriba />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="ml-16">
                                                {/* {capas[0].c_tipo_capa === "VectorLayer" ? <></> : <></>} */}
                                                {
                                                    expandedLayers.some((item) =>item === capa.id) ? <>
                                                    <FieldSet>
                                                        {/* { console.log(capa)} */}
                                                        <div className="px-6">
                                                            <Slider
                                                                size="md"
                                                                step={0.01}
                                                                color="primary"
                                                                label="Transparencia"
                                                                showSteps={false}
                                                                showTooltip={true}
                                                                maxValue={1}
                                                                minValue={0}
                                                                value={transparency[capa.id] || capa.n_transparency || 1}
                                                                onChange={(value) =>
                                                                    handleTransparencyChange(repo.id, capa.id, value)
                                                                }
                                                                className="max-w-md"
                                                                formatOptions={{style: 'percent'}}
                                                            />
                                                        </div>
                                                        { capa.c_tipo_capa === "VectorLayer" ? <>
                                                            { capa?.tableData ? <>
                                                                <div className="flex">
                                                                    <Checkbox
                                                                        isSelected={capa.activeColorBorde}
                                                                        value={capa.activeColorBorde}
                                                                        onValueChange={(val)=>cambiarColorCapa('activeColorBorde', capa, val)}
                                                                    >
                                                                        <span className="text-sm">Color borde:</span>
                                                                    </Checkbox>
                                                                    <Input type="color" value={capa.colorBorde} onValueChange={(val)=>cambiarColorCapa('colorBorde', capa, val)}/>
                                                                    <Checkbox
                                                                        isSelected={capa.activeColorRelleno}
                                                                        value={capa.activeColorRelleno}
                                                                        onValueChange={(val)=>cambiarColorCapa('activeColorRelleno', capa, val)}
                                                                    >
                                                                        <span className="text-sm">Color relleno:</span>
                                                                    </Checkbox>
                                                                    <Input type="color" value={capa.colorRelleno} onValueChange={(val)=>cambiarColorCapa('colorRelleno', capa, val)}/>
                                                                </div>
                                                                <Button
                                                                    onPress={() => {
                                                                        handleStyleChange(capa.id);
                                                                    }}
                                                                    color="primary"
                                                                >
                                                                    Color Random
                                                                </Button>
                                                            </>:
                                                            <>
                                                                <Button
                                                                    onPress={() => {
                                                                        cargarTablaPorCapa(capa);
                                                                    }}
                                                                    color="primary"
                                                                >
                                                                    {loadingCapa[capa.id] ? <Spinner color="default"/> : "Cargar Capa"}
                                                                </Button>
                                                            </>}
                                                        </>: <>
                                                            {/* Leyenda para capas Geoserver - Reutilizando la URL ya guardada */}
                                                            <div className="px-6"> {/* Mismo padding que el slider */}
                                                                <div className="flex flex-col gap-2">
                                                                    <span className="text-sm font-semibold">Leyenda:</span>
                                                                    <div className="border rounded-lg p-2 bg-white">
                                                                        <img 
                                                                            src={layerRefs.current[capa.id]?.get('legend')}
                                                                            alt={`Leyenda de ${capa.c_nombre}`}
                                                                            className="max-w-full h-auto"
                                                                            onError={(e) => {
                                                                                e.target.style.display = 'none';
                                                                                e.target.nextSibling.style.display = 'block';
                                                                            }}
                                                                        />
                                                                        <div className="text-xs text-gray-500 hidden">
                                                                            No se pudo cargar la leyenda
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>}
                                                    </FieldSet>
                                                    </> : <></>
                                                }
                                            </div>
                                        </div>
                                        <Spacer y={4}></Spacer>
                                    </>
                                    ))}
                                </>
                                :<></>
                            }
                        </>
                    ))}
                </>
            ) : null}
        </>
    );
}
