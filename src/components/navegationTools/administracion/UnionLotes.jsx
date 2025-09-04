"use client";

import { useState, useEffect } from "react";
import { Button, Divider, Select, SelectItem, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useBuscadorSectores } from "@/app/hooks/espaciales/useBuscadores";
import { getBuscadorManzana, getBuscadorLote, postRegistrarUnionDeLotes } from "@/app/services/espaciales/buscadores";
import { dibujarLotesConEtiquetas, ubicarLineas, eliminarGeometria} from "../utils/accionesEspaciales/dibujarGeometrias";
import Buscar from "@/icons/tools/Buscar";
import ButtonMenu from "@/components/dashboard/general/buttonMenu";
import CustomModal from "@/components/dashboard/general/customModal";
import { toast } from "sonner";
import { Stroke, Style, Fill, Text} from "ol/style";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import * as turf from "@turf/turf";
import { transform } from "ol/proj";
import ModalResumenUnion from "./utils/ModalResumenUnion";
import { data } from "autoprefixer";

export default function UnionLotes({ map, data: dataCliente }) {
    const [isResumenUnionOpen, setIsResumenUnionOpen] = useState(false);
    const [datosResumenUnion, setDatosResumenUnion] = useState(null);
    // Estados necesarios
    const { isLoading: isLoadingSectores, data: dataSectores } = useBuscadorSectores();
    const [unionValida, setUnionValida] = useState(false);
    const [dataManzana, setDataManzana] = useState([]);
    const [dataLote, setDataLote] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedManzana, setSelectedManzana] = useState("");
    const [currentFormData, setCurrentFormData] = useState({});
    
    // Estados específicos para unión de lotes
    const [cantidadLotes, setCantidadLotes] = useState("");
    const [selectedLotes, setSelectedLotes] = useState([]);
    
    // Estados para manejo de capas del mapa
    const [lotesLayer, setLotesLayer] = useState(null);
    const [loteUnidoLayer, setLoteUnidoLayer] = useState(null);

    const { control, register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (!map) return;
    }, [map]);

    // Función para cerrar modal limpiando estados y capas
    const handleCloseModal = () => {
        limpiarCapasLotes();
        setIsModalOpen(false);
        setSelectedSector("");
        setSelectedManzana("");
        setDataManzana([]);
        setDataLote([]);
        setCurrentFormData({});
        setCantidadLotes("");
        setSelectedLotes([]);
    };

// FUNCIÓN PRINCIPAL ACTUALIZADA: Unir geometrías usando Turf.js con transformación de coordenadas
const unirGeometriasLotes = (selectedLotes) => {
    try {
        console.log("🔗 Iniciando unión de lotes...", selectedLotes);
        if (!selectedLotes || selectedLotes.length === 0) {
            console.error("No hay lotes seleccionados");
            return null;
        }
        
        if (!lotesLayer) {
            console.error("No hay capa de lotes disponible");
            return null;
        }

        console.log(`🔧 Uniendo ${selectedLotes.length} lotes seleccionados con Turf.js...`);

        const source = lotesLayer.getSource();
        const features = source.getFeatures();
        
        // Obtener geometrías de OpenLayers y convertir a GeoJSON
        const geometriasTurf = [];
        
        selectedLotes.forEach(lote => {
            const targetFeature = features.find(feature => {
                const properties = feature.getProperties();
                return properties.id_lote === lote.id_lote || 
                    properties.c_cod_lote === lote.c_cod_lote;
            });

            if (targetFeature) {
                const geom = targetFeature.getGeometry();
                if (geom) {
                    // Transformar a WGS84
                    const geom4326 = geom.clone().transform('EPSG:3857', 'EPSG:4326');
                    const format = new GeoJSON();
                    const geoJsonGeom = format.writeGeometryObject(geom4326);

                    // Validar tipo y coordenadas
                    console.log("GeoJSON generado:", geoJsonGeom);
                    if (
                        (geoJsonGeom.type === "Polygon" || geoJsonGeom.type === "MultiPolygon") &&
                        Array.isArray(geoJsonGeom.coordinates)
                    ) {
                        // Crear feature de Turf
                        const turfFeature = turf.feature(geoJsonGeom);
                        geometriasTurf.push(turfFeature);
                    } else {
                        console.error("❌ GeoJSON no es un polígono válido:", geoJsonGeom);
                    }
                }
            }
        });

        console.log(`📏 Geometrías convertidas a Turf (WGS84)`, geometriasTurf);

        if (geometriasTurf.length === 0) {
            console.error("No se encontraron geometrías válidas");
            return null;
        }

        if (geometriasTurf.length === 1) {
            console.log("Solo una geometría, no se requiere unión");
            // Transformar de vuelta a EPSG:3857 antes de retornar
            const format = new GeoJSON();
            const geometria4326 = format.readGeometry(geometriasTurf[0].geometry);
            return geometria4326.transform('EPSG:4326', 'EPSG:3857');
        }

        const resultadoUnion = unirConTurf(geometriasTurf);

        if (resultadoUnion) {
            setUnionValida(resultadoUnion.cantidadPoligonos === 1);
            const geometriaFinal = resultadoUnion.geometry.transform('EPSG:4326', 'EPSG:3857');
            dibujarLoteUnido(geometriaFinal, resultadoUnion.cantidadPoligonos === 1, resultadoUnion.cantidadPoligonos);
            if (resultadoUnion.cantidadPoligonos > 1) {
                console.log("No puedes unir lotes que estén separados.");
                return null;
            }
            return geometriaFinal;
        }
        setUnionValida(false);
        return null;

    } catch (error) {
        console.error("Error crítico uniendo geometrías:", error);
        return null;
    }
};

    // unirConTurf retorna un objeto con la geometría y la cantidad de polígonos
    const unirConTurf = (geometriasTurf) => {
        try {
            const format = new GeoJSON();
            const geometriasValidas = geometriasTurf.filter(geom => {
                return geom && geom.geometry && (
                    geom.geometry.type === "Polygon" || geom.geometry.type === "MultiPolygon"
                );
            });

            if (geometriasValidas.length < 2) {
                return geometriasValidas.length === 1
                    ? { geometry: format.readGeometry(geometriasValidas[0].geometry), cantidadPoligonos: 1 }
                    : null;
            }

            let geometriaUnida = geometriasValidas[0];

            for (let i = 1; i < geometriasValidas.length; i++) {
                const siguiente = geometriasValidas[i];
                try {
                    let resultado = turf.union(geometriaUnida, siguiente);
                    if (resultado && resultado.geometry) {
                        resultado = turf.buffer(resultado, 0);
                        geometriaUnida = resultado;
                    }
                } catch (unionError) {
                    continue;
                }
            }

            let resultadoLimpio = turf.cleanCoords(geometriaUnida);

            let cantidadPoligonos = 1;
            if (resultadoLimpio.geometry.type === "MultiPolygon") {
                cantidadPoligonos = resultadoLimpio.geometry.coordinates.length;
            }
            console.log(`🔎 Cantidad de polígonos en el resultado: ${cantidadPoligonos}`);

            return {
                geometry: format.readGeometry(resultadoLimpio.geometry),
                cantidadPoligonos
            };

        } catch (error) {
            return null;
        }
    };

    // Generar código para el lote unido
    const generarCodigoLoteUnido = () => {
        if (!selectedLotes || selectedLotes.length === 0) return "001";
        
        const codigosExistentes = dataLote.map(lote => parseInt(lote.c_cod_lote) || 0);
        const codigoMaximo = Math.max(...codigosExistentes, 0);
        const nuevoCodigo = codigoMaximo + 1;
        
        return String(nuevoCodigo).padStart(3, '0');
    };

    const dibujarLoteUnido = (geometriaUnida, unionValida, cantidadPoligonos) => {
        if (!geometriaUnida || !map) return;

        // Elimina capa anterior si existe
        if (loteUnidoLayer) {
            map.removeLayer(loteUnidoLayer);
            setLoteUnidoLayer(null);
        }

        console.log("Dibujando lote unido con geometría:", cantidadPoligonos);
        try {
            const nuevoCodigo = generarCodigoLoteUnido();
            if (cantidadPoligonos === 1) {
                // Dibuja en morado
                const featureUnido = new Feature({
                    geometry: geometriaUnida,
                    tipo: 'lote_unido',
                    codigo_lote: nuevoCodigo,
                    lotes_origen: selectedLotes.map(l => l.c_cod_lote).join(', ')
                });
                const source = new VectorSource({ features: [featureUnido] });
                const vectorLayer = new VectorLayer({
                    source: source,
                    style: new Style({
                        stroke: new Stroke({ color: '#8b5cf6', width: 3 }),
                        fill: new Fill({ color: 'rgba(139, 92, 246, 0.2)' }),
                        text: new Text({
                            text: nuevoCodigo,
                            font: 'bold 14px Arial',
                            fill: new Fill({ color: '#ffffff' }),
                            stroke: new Stroke({ color: '#8b5cf6', width: 2 }),
                            offsetY: 0,
                        }),
                    })
                });
                vectorLayer.set('layer_type', 'lote_unido');
                vectorLayer.set('codigo_generado', nuevoCodigo);
                map.addLayer(vectorLayer);
                setLoteUnidoLayer(vectorLayer);
                toast.success(`Lote unido creado con código: ${nuevoCodigo}`);
            } else {
                // Dibuja en rojo, sin importar el tipo de geometría
                const format = new GeoJSON();
                let featuresRojas = [];
                let geometria = geometriaUnida;
                if (geometria.getType() === "MultiPolygon") {
                    const multiCoords = format.writeGeometryObject(geometria).coordinates;
                    multiCoords.forEach((coords, idx) => {
                        const geom = format.readGeometry({
                            type: "Polygon",
                            coordinates: coords
                        });
                        featuresRojas.push(new Feature({
                            geometry: geom,
                            tipo: 'lote_separado',
                            codigo_lote: `${nuevoCodigo}_err${idx + 1}`,
                            lotes_origen: selectedLotes.map(l => l.c_cod_lote).join(', ')
                        }));
                    });
                } else {
                    featuresRojas.push(new Feature({
                        geometry: geometria,
                        tipo: 'lote_separado',
                        codigo_lote: `${nuevoCodigo}_err`,
                        lotes_origen: selectedLotes.map(l => l.c_cod_lote).join(', ')
                    }));
                }
                const source = new VectorSource({ features: featuresRojas });
                const vectorLayer = new VectorLayer({
                    source: source,
                    style: new Style({
                        stroke: new Stroke({ color: '#ff1744', width: 3 }),
                        fill: new Fill({ color: 'rgba(255, 23, 68, 0.2)' }),
                        text: new Text({
                            text: "Error",
                            font: 'bold 14px Arial',
                            fill: new Fill({ color: '#ffffff' }),
                            stroke: new Stroke({ color: '#ff1744', width: 2 }),
                            offsetY: 0,
                        }),
                    })
                });
                vectorLayer.set('layer_type', 'lote_separado');
                map.addLayer(vectorLayer);
                setLoteUnidoLayer(vectorLayer);
                toast.error("No se puede unir lotes separados. Se muestran en rojo.");
            }
        } catch (error) {
            console.error("Error dibujando lote unido:", error);
            toast.error("Error al dibujar el lote unido");
        }
    };

    // Limpiar capas de lotes del mapa
    const limpiarCapasLotes = () => {
        selectedLotes.forEach(lote => {
            removerEstiloLoteSeleccionado(lote);
        });

        if (lotesLayer && map) {
            map.removeLayer(lotesLayer);
            setLotesLayer(null);
        }
        
        if (loteUnidoLayer && map) {
            map.removeLayer(loteUnidoLayer);
            setLoteUnidoLayer(null);
        }
    };

    // Aplicar estilo naranja a lotes seleccionados
    const aplicarEstiloLoteSeleccionado = (lote) => {
        if (!lotesLayer || !map) return;

        const source = lotesLayer.getSource();
        const features = source.getFeatures();
        
        const targetFeature = features.find(feature => {
            const properties = feature.getProperties();
            return properties.id_lote === lote.id_lote || 
                   properties.c_cod_lote === lote.c_cod_lote;
        });

        if (targetFeature) {
            targetFeature.setStyle(new Style({
                stroke: new Stroke({
                    color: '#ff9800',
                    width: 3,
                }),
                fill: new Fill({
                    color: 'rgba(255, 152, 0, 0.3)'
                }),
                text: new Text({
                    text: lote.c_cod_lote,
                    font: 'bold 12px Arial',
                    fill: new Fill({
                        color: '#000000',
                    }),
                    stroke: new Stroke({
                        color: '#ffffff',
                        width: 2,
                    }),
                    offsetY: 0,
                }),
            }));
        }
    };

    // Remover estilo naranja y volver al estilo celeste
    const removerEstiloLoteSeleccionado = (lote) => {
        if (!lotesLayer || !map) return;

        const source = lotesLayer.getSource();
        const features = source.getFeatures();
        
        const targetFeature = features.find(feature => {
            const properties = feature.getProperties();
            return properties.id_lote === lote.id_lote || 
                   properties.c_cod_lote === lote.c_cod_lote;
        });

        if (targetFeature) {
            targetFeature.setStyle(new Style({
                stroke: new Stroke({
                    color: '#00bcd4',
                    width: 2,
                }),
                fill: new Fill({
                    color: 'rgba(0, 188, 212, 0.1)'
                }),
                text: new Text({
                    text: lote.c_cod_lote,
                    font: 'bold 12px Arial',
                    fill: new Fill({
                        color: '#000000',
                    }),
                    stroke: new Stroke({
                        color: '#ffffff',
                        width: 2,
                    }),
                    offsetY: 0,
                }),
            }));
        }
    };

    // Funciones de selección (conservadas las necesarias)
    async function generarUrl(item) {
        const geoserver = dataCliente.cliente.servidor_gs + "/wms";
        const workspace = dataCliente.cliente.workspace;
        const capa = item.capa;
        const projOriginal = item.projOriginal;

        const url =
            geoserver +
            "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
            workspace +
            ":" +
            capa +
            "&outputFormat=application/json" +
            item.terminoBusqueda +
            "&maxFeatures=1";
        
        const result = await ubicarLineas(url, map, projOriginal);
        return result;
    }

    async function seleccionSector(item) {
        const id_sector = item.target.value;
        setSelectedSector(id_sector);
        setCurrentFormData(prev => ({...prev, id_sector}));
    
        const data = await getBuscadorManzana(id_sector);
        const terminoCodificado = `id_sector = ${id_sector}`;
        const capa = {
            capa: "sp_sector",
            terminoBusqueda: `&CQL_FILTER=${terminoCodificado}`,
            projOriginal: "EPSG:32718"
        };
        generarUrl(capa);
        setDataManzana(data);
        setDataLote([]);

        setSelectedManzana("");
        setSelectedLotes([]);
        limpiarCapasLotes();
    }

    async function dibujarLotesManzana(item) {
        const geoserver = dataCliente.cliente.servidor_gs + "/wms";
        const workspace = dataCliente.cliente.workspace;
        const capa = item.capa;
        const projOriginal = item.projOriginal;

        const url =
            geoserver +
            "?request=GetFeature&service=WFS&version=1.1.0&typeName=" +
            workspace +
            ":" +
            capa +
            "&outputFormat=application/json" +
            item.terminoBusqueda;
        
        const result = await dibujarLotesConEtiquetas(url, map, projOriginal);
        return result;
    }

    async function seleccionManzana(item) {
        const id_manzana = item.target.value;
        setSelectedManzana(id_manzana);
        setCurrentFormData(prev => ({...prev, id_manzana}));
        eliminarGeometria(map);
        const data = await getBuscadorLote(id_manzana);

        // Agrega el filtro b_activo = true
        const terminoCodificadoLotes = `id_manzana = ${id_manzana} AND b_activo = true`;
        const capaLotes = {
            capa: "sp_lote",
            terminoBusqueda: `&CQL_FILTER=${terminoCodificadoLotes}`,
            projOriginal: "EPSG:4326"
        };
        
        const resultLotes = await dibujarLotesManzana(capaLotes);
        if (resultLotes && resultLotes.layer) {
            setLotesLayer(resultLotes.layer);
        }

        setDataLote(data);
        setSelectedLotes([]);
        // Limpiar solo la capa de unión
        if (loteUnidoLayer && map) {
            map.removeLayer(loteUnidoLayer);
            setLoteUnidoLayer(null);
        }
    }

    const handleCantidadChange = (e) => {
        const cantidad = parseInt(e.target.value) || 0;
        setCantidadLotes(e.target.value);
        
        if (cantidad <= dataLote.length) {
            selectedLotes.forEach(lote => {
                removerEstiloLoteSeleccionado(lote);
            });
            
            setSelectedLotes([]);
        }

        // Limpiar solo la capa de unión
        if (loteUnidoLayer && map) {
            map.removeLayer(loteUnidoLayer);
            setLoteUnidoLayer(null);
        }
    };

    const toggleLoteSelection = async (lote) => {
        const isSelected = selectedLotes.find(l => l.id_lote === lote.id_lote);
        
        if (isSelected) {
            setSelectedLotes(prev => prev.filter(l => l.id_lote !== lote.id_lote));
            removerEstiloLoteSeleccionado(lote);
            // Limpiar solo la capa de unión
            if (loteUnidoLayer && map) {
                map.removeLayer(loteUnidoLayer);
                setLoteUnidoLayer(null);
            }
        } else {
            if (selectedLotes.length < parseInt(cantidadLotes)) {
                setSelectedLotes(prev => [...prev, lote]);
                console.log("Lote seleccionado:", lote);
                aplicarEstiloLoteSeleccionado(lote);
            } else {
                toast.error(`Solo puedes seleccionar ${cantidadLotes} lotes`);
            }
        }
    };

    const onSubmit = async (formData) => {
        if (selectedLotes.length < 2) {
            toast.error("Debe seleccionar al menos 2 lotes para unir");
            return;
        }

        if (selectedLotes.length !== parseInt(cantidadLotes)) {
            toast.error(`Debe seleccionar exactamente ${cantidadLotes} lotes`);
            return;
        }

        console.log("🔗 Iniciando proceso de unión de lotes...");
        console.log("Lotes seleccionados:", selectedLotes);

        // Prepara el resumen y muestra el modal
        const geometriasTurf = [];
        let areaTotal = 0;
        if (lotesLayer) {
            const source = lotesLayer.getSource();
            const features = source.getFeatures();
            selectedLotes.forEach(lote => {
                const targetFeature = features.find(feature => {
                    const properties = feature.getProperties();
                    return properties.id_lote === lote.id_lote || properties.c_cod_lote === lote.c_cod_lote;
                });
                if (targetFeature) {
                    const geom = targetFeature.getGeometry();
                    if (geom) {
                        const geom4326 = geom.clone().transform('EPSG:3857', 'EPSG:4326');
                        const format = new GeoJSON();
                        const geoJsonGeom = format.writeGeometryObject(geom4326);
                        geometriasTurf.push(turf.feature(geoJsonGeom));
                        areaTotal += turf.area(turf.feature(geoJsonGeom));
                    }
                }
            });
        }
        const resultadoUnion = unirConTurf(geometriasTurf);
        // Obtén la geometría en formato GeoJSON
        let geojsonFinal = null;
        if (resultadoUnion && resultadoUnion.geometry) {
            const format = new GeoJSON();
            geojsonFinal = format.writeGeometryObject(resultadoUnion.geometry);
        }
        setDatosResumenUnion({
            lotes: selectedLotes,
            cantidadPoligonos: resultadoUnion?.cantidadPoligonos ?? 0,
            areaTotal,
            esValida: resultadoUnion?.cantidadPoligonos === 1,
            sector: selectedSector ? dataSectores?.find(s => s.id_sector === parseInt(selectedSector)) : null,
            manzana: selectedManzana ? dataManzana?.find(m => m.id_manzana === parseInt(selectedManzana)) : null,
            nuevoCodigoLote: generarCodigoLoteUnido(),
            geometria: geojsonFinal, // <-- Agrega aquí la geometría final
        });
        setIsResumenUnionOpen(true);
    };
    
    // Nueva función para enviar datos al backend (simulada)
    const enviarUnionAlBackend = async (datos) => {
        // Aquí iría la llamada al servicio backend, por ejemplo:
        await postRegistrarUnionDeLotes(datos);
        setIsResumenUnionOpen(false);
        toast.success("Unión enviada al backend correctamente");
    };

    // Unión automática cuando se complete la selección
    useEffect(() => {
        if (selectedLotes.length > 0 && 
            cantidadLotes && 
            selectedLotes.length === parseInt(cantidadLotes) && 
            selectedLotes.length >= 2) {
            console.log("🎯 Selección completa detectada, ejecutando unión automática...");
            setTimeout(() => {
                try {
                    const geometriaUnida = unirGeometriasLotes(selectedLotes);
                    if (geometriaUnida) {
                        console.log("✅ Unión automática completada");
                    }
                } catch (error) {
                    console.error("Error en unión automática:", error);
                }
            }, 500);
        }
    }, [selectedLotes.length, cantidadLotes]);

    return (
        <>
            <CustomModal
                title="🔗 Unión de Lotes"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                size="5xl"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 space-y-4">
                    {/* Leyenda de colores */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                borderRadius: 6,
                                border: "2px solid #00bcd4",
                                background: "#e0f7fa"
                            }}></span>
                            <span style={{ fontSize: 12, color: "#222" }}>Lotes disponibles (celeste)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                borderRadius: 6,
                                border: "2px solid #ff9800",
                                background: "#ffe0b2"
                            }}></span>
                            <span style={{ fontSize: 12, color: "#222" }}>Seleccionados (naranja)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                borderRadius: 6,
                                border: "2px solid #8b5cf6",
                                background: "#ede9fe"
                            }}></span>
                            <span style={{ fontSize: 12, color: "#222" }}>Unidos correctamente (morado)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{
                                display: "inline-block",
                                width: 20,
                                height: 20,
                                borderRadius: 6,
                                border: "2px solid #ff1744",
                                background: "#ffcdd2"
                            }}></span>
                            <span style={{ fontSize: 12, color: "#222" }}>Error de unión (rojo)</span>
                        </div>
                    </div>
                        {/* Selectores, inputs y lista de lotes igual que antes */}
                        <Controller
                            name="id_sector"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Sector:"
                                    disabled={isLoadingSectores}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        seleccionSector(value);
                                    }}
                                    selectedKeys={[field.value]}
                                >
                                    {dataSectores?.map((sector) => (
                                        <SelectItem key={sector.id_sector} value={sector.id_sector}>
                                            {sector.c_cod_sector}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <Divider className="my-4" />
                        <Controller
                            name="id_manzana"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Manzana:"
                                    disabled={dataManzana?.length === 0}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        seleccionManzana(value);
                                    }}
                                    selectedKeys={[field.value]}
                                >
                                    {dataManzana?.map((mzna) => (
                                        <SelectItem key={mzna.id_manzana} value={mzna.id_manzana}>
                                            {mzna.c_cod_mzna}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <Divider className="my-4" />
                        <Input
                            type="number"
                            label="Cantidad de lotes a unir"
                            placeholder="Ingresa cantidad (mín. 2)"
                            value={cantidadLotes}
                            onChange={handleCantidadChange}
                            min="2"
                            max={dataLote.length}
                            isDisabled={!selectedManzana || dataLote.length === 0}
                        />
                        {dataLote.length > 0 && cantidadLotes >= 2 && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">
                                    Selecciona {cantidadLotes} lotes ({selectedLotes.length}/{cantidadLotes})
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                                    {dataLote.map((lote) => {
                                        const isSelected = selectedLotes.find(l => l.id_lote === lote.id_lote);
                                        const canSelect = selectedLotes.length < parseInt(cantidadLotes);
                                        return (
                                            <Card
                                                key={lote.id_lote}
                                                isPressable
                                                onPress={() => toggleLoteSelection(lote)}
                                                className={`
                                                    ${isSelected ? 'bg-orange-100 border-orange-500' : 'bg-cyan-50 border-cyan-200'}
                                                    ${!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
                                                    border-2 transition-colors
                                                `}
                                            >
                                                <CardBody className="p-2">
                                                    <p className="text-sm font-medium">{lote.c_cod_lote}</p>
                                                    <p className="text-xs text-gray-600">{lote.c_nombre}</p>
                                                    {isSelected && (
                                                        <p className="text-xs text-orange-600 font-medium">🧡 Seleccionado</p>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {selectedLotes.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h4 className="font-semibold">Lotes Seleccionados</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="space-y-1">
                                        {selectedLotes.map((lote) => (
                                            <p key={lote.id_lote} className="text-sm">
                                                • {lote.c_cod_lote}
                                            </p>
                                        ))}
                                    </div>
                                <Button 
                                    color={
                                        selectedLotes.length === parseInt(cantidadLotes) && selectedLotes.length >= 2 && !unionValida
                                            ? "danger"
                                            : "primary"
                                    }
                                    className="mt-3"
                                    type="submit"
                                    isDisabled={
                                        selectedLotes.length !== parseInt(cantidadLotes) ||
                                        selectedLotes.length < 2 ||
                                        !unionValida
                                    }
                                >
                                    {selectedLotes.length === parseInt(cantidadLotes) && selectedLotes.length >= 2 && unionValida
                                        ? "Proceder con la Unión" 
                                        : !unionValida
                                            ? "No puedes unir lotes separados"
                                            : `Selecciona ${cantidadLotes} lotes para continuar`
                                    }
                                </Button>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </form>
            </CustomModal>
            {/* Modal de resumen de unión */}
            {isResumenUnionOpen && (
                <ModalResumenUnion
                    isOpen={isResumenUnionOpen}
                    onClose={() => setIsResumenUnionOpen(false)}
                    datosResumen={datosResumenUnion}
                    onConfirmar={async () => {
                        await enviarUnionAlBackend(datosResumenUnion);
                    }}
                    onCancelar={() => setIsResumenUnionOpen(false)}
                />
            )}
            <ButtonMenu 
                onPress={() => setIsModalOpen(true)} 
                icon={<Buscar/>}
                name="Unión de Lotes" 
            />
        </>
    );
}