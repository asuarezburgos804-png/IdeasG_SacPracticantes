"use client";

import {
  Button,
  Divider,
  Select,
  SelectItem
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Buscar from "@/icons/tools/Buscar";
import ButtonMenu from "@/components/dashboard/general/buttonMenu";
import CustomModal from "@/components/dashboard/general/customModal";
import { useForm, Controller } from "react-hook-form";
import { useBuscadorSectores } from "@/app/hooks/espaciales/useBuscadores";
import { getBuscadorManzana, getBuscadorLote, postRegistrarNuevosLotes } from "@/app/services/espaciales/buscadores";
import { ubicarLineas } from "../utils/accionesEspaciales/dibujarGeometrias";
import { FileProcessor } from "@/components/navegationTools/utils/archivos/ProcesarArchivosCapas";
import { toast } from "sonner";
// Importaciones para OpenLayers
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Fill, Style, Circle, Stroke, Text } from "ol/style";
import { getArea, getDistance } from "ol/sphere";
import { transform } from "ol/proj";
import { MultiPolygon, Polygon, Point} from "ol/geom";
import { Feature } from "ol";
import ModalResumenReemplazo from "./utils/ModalResumenReemplazo";
import CustomSpatialFileUpload from "@/components/custom/customSpatialUpload";

export default function AdministracionSML({ map, idsSistema, data: dataCliente }) {
    useEffect(()=>{
        if (!map) return;
    },[map])
    
    const { isLoading:isLoadingSectores, data:dataSectores, isError, refetch } = useBuscadorSectores();
    const [dataManzana, setDataManzana] = useState([]);
    const [dataLote, setDataLote] = useState([]);
    const [loteMaximo, setLoteMaximo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessingFile, setIsProcessingFile] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [uploadedLayers, setUploadedLayers] = useState([]); // Para guardar las capas subidas
    const [dataSizeMB, setDataSizeMB] = useState(0);
    const [comparacionAreas, setComparacionAreas] = useState(null);
    const [loteSeleccionadoLayer, setLoteSeleccionadoLayer] = useState(null);
    const [validacionProximidad, setValidacionProximidad] = useState(null);
    const [selectedSRS, setSelectedSRS] = useState(""); // SRS por defecto para DXF
    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const [codigosLote, setCodigosLote] = useState({}); // Para almacenar códigos por feature
    const [isModalOpenResumen, setIsModalOpenResumen] = useState(false);
    const [datosResumen, setDatosResumen] = useState(null);
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedManzana, setSelectedManzana] = useState("");
    const [selectedLote, setSelectedLote] = useState("");
    const [currentFormData, setCurrentFormData] = useState({});

    const onSubmit = async (formData) => {
        // console.log("Datos del formulario:", formData);
        reemplazarLote(formData);
    };
    // Función para procesar el archivo seleccionado
    useEffect(()=> {
        if (selectedFile) {
            console.log(selectedFile);
            processFile(selectedFile)
        }
    }, [selectedSRS]);
    // Función LIMPIA para cerrar modal
    const handleCloseModal = () => {
        eliminarCentroides();
        setIsModalOpen(false);
    };

    // AGREGAR función para obtener centroide de un feature individual
    const obtenerCentroideFeature = (feature) => {
        try {
            let geom;
            
            if (feature && feature.geometry) {
                const geojsonFormat = new GeoJSON();
                geom = geojsonFormat.readGeometry(feature.geometry);
            } else if (feature && feature.getGeometry) {
                geom = feature.getGeometry();
            } else {
                return null;
            }
            
            const extent = geom.getExtent();
            const centerX = (extent[0] + extent[2]) / 2;
            const centerY = (extent[1] + extent[3]) / 2;
            
            return [centerX, centerY];
        } catch (error) {
            console.error("Error obteniendo centroide de feature:", error);
            return null;
        }
    };

    // AGREGAR función para generar códigos ordenados geográficamente
    const generarCodigosOrdenadosGeograficamente = (features, codigoBase) => {
        console.log(`🧭 Generando códigos ordenados geográficamente desde código base: ${codigoBase}`);
        
        // 1. Crear array con features, sus centroides y índices originales
        const featuresConCentroides = features.map((feature, index) => {
            const centroide = obtenerCentroideFeature(feature);
            return {
                feature,
                centroide,
                indiceOriginal: index,
                coordenadaY: centroide ? centroide[1] : 0 // Coordenada Y (Norte-Sur)
            };
        }).filter(item => item.centroide !== null); // Filtrar solo los que tienen centroide válido
        
        // 2. Ordenar por coordenada Y (de MAYOR a MENOR = Norte a Sur)
        featuresConCentroides.sort((a, b) => b.coordenadaY - a.coordenadaY);
        
        console.log(`📍 Features ordenados por posición (Norte → Sur):`);
        featuresConCentroides.forEach((item, orden) => {
            console.log(`  ${orden + 1}°. Feature ${item.indiceOriginal} - Y: ${item.coordenadaY.toFixed(2)}`);
        });
        
        // 3. Asignar códigos consecutivos según el orden geográfico
        const nuevosCodeigos = {};
        
        featuresConCentroides.forEach((item, orden) => {
            const nuevoCodigo = codigoBase + orden + 1;
            
            // 🔢 VALIDAR: no exceder 3 dígitos (máximo 999)
            if (nuevoCodigo > 999) {
                console.warn(`⚠️ Código ${nuevoCodigo} excede 3 dígitos, usando 999`);
                const codigoFormateado = "999";
                nuevosCodeigos[item.indiceOriginal] = codigoFormateado;
            } else {
                const codigoFormateado = String(nuevoCodigo).padStart(3, '0');
                nuevosCodeigos[item.indiceOriginal] = codigoFormateado;
            }
        });
        
        console.log(`✅ Códigos asignados geográficamente:`, nuevosCodeigos);
        return nuevosCodeigos;
    };

    // Función MEJORADA para unir geometrías usando solo OpenLayers
    const unirGeometrias = (features) => {
        try {
            if (!features || features.length === 0) return null;
            // console.log(`🔧 Uniendo ${features.length} geometrías...`);
            const geojsonFormat = new GeoJSON();
            const geometrias = [];
            
            // Obtener todas las geometrías válidas
            features.forEach((feature, index) => {
                let geom;
                
                if (feature && feature.getGeometry) {
                    geom = feature.getGeometry();
                } else if (feature && feature.geometry) {
                    geom = geojsonFormat.readGeometry(feature.geometry);
                } else {
                    // console.warn(`Feature ${index} no tiene geometría válida`);
                    return;
                }
                
                if (geom) {
                    geometrias.push(geom);
                }
            });
            
            if (geometrias.length === 0) {
                // console.error("No se encontraron geometrías válidas");
                return null;
            }
            
            if (geometrias.length === 1) {
                // console.log("Solo una geometría, no se requiere unión");
                return geometrias[0];
            }
            
            // MÉTODO 1: Intentar unión tradicional con buffer mínimo
            // try {
            //     // console.log("🎯 Intentando unión tradicional con buffer...");
            //     let geometriaUnida = geometrias[0];
            //     const bufferSize = 0.01; // 1 cm
            //     for (let i = 1; i < geometrias.length; i++) {
            //         try {
            //             const geom1Buffered = geometriaUnida.buffer ? geometriaUnida.buffer(bufferSize) : geometriaUnida;
            //             const geom2Buffered = geometrias[i].buffer ? geometrias[i].buffer(bufferSize) : geometrias[i];
                        
            //             const nuevaGeometria = union(geom1Buffered, geom2Buffered);
            //             geometriaUnida = nuevaGeometria;
            //             // console.log(`✅ Unión ${i} exitosa con buffer`);
            //         } catch (error) {
            //             // console.warn(`❌ Fallo en unión ${i} con buffer:`, error);
            //             try {
            //                 const nuevaGeometria = union(geometriaUnida, geometrias[i]);
            //                 geometriaUnida = nuevaGeometria;
            //                 // console.log(`✅ Unión ${i} exitosa sin buffer`);
            //             } catch (error2) {
            //                 // console.warn(`❌ Fallo en unión ${i} sin buffer:`, error2);
            //                 throw error2;
            //             }
            //         }
            //     }
                
            //     // console.log(`✅ Unión tradicional exitosa`);
            //     return geometriaUnida;
                
            // } catch (error) {
            //     // console.warn("Fallo en unión tradicional:", error);
            // }
            
            // MÉTODO 2: ConvexHull de todas las geometrías
            try {
                // console.log("🔄 Intentando unión con ConvexHull...");
                
                const todosLosPuntos = [];
                
                geometrias.forEach(geom => {
                    const coordinates = geom.getCoordinates();
                    if (geom.getType() === 'Polygon') {
                        coordinates[0].forEach(punto => {
                            todosLosPuntos.push(punto);
                        });
                    } else if (geom.getType() === 'MultiPolygon') {
                        coordinates.forEach(polygon => {
                            polygon[0].forEach(punto => {
                                todosLosPuntos.push(punto);
                            });
                        });
                    }
                });
                
                if (todosLosPuntos.length > 0) {
                    const convexHull = new Polygon([todosLosPuntos]).convexHull();
                    // console.log(`✅ ConvexHull creado con ${todosLosPuntos.length} puntos`);
                    return convexHull;
                }
                
            } catch (error) {
                // console.warn("Fallo en ConvexHull:", error);
            }
            
            // MÉTODO 3: Polígono envolvente (BoundingBox)
            try {
                // console.log("🔄 Creando polígono envolvente...");
                
                let extentTotal = geometrias[0].getExtent();
                
                for (let i = 1; i < geometrias.length; i++) {
                    const extent = geometrias[i].getExtent();
                    extentTotal = [
                        Math.min(extentTotal[0], extent[0]),
                        Math.min(extentTotal[1], extent[1]),
                        Math.max(extentTotal[2], extent[2]),
                        Math.max(extentTotal[3], extent[3])
                    ];
                }
                
                const [minX, minY, maxX, maxY] = extentTotal;
                const coordenadas = [[
                    [minX, minY],
                    [maxX, minY],
                    [maxX, maxY],
                    [minX, maxY],
                    [minX, minY]
                ]];
                
                const poligonoEnvolvente = new Polygon(coordenadas);
                // console.log(`✅ Polígono envolvente creado`);
                return poligonoEnvolvente;
                
            } catch (error) {
                // console.warn("Fallo en polígono envolvente:", error);
            }
            
            // MÉTODO 4: FALLBACK - MultiPolygon
            // console.log("🔄 Usando fallback: MultiPolygon");
            
            const coordenadas = [];
            geometrias.forEach(geom => {
                if (geom.getType() === 'Polygon') {
                    coordenadas.push(geom.getCoordinates());
                } else if (geom.getType() === 'MultiPolygon') {
                    coordenadas.push(...geom.getCoordinates());
                }
            });
            
            const multiPolygon = new MultiPolygon(coordenadas);
            // console.log(`✅ MultiPolygon creado con ${coordenadas.length} polígonos`);
            
            return multiPolygon;
            
        } catch (error) {
            // console.error("Error crítico uniendo geometrías:", error);
            return null;
        }
    };

    // Función para dibujar solo los centroides (puntos)
    const dibujarCentroides = (centroideLote, centroideArchivo, archivoFeatures) => {
        eliminarCentroides();

        const features = [];

        // 1. Centroide del lote (ROJO)
        if (centroideLote) {
            const puntoLote = new Point(centroideLote);
            const featureLote = new Feature({
                geometry: puntoLote,
                tipo: 'centroide_lote',
                nombre: 'Centroide del Lote'
            });
            features.push(featureLote);
        }

        // 2. Centroide conjunto del archivo (VERDE)
        if (centroideArchivo) {
            const puntoArchivo = new Point(centroideArchivo);
            const featureArchivo = new Feature({
                geometry: puntoArchivo,
                tipo: 'centroide_archivo',
                nombre: `Centroide del Archivo (${archivoFeatures ? archivoFeatures.length : 0} features unidos)`
            });
            features.push(featureArchivo);
        }

        // Solo crear layer si hay features para dibujar
        if (features.length === 0) {
            // console.log("⚠️ No hay centroides para dibujar");
            return;
        }

        // Crear layer de centroides con estilos diferenciados
        const source = new VectorSource({ features });
        
        const vectorLayer = new VectorLayer({
            source: source,
            style: (feature) => {
                const tipo = feature.get('tipo');
                
                if (tipo === 'centroide_lote') {
                    // Lote: ROJO grande
                    return new Style({
                        image: new Circle({
                            radius: 8,
                            fill: new Fill({ color: 'rgba(255, 0, 0, 0.9)' }),
                            stroke: new Stroke({ color: 'white', width: 2 }),
                        }),
                    });
                } else if (tipo === 'centroide_archivo') {
                    // Archivo conjunto: VERDE grande
                    return new Style({
                        image: new Circle({
                            radius: 8,
                            fill: new Fill({ color: 'rgba(0, 200, 0, 0.9)' }),
                            stroke: new Stroke({ color: 'white', width: 2 }),
                        }),
                    });
                }
            }
        });

        vectorLayer.set('layer_type', 'centroides_debug');
        vectorLayer.set('timestamp', Date.now()); // Para identificar capas más recientes
        map.addLayer(vectorLayer);

        // console.log(`🎯 Centroides NUEVOS dibujados en el mapa:
        //     - Lote (ROJO): ${centroideLote ? `[${centroideLote.join(', ')}]` : 'N/A'}
        //     - Archivo conjunto (VERDE): ${centroideArchivo ? `[${centroideArchivo.join(', ')}]` : 'N/A'}
        //     - Total features en layer: ${features.length}`);
    };

    // MEJORAR eliminarCentroides para ser más agresiva
    const eliminarCentroides = () => {
        // console.log("🧹 Eliminando TODOS los centroides del mapa");
        
        // Obtener TODAS las capas de centroides
        const capasAEliminar = map.getLayers().getArray()
            .filter(layer => 
                layer.get('layer_type') === 'centroides_debug' ||
                layer.get('tipo') === 'centroide_lote' ||
                layer.get('tipo') === 'centroide_archivo'
            );
        
        // console.log(`🎯 Encontradas ${capasAEliminar.length} capas de centroides para eliminar`);
        
        capasAEliminar.forEach((layer, index) => {
            map.removeLayer(layer);
            // console.log(`🗑️ Capa de centroide ${index + 1} eliminada`);
        });
        
        // console.log("✅ Todos los centroides eliminados del mapa");
    };

    // Función alternativa con buffer expandido
    const unirGeometriasConBufferExpandido = (features) => {
        try {
            if (!features || features.length === 0) return null;
            
            // console.log(`🔧 Uniendo ${features.length} geometrías con buffer expandido...`);
            
            const geojsonFormat = new GeoJSON();
            const geometrias = [];
            
            features.forEach((feature, index) => {
                let geom;
                
                if (feature && feature.getGeometry) {
                    geom = feature.getGeometry();
                } else if (feature && feature.geometry) {
                    geom = geojsonFormat.readGeometry(feature.geometry);
                }
                
                if (geom) {
                    geometrias.push(geom);
                }
            });
            
            if (geometrias.length === 0) return null;
            if (geometrias.length === 1) return geometrias[0];
            
            const bufferSize = 5; // 5 metros
            let geometriaUnida = null;
            
            geometrias.forEach((geom, index) => {
                try {
                    const buffered = geom.buffer(bufferSize);
                    
                    if (!geometriaUnida) {
                        geometriaUnida = buffered;
                    } else {
                        geometriaUnida = union(geometriaUnida, buffered);
                    }
                    
                    // console.log(`✅ Geometría ${index} unida con buffer`);
                } catch (error) {
                    console.warn(`❌ Error uniendo geometría ${index}:`, error);
                }
            });
            
            if (geometriaUnida) {
                try {
                    const geometriaFinal = geometriaUnida.buffer(-bufferSize);
                    // console.log(`✅ Unión con buffer expandido completada`);
                    return geometriaFinal;
                } catch (error) {
                    console.warn("Error aplicando buffer negativo, devolviendo geometría con buffer");
                    return geometriaUnida;
                }
            }
            
            return null;
            
        } catch (error) {
            console.error("Error en unión con buffer expandido:", error);
            return null;
        }
    };

    // Función LIMPIA para obtener centroide conjunto - SIN VISUALIZACIÓN
    const obtenerCentroideConjunto = (features) => {
        try {
            if (!features || features.length === 0) return null;
            
            // console.log(`🎯 Calculando centroide conjunto de ${features.length} features...`);
            
            // Intentar método 1: Unión tradicional
            let geometriaUnida = unirGeometrias(features);
            
            // Si falla, intentar método 2: Buffer expandido
            if (!geometriaUnida) {
                // console.log("🔄 Intentando método alternativo con buffer expandido...");
                geometriaUnida = unirGeometriasConBufferExpandido(features);
            }
            
            // Si aún falla, usar centroide promedio
            if (!geometriaUnida) {
                console.warn("No se pudo unir geometrías, usando centroide promedio");
                return calcularCentroidePromedio(features);
            }
            
            // Obtener centroide de la geometría unida
            const extent = geometriaUnida.getExtent();
            const centerX = (extent[0] + extent[2]) / 2;
            const centerY = (extent[1] + extent[3]) / 2;
            
            // console.log(`✅ Centroide conjunto calculado:
            //     - Features originales: ${features.length}
            //     - Tipo: ${geometriaUnida.getType()}
            //     - Centroide: [${centerX}, ${centerY}]`);
            
            return [centerX, centerY];
            
        } catch (error) {
            console.error("Error obteniendo centroide conjunto:", error);
            return calcularCentroidePromedio(features);
        }
    };

    // Función para calcular centroide promedio ponderado por área
    const calcularCentroidePromedio = (features) => {
        try {
            // console.log(`📊 Calculando centroide promedio de ${features.length} features...`);
            
            const centroides = [];
            const areas = [];
            
            features.forEach((feature, index) => {
                const centroide = obtenerCentroide(feature);
                const area = calcularArea(feature);
                
                if (centroide && area > 0) {
                    centroides.push(centroide);
                    areas.push(area);
                }
            });
            
            if (centroides.length === 0) return null;
            
            // Calcular centroide ponderado por área
            const areaTotal = areas.reduce((sum, area) => sum + area, 0);
            let sumaX = 0, sumaY = 0;
            
            centroides.forEach((centroide, index) => {
                const peso = areas[index] / areaTotal;
                sumaX += centroide[0] * peso;
                sumaY += centroide[1] * peso;
            });
            
            // console.log(`✅ Centroide promedio ponderado: [${sumaX}, ${sumaY}]`);
            return [sumaX, sumaY];
            
        } catch (error) {
            console.error("Error calculando centroide promedio:", error);
            return null;
        }
    };

    // Función para calcular el área de una geometría
    const calcularArea = (geometry) => {
        try {
            if (geometry && geometry.getGeometry) {
                return getArea(geometry.getGeometry());
            }
            if (geometry && geometry.getArea) {
                return getArea(geometry);
            }
            if (geometry && geometry.geometry) {
                const geojsonFormat = new GeoJSON();
                const olGeometry = geojsonFormat.readGeometry(geometry.geometry);
                return getArea(olGeometry);
            }
            return 0;
        } catch (error) {
            console.error("Error calculando área:", error);
            return 0;
        }
    };

    // Función para obtener el centroide de una geometría
    const obtenerCentroide = (geometry) => {
        try {
            let geom;
            
            if (geometry && geometry.getGeometry) {
                geom = geometry.getGeometry();
            } else if (geometry && geometry.getExtent) {
                geom = geometry;
            } else if (geometry && geometry.geometry) {
                const geojsonFormat = new GeoJSON();
                geom = geojsonFormat.readGeometry(geometry.geometry);
            } else {
                return null;
            }
            
            const extent = geom.getExtent();
            const centerX = (extent[0] + extent[2]) / 2;
            const centerY = (extent[1] + extent[3]) / 2;
            
            return [centerX, centerY];
        } catch (error) {
            console.error("Error obteniendo centroide:", error);
            return null;
        }
    };

    // Función LIMPIA para validar proximidad - SIN DIBUJO
    const validarProximidad = (loteLayer, archivoFeatures) => {
        try {
            // console.log(`🔍 === INICIANDO VALIDACIÓN DE PROXIMIDAD ===`);
            
            // Obtener features del lote
            const loteFeatures = loteLayer.getSource().getFeatures();
            if (loteFeatures.length === 0) return null;
            
            // Obtener centroide del lote
            const centroideLote = obtenerCentroide(loteFeatures[0]);
            if (!centroideLote) return null;
            
            const areaLote = calcularArea(loteFeatures[0]);
            // console.log(`📍 LOTE: Centroide [${centroideLote.join(', ')}], Area: ${areaLote.toFixed(2)} m²`);
            
            // Obtener centroide del conjunto de features del archivo
            const centroideArchivo = obtenerCentroideConjunto(archivoFeatures);
            if (!centroideArchivo) return null;
            
            // DIBUJAR LOS CENTROIDES EN EL MAPA
            dibujarCentroides(centroideLote, centroideArchivo, archivoFeatures);
            
            // Convertir coordenadas para calcular distancia
            const loteWGS84 = transform(centroideLote, 'EPSG:3857', 'EPSG:4326');
            const archivoWGS84 = transform(centroideArchivo, 'EPSG:3857', 'EPSG:4326');
            
            // Calcular distancia entre centroides
            const distancia = getDistance(loteWGS84, archivoWGS84);
            
            // UMBRALES MÁS ESTRICTOS - Para geometrías que deben ser del mismo lote
            let estado, mensaje, color, esValido;
            
            if (distancia <= 5) {
                estado = "muy_cerca";
                mensaje = "✅ Geometrías coinciden - misma ubicación";
                color = "green";
                esValido = true;
            } else if (distancia <= 15) {
                estado = "cerca";
                mensaje = "⚠️ Geometrías cercanas - posible coincidencia";
                color = "blue";
                esValido = true;
            } else if (distancia <= 50) {
                estado = "lejos";
                mensaje = "🚧 Geometrías distantes - verificar coincidencia";
                color = "orange";
                esValido = false; // Ya no es válido para auto-aprobación
            } else {
                estado = "muy_lejos";
                mensaje = "❌ Geometrías muy distantes - NO corresponden";
                color = "red";
                esValido = false;
            }
            
            // console.log(`🎯 === RESULTADO VALIDACIÓN ===
            //     📍 CENTROIDE LOTE: [${centroideLote.join(', ')}]
            //     📍 CENTROIDE ARCHIVO: [${centroideArchivo.join(', ')}]
            //     📏 DISTANCIA: ${distancia.toFixed(1)}m | ESTADO: ${estado}
            //     ✅ ES VÁLIDO: ${esValido}
            //     =====================================`);
            
            return {
                distanciaConjunto: distancia.toFixed(1),
                distanciaMaxima: distancia.toFixed(1),
                estado,
                mensaje,
                color,
                esValido: esValido,
                metodo: "centroide_lote_vs_centroide_archivo_unido"
            };
            
        } catch (error) {
            console.error("Error validando proximidad:", error);
            return null;
        }
    };

    // Función para comparar áreas
    const compararAreas = (areaLote, areaArchivo) => {
        if (areaLote === 0 || areaArchivo === 0) return null;
        
        const diferencia = Math.abs(areaLote - areaArchivo);
        const porcentajeDiferencia = (diferencia / Math.max(areaLote, areaArchivo)) * 100;
        
        let estado = "similar";
        let mensaje = "";
        let color = "green";
        
        if (porcentajeDiferencia <= 5) {
            estado = "muy_similar";
            mensaje = "Las áreas son muy similares";
            color = "green";
        } else if (porcentajeDiferencia <= 15) {
            estado = "similar";
            mensaje = "Las áreas son similares";
            color = "blue";
        } else if (porcentajeDiferencia <= 30) {
            estado = "diferente";
            mensaje = "Las áreas son diferentes";
            color = "orange";
        } else {
            estado = "muy_diferente";
            mensaje = "Las áreas son muy diferentes";
            color = "red";
        }
        
        return {
            areaLote: areaLote.toFixed(2),
            areaArchivo: areaArchivo.toFixed(2),
            diferencia: diferencia.toFixed(2),
            porcentajeDiferencia: porcentajeDiferencia.toFixed(1),
            estado,
            mensaje,
            color
        };
    };

    // Función LIMPIA para comparar áreas y actualizar estados
    const compararAreasYActualizar = (loteLayer, archivoFeatures) => {
        if (!loteLayer || !archivoFeatures || archivoFeatures.length === 0) return;
        
        // 1. Validar proximidad geográfica PRIMERO
        const proximidad = validarProximidad(loteLayer, archivoFeatures);
        setValidacionProximidad(proximidad);
        
        // 2. Solo calcular áreas si están geográficamente cerca
        if (proximidad && proximidad.esValido) {
            const loteFeatures = loteLayer.getSource().getFeatures();
            if (loteFeatures.length === 0) return;
            
            const areaLote = calcularArea(loteFeatures[0]);
            
            // Calcular área TOTAL de TODOS los features del archivo
            const areaTotalArchivo = archivoFeatures.reduce((total, feature) => {
                return total + calcularArea(feature);
            }, 0);
            
            const comparacion = compararAreas(areaLote, areaTotalArchivo);
            setComparacionAreas(comparacion);
            
            // console.log(`Validación completa:
            //     - Proximidad: ${proximidad.mensaje} (${proximidad.distanciaConjunto}m)
            //     - Área lote: ${areaLote.toFixed(2)} m²
            //     - Área archivo (${archivoFeatures.length} features): ${areaTotalArchivo.toFixed(2)} m²`);
        } else {
            setComparacionAreas(null);
            // console.log("Geometrías muy distantes - no se realiza comparación de áreas");
        }
    };

    // Función para dibujar geometrías en el mapa
    const drawGeometriesOnMap = (fileResult) => {
        clearAllUploadedLayers();
        
        const { transformedFeatures, originalFeatures, fileType, originalSRS } = fileResult;
        
        const nombreArchivo = selectedFile?.name || fileResult.fileName || `archivo_${fileType}`;
        
        const featuresWithProps = transformedFeatures.map((feature, index) => ({
            ...feature,
            properties: {
                ...feature.properties,
                namePopup: "archivo-subido",
                nombreArchivo: nombreArchivo,
                index: index,
                // 🏷️ USAR códigos existentes del estado
                codigo_lote: codigosLote[index] || ""
            }
        }));

        const colorBorde = "rgba(0, 0, 0, 1)";
        const colorRelleno = "rgba(54, 130, 252, 0.2)";

        const geojsonFormat = new GeoJSON();

        const featuresOl = geojsonFormat.readFeatures({
            type: "FeatureCollection",
            features: featuresWithProps,
        });

        const source = new VectorSource({ features: featuresOl });
        
        const vectorLayer = new VectorLayer({
            source: source,
            style: (feature) => {
                const codigoLote = feature.get('codigo_lote') || '';
                
                const styles = [
                    // Estilo del polígono
                    new Style({
                        fill: new Fill({ color: colorRelleno }),
                        stroke: new Stroke({ color: colorBorde, width: 2 }),
                        image: new Circle({
                            radius: 7,
                            fill: new Fill({ color: colorRelleno }),
                            stroke: new Stroke({ color: colorBorde, width: 2 }),
                        }),
                    })
                ];
                
                // 🏷️ AGREGAR TEXTO SOLO SI HAY CÓDIGO
                if (codigoLote && codigoLote.trim() !== '') {
                    styles.push(new Style({
                        text: new Text({
                            text: codigoLote,
                            font: 'bold 14px Arial',
                            fill: new Fill({ color: '#000000' }),
                            stroke: new Stroke({ color: '#FFFFFF', width: 3 }),
                            textAlign: 'center',
                            textBaseline: 'middle',
                            offsetY: 0,
                            placement: 'point'
                        })
                    }));
                }
                
                return styles;
            }
        });

        vectorLayer.set('fileType', fileType);
        vectorLayer.set('originalSRS', originalSRS);
        vectorLayer.set('fileName', nombreArchivo);
        vectorLayer.set('isUploadedFile', true);

        map.addLayer(vectorLayer);

        const extent = source.getExtent();
        map.getView().fit(extent, { 
            padding: [20, 20, 20, 20], 
            maxZoom: 18,
            duration: 1000
        });

        const layerInfo = {
            id: Date.now(),
            name: nombreArchivo,
            layer: vectorLayer,
            fileType,
            originalSRS,
            featuresCount: transformedFeatures.length
        };

        setUploadedLayers([layerInfo]);
        
        toast.success(`Geometrías dibujadas en el mapa: ${transformedFeatures.length} features`);
        console.log(`🔄 Capa inicial creada: ${layerInfo.name}`);
        
        return layerInfo;
    };

    // Función auxiliar para actualizar el mapa (extraída de actualizarCodigoLote)
    const actualizarMapaConCodigos = (nuevosCodeigos) => {
        if (uploadedLayers.length > 0) {
            const capa = uploadedLayers[0].layer;
            const source = capa.getSource();
            const features = source.getFeatures();
            
            // Actualizar TODOS los features
            features.forEach((feature, index) => {
                const codigo = nuevosCodeigos[index] || "";
                feature.set('codigo_lote', codigo);
            });
            
            // Forzar re-render del estilo
            capa.changed();
            
            console.log("🗺️ Mapa actualizado con nuevos códigos:", nuevosCodeigos);
        }
    };

    // AGREGAR después de drawGeometriesOnMap
    const actualizarCodigoLote = (featureIndex, nuevoCodigo) => {
        // 🔢 VALIDAR: solo números y máximo 3 dígitos
        const codigoLimpio = nuevoCodigo.replace(/[^0-9]/g, '').slice(0, 3);
        
        setCodigosLote(prev => {
            const nuevosCodeigos = {
                ...prev,
                [featureIndex]: codigoLimpio
            };
            
            // 🔄 ACTUALIZAR MAPA inmediatamente
            actualizarMapaConCodigos(nuevosCodeigos);
            
            console.log(`🏷️ Código actualizado - Feature ${featureIndex}: "${codigoLimpio}"`);
            return nuevosCodeigos;
        });
    };

    // Función para remover una capa del mapa
    const removeLayerFromMap = (layerId) => {
        clearAllUploadedLayers(true); // Con toast
    };

    // Función para limpiar todas las capas subidas
    const clearAllUploadedLayers = (showToast = true) => {
        uploadedLayers.forEach(layerInfo => {
            map.removeLayer(layerInfo.layer);
        });
        setUploadedLayers([]);
        eliminarCentroides();
        setValidacionProximidad(null);
        setComparacionAreas(null);
        
        // 🔧 SOLO LIMPIAR CÓDIGOS
        setCodigosLote({});
        
        if (showToast) {
            clearFile();
            toast.success("Todas las capas subidas han sido removidas");
        }
    };

    // Función para manejar la selección de archivo
    const handleFileSelect = (file) => {
        if (file) {
            setSelectedFile(file);
            processFile(file);
        }
    };

    // Función para calcular el peso del archivo
    const calculateFileSize = (fileResult) => {
        if (!fileResult) return 0;
        
        const dataToMeasure = {
            originalFeatures: fileResult.originalFeatures,
            fileType: fileResult.fileType,
            originalSRS: fileResult.originalSRS
        };
        
        const jsonData = JSON.stringify(dataToMeasure);
        const sizeMB = jsonData.length / (1024 * 1024);
        return sizeMB;
    };

    useEffect(() => {
        // Solo actuar si hay archivo procesado Y loteMaximo disponible
        if (fileData && fileData.transformedFeatures && loteMaximo && loteMaximo.c_cod_lote) {
            console.log(`🔄 LoteMaximo detectado: ${loteMaximo.c_cod_lote} - Regenerando códigos geográficamente...`);
            
            const codigoBase = parseInt(loteMaximo.c_cod_lote);
            const codigoMaximo = codigoBase + fileData.transformedFeatures.length;
            
            // 🔢 MOSTRAR ADVERTENCIA si se exceden los 3 dígitos
            if (codigoMaximo > 999) {
                console.warn(`⚠️ Los códigos excederán 3 dígitos. Máximo: ${codigoMaximo}, limitando a 999`);
                toast.warning(`⚠️ Algunos códigos se limitarán a 999 (máximo permitido)`);
            }
            
            // 🧭 USAR ORDENAMIENTO GEOGRÁFICO
            const nuevosCodeigos = generarCodigosOrdenadosGeograficamente(
                fileData.transformedFeatures, 
                codigoBase
            );
            
            setCodigosLote(nuevosCodeigos);
            
            // Auto-aplicar al mapa inmediatamente
            setTimeout(() => {
                if (uploadedLayers.length > 0) {
                    const capa = uploadedLayers[0].layer;
                    const source = capa.getSource();
                    const features = source.getFeatures();
                    
                    features.forEach((feature, index) => {
                        feature.set('codigo_lote', nuevosCodeigos[index] || "");
                    });
                    
                    capa.changed();
                }
            }, 100);
            
            console.log(`✅ Códigos geográficos regenerados automáticamente:`, nuevosCodeigos);
            const codigoInicial = Math.min(codigoBase + 1, 999);
            toast.success(`Códigos ordenados Norte→Sur desde ${String(codigoInicial).padStart(3, '0')}`);
        }
    }, [loteMaximo?.c_cod_lote, fileData?.transformedFeatures?.length]);

    // Función para procesar archivo
    const processFile = async (file) => {
        setIsProcessingFile(true);
        try {
            const extension = file.name.split('.').pop().toLowerCase();
            let result;

            console.log(extension);
            
            switch (extension) {
                case 'zip':
                    result = await FileProcessor.processShapefile(file);
                    break;
                case 'geojson':
                case 'json':
                    result = await FileProcessor.processGeoJSON(file);
                    break;
                case 'kml':
                    result = await FileProcessor.processKML(file);
                    break;
                case 'dxf':
                    if (!selectedSRS) {
                        toast.error("Debe seleccionar un SRS para archivos DXF.");
                        setIsProcessingFile(false);
                        return;
                    }
                    
                    // 🔧 MOSTRAR qué SRS se está usando
                    console.log(`📍 Procesando DXF con SRS: EPSG:${selectedSRS}`);
                    result = await FileProcessor.processDXF(file, selectedSRS);
                    break;
                default:
                    toast.error("Formato de archivo no soportado. Use ZIP, GeoJSON, KML o DXF.");
                    return;
            }
            if (result.success) {
                result.fileName = file.name;
                setFileData(result);
                const sizeMB = calculateFileSize(result);
                setDataSizeMB(sizeMB);

                // 🏷️ INICIALIZAR CÓDIGOS BASADOS EN LOTE MÁXIMO CON ORDENAMIENTO GEOGRÁFICO
                const codigosIniciales = {};
                
                if (loteMaximo && loteMaximo.c_cod_lote) {
                    // Si hay lote máximo, generar códigos ordenados geográficamente
                    const codigoBase = parseInt(loteMaximo.c_cod_lote);
                    const codigoMaximo = codigoBase + result.transformedFeatures.length;
                    
                    // 🔢 MOSTRAR ADVERTENCIA si se exceden los 3 dígitos
                    if (codigoMaximo > 999) {
                        console.warn(`⚠️ Los códigos excederán 3 dígitos. Máximo: ${codigoMaximo}, limitando a 999`);
                        toast.warning(`⚠️ Algunos códigos se limitarán a 999 (máximo permitido)`);
                    }
                    
                    const codigosOrdenados = generarCodigosOrdenadosGeograficamente(
                        result.transformedFeatures, 
                        codigoBase
                    );
                    
                    Object.assign(codigosIniciales, codigosOrdenados);
                    
                    console.log(`🏷️ Códigos auto-generados geográficamente desde ${loteMaximo.c_cod_lote} + 1`);
                } else {
                    // Sin lote máximo, inicializar vacíos
                    result.transformedFeatures.forEach((feature, index) => {
                        codigosIniciales[index] = "";
                    });
                    
                    console.log(`🏷️ Códigos inicializados vacíos (sin lote máximo)`);
                }
                
                setCodigosLote(codigosIniciales);
                
                console.log(`🏷️ Inputs habilitados para ${result.transformedFeatures.length} features`);

                drawGeometriesOnMap(result);

                setTimeout(() => {
                    if (loteSeleccionadoLayer && result.transformedFeatures.length > 0) {
                        compararAreasYActualizar(loteSeleccionadoLayer, result.transformedFeatures);
                    } else {
                        console.log("⏳ No hay lote seleccionado aún. Validación se ejecutará al seleccionar lote.");
                    }
                }, 100);
                
                toast.success(`Archivo ${extension.toUpperCase()} procesado correctamente`);
            } else {
                toast.error(`Error procesando archivo: ${result.error}`);
            }
        } catch (error) {
            console.error("Error procesando archivo:", error);
            toast.error("Error al procesar el archivo");
        } finally {
            setIsProcessingFile(false);
        }
    };

    // Función para limpiar el archivo seleccionado
    const clearFile = () => {
        // setSelectedFile(null);
        // setSelectedSRS("");
        setDataSizeMB(0);
    };


    // Función CORREGIDA para descargar el lote seleccionado como Shapefile
    const descargarLoteComoShp = async (formData) => {
        if (!loteSeleccionadoLayer) {
            toast.error("Debe seleccionar un lote primero");
            return;
        }

        try {
            console.log("📥 Iniciando descarga del lote como SHP...");

            // Usar la misma lógica que seleccionLote - con featureID
            const layerName = "sp_lote";
            const outputFormat = "SHAPE-ZIP";
            
            // ✅ USAR FEATUREID en lugar de CQL_FILTER (igual que seleccionLote)
            const featureID = `sp_lote.${formData.id_lote}`;
            
            console.log("🔗 FeatureID:", featureID);
            
            // Construcción de la URL usando featureID
            const params = new URLSearchParams({
                geoserver: dataCliente.cliente.servidor_gs,
                workspace: dataCliente.cliente.workspace,
                user_geoserver: dataCliente.cliente.usuario_gs,
                pass_geoserver: dataCliente.cliente.contrasena_gs,
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: `${dataCliente.cliente.workspace}:${layerName}`,
                outputFormat: outputFormat,
                featureID: featureID, // ✅ Usar featureID en lugar de CQL_FILTER
                srsName: 'EPSG:4326'
            });

            const downloadUrl = `/api/geoserver?${params.toString()}`;
            
            console.log("🔗 URL de descarga:", downloadUrl);
            
            // Abrir la descarga en nueva pestaña
            window.open(downloadUrl, '_blank');
            
            toast.success("Descarga iniciada", { id: "download-shp" });
            console.log("✅ Descarga de Shapefile iniciada");

        } catch (error) {
            console.error("❌ Error descargando Shapefile:", error);
            toast.error(`Error al descargar: ${error.message}`, { id: "download-shp" });
        }
    };

    // [RESTO DE FUNCIONES SIN CAMBIOS - generarUrl, seleccionSector, etc...]
    async function generarUrl(item) {
        // console.log(dataCliente);
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
        
        if (capa === "sp_lote" && result) {
            // console.log("✅ Estableciendo nuevo loteSeleccionadoLayer");
            
            // 🧹 LIMPIAR CENTROIDES ANTES de establecer el nuevo lote
            eliminarCentroides();
            
            setLoteSeleccionadoLayer(result.vectorLayer);
            
            // ✅ EJECUTAR VALIDACIÓN INMEDIATAMENTE después de establecer el layer
            setTimeout(() => {
                if (fileData && fileData.transformedFeatures.length > 0) {
                    // console.log("🎯 generarUrl: Ejecutando validación inmediata con nuevo lote");
                    compararAreasYActualizar(result.vectorLayer, fileData.transformedFeatures);
                }
            }, 100);
        }
        
        return result;
    }

    useEffect(() => {
        if (loteSeleccionadoLayer && fileData && fileData.transformedFeatures.length > 0) {
            // console.log("🎯 useEffect: Ambos disponibles - ejecutando validación automática");
            
            // 🧹 LIMPIAR centroides anteriores antes de crear nuevos
            eliminarCentroides();
            
            // Pequeño delay para asegurar que todo esté renderizado
            setTimeout(() => {
                compararAreasYActualizar(loteSeleccionadoLayer, fileData.transformedFeatures);
            }, 200);
        } else {
            console.log("⏳ useEffect: Esperando datos...", {
                loteLayer: !!loteSeleccionadoLayer,
                archivo: !!fileData,
                features: fileData?.transformedFeatures?.length || 0
            });
        }
    }, [loteSeleccionadoLayer, fileData]);

    async function seleccionSector(item) {
        const id_sector = item.target.value;
        setSelectedSector(id_sector);
        setCurrentFormData(prev => ({...prev, id_sector}));
    
        const data = await getBuscadorManzana(id_sector);
        const terminoCodificado = `id_sector = ${id_sector}`
        const capa = {
            capa: "sp_sector",
            terminoBusqueda: `&CQL_FILTER=${terminoCodificado}`,
            projOriginal: "EPSG:32718"
        }
        generarUrl(capa)
        setDataManzana(data);
        setDataLote([]);

        // Limpiar selecciones posteriores
        setSelectedManzana("");
        setSelectedLote("");
    }

    async function seleccionManzana(item) {
        const id_manzana = item.target.value;
        setSelectedManzana(id_manzana);
        setCurrentFormData(prev => ({...prev, id_manzana}));

        const data = await getBuscadorLote(id_manzana);
        
        let loteConCodigoMaximo = null;
        if (data && data.length > 0) {
            loteConCodigoMaximo = data[data.length - 1];
        }

        const terminoCodificado = `sp_manzana.${id_manzana}`
        const capa = {
            capa: "sp_manzana",
            terminoBusqueda: `&featureID=${terminoCodificado}`,
            projOriginal: "EPSG:4326"
        };
        
        generarUrl(capa);
        setDataLote(data);
        setLoteMaximo(loteConCodigoMaximo);

        setSelectedLote("");
    }

    async function seleccionLote(item) {
        const id_lote = item.target.value;
        setSelectedLote(id_lote);
        setCurrentFormData(prev => ({...prev, id_lote}));
        
        const terminoCodificado = `sp_lote.${id_lote}`;
        const capa = {
            capa: "sp_lote",
            terminoBusqueda: `&featureID=${terminoCodificado}`,
            projOriginal: "EPSG:4326"
        };

        setComparacionAreas(null);
        setValidacionProximidad(null);
        setLoteSeleccionadoLayer(null);

        const result = await generarUrl(capa);
    }

    // Función para validar si se puede habilitar el botón de reemplazar
    const validarReemplazoCompleto = () => {
        // 1. Debe haber un lote seleccionado
        if (!loteSeleccionadoLayer) {
            return {
                valido: false,
                razon: "Debe seleccionar un lote para reemplazar"
            };
        }

        // 2. Debe haber archivo cargado
        if (!fileData || uploadedLayers.length === 0) {
            return {
                valido: false,
                razon: "Debe cargar un archivo espacial"
            };
        }

        // 3. Todos los features deben tener códigos asignados
        const featuresConCodigos = fileData.transformedFeatures.filter((_, index) => 
            codigosLote[index] && codigosLote[index].trim() !== ""
        );

        if (featuresConCodigos.length !== fileData.transformedFeatures.length) {
            return {
                valido: false,
                razon: `Faltan códigos: ${featuresConCodigos.length}/${fileData.transformedFeatures.length} features`
            };
        }

        // 4. Validación de proximidad debe ser válida (si existe)
        if (validacionProximidad) {
            if (!validacionProximidad.esValido) {
                return {
                    valido: false,
                    razon: `Geometrías muy distantes (${validacionProximidad.distanciaConjunto}m)`
                };
            }
        } else {
            // Si no hay validación de proximidad, es porque no se ha ejecutado
            return {
                valido: false,
                razon: "Validación de proximidad pendiente"
            };
        }

        // 5. Si hay comparación de áreas y es "muy_diferente", no permitir
        if (comparacionAreas && comparacionAreas.estado === "muy_diferente") {
            return {
                valido: false,
                razon: `Áreas muy diferentes (${comparacionAreas.porcentajeDiferencia}% de diferencia)`
            };
        }

        // 6. Todos los códigos deben ser únicos
        const codigosUsados = Object.values(codigosLote).filter(codigo => codigo && codigo.trim() !== "");
        const codigosUnicos = [...new Set(codigosUsados)];
        
        if (codigosUsados.length !== codigosUnicos.length) {
            return {
                valido: false,
                razon: "Hay códigos de lote duplicados"
            };
        }

        // ✅ Todas las validaciones pasaron
        return {
            valido: true,
            razon: "Todas las validaciones son correctas"
        };
    };

    const enviarReemplazoAlBackend = async () => {
        try {
            console.log("🚀 Enviando reemplazo al backend...", datosResumen);
            const response = await postRegistrarNuevosLotes(datosResumen);
            // console.log("✅ Reemplazo exitoso:", response);
            toast.success("Reemplazo completado exitosamente");
            // Simular el evento que necesita seleccionManzana
            const mockEvent = {
                target: {
                    value: selectedManzana
                }
            };
            // Llamar a la función existente
            await seleccionManzana(mockEvent);
            setIsModalOpenResumen(false);
            return {
                success: true,
                data: response,
                message: response.message || "Reemplazo completado exitosamente"
            };
        } catch (error) {
            toast.error(`Error al enviar reemplazo: ${error.message}`);
            setIsModalOpenResumen(false);
            return {
                success: false,
                error: error.message,
                message: `Error al procesar el reemplazo: ${error.message}`
            };
        }
    };

    // Función de reemplazo de lote
    const reemplazarLote = async (formData) => {
        try {
            console.log("🔄 Preparando datos para reemplazo...");

            // ✅ Validación final de seguridad
            const validacion = validarReemplazoCompleto();
            if (!validacion.valido) {
                toast.error(`No se puede proceder: ${validacion.razon}`);
                return;
            }

            // 🎯 PREPARAR DATOS PARA EL BACKEND
            // ✅ USAR GEOMETRÍAS ORIGINALES (no transformadas) para enviar al backend
            const nuevosLotes = fileData.originalFeatures.map((originalFeature, index) => {
                const codigoLote = codigosLote[index];
                
                // Para cálculos de área usamos las transformadas (más precisas en metros)
                const transformedFeature = fileData.transformedFeatures[index];
                
                return {
                    codigo_lote: codigoLote.trim(),
                    geometria: originalFeature.geometry, // ✅ Geometría original en SRID original
                    propiedades: {
                        area: transformedFeature.properties?.area || calcularArea(transformedFeature),
                        perimetro: transformedFeature.properties?.perimeter || 0,
                        centroide: obtenerCentroideFeature(transformedFeature), // Centroide calculado en 3857 para precisión
                        indice_original: index,
                        srid_geometria: fileData.originalSRS // Especificar explícitamente el SRID
                    },
                    archivo_origen: {
                        nombre: selectedFile?.name || `archivo_${fileData.fileType}`,
                        tipo: fileData.fileType,
                        srs_original: fileData.originalSRS,
                        peso_mb: dataSizeMB
                    }
                };
            });

            // Datos principales del reemplazo
            const datosReemplazo = {
                lote_a_reemplazar: {
                    id_lote: formData.id_lote,
                    id_manzana: formData.id_manzana,
                    id_sector: formData.id_sector,
                    // Agregar códigos legibles para el usuario
                    codigo_sector: dataSectores?.find(s => s.id_sector === parseInt(formData.id_sector))?.c_cod_sector || formData.id_sector,
                    codigo_manzana: dataManzana?.find(m => m.id_manzana === parseInt(formData.id_manzana))?.c_cod_mzna || formData.id_manzana,
                    codigo_lote: dataLote?.find(l => l.id_lote === parseInt(formData.id_lote))?.c_cod_lote || formData.id_lote
                },
                nuevos_lotes: nuevosLotes,
                resumen: {
                    total_features: nuevosLotes.length,
                    area_total_nuevos: nuevosLotes.reduce((total, lote) => 
                        total + (lote.propiedades.area || 0), 0
                    ),
                    area_lote_original: comparacionAreas?.areaLote || null
                },
                validaciones: {
                    proximidad: validacionProximidad,
                    comparacion_areas: comparacionAreas,
                    timestamp: new Date().toISOString()
                },
                metadatos: {
                    fecha_reemplazo: new Date().toISOString(),
                    usuario: dataCliente?.usuario || "sin_identificar",
                    sistema: idsSistema || "sin_sistema",
                    cliente: dataCliente?.cliente?.nombre || "sin_cliente"
                }
            };

            console.log("📊 DATOS PREPARADOS PARA REEMPLAZO:", datosReemplazo);
            
            // 📋 ABRIR MODAL DE RESUMEN
            setDatosResumen(datosReemplazo);
            setIsModalOpenResumen(true);

        } catch (error) {
            console.error("❌ Error preparando reemplazo:", error);
            toast.error("Error al preparar los datos del reemplazo");
        }
    };

    return (
        <>
        <CustomModal
            title="Subdivisión de Lotes Catastrales"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            initialSize={{ width: 400, height: 600 }}
            maxHeight={1000}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Sección de carga de archivos */}
                <div className="mb-4">
                    <CustomSpatialFileUpload
                        onFileChange={handleFileSelect}
                        file={selectedFile}
                        onClose={() => console.log("Archivo cargado")}
                        isProcessingFile={isProcessingFile}
                        acceptTypes=".zip,.geojson,.json,.kml,.dxf"
                    />
                    {isProcessingFile && (
                        <p className="text-sm text-blue-600">Procesando archivo...</p>
                    )}
                    {selectedFile && (
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <span className="text-sm">{selectedFile.name}</span>
                            <Button size="sm" color="danger" variant="light" type="button" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                clearFile();
                            }}>
                                ✕
                            </Button>
                        </div>
                    )}
                    {selectedFile && selectedFile.name.split('.').pop().toLowerCase() === 'dxf' && (
                        <div className="mb-2">
                            <Select
                                label="Sistema de coordenadas (SRS):"
                                placeholder="Seleccionar SRS..."
                                value={selectedSRS}
                                selectedKeys={selectedSRS ? [selectedSRS] : []}
                                onSelectionChange={(keys) => {
                                    const newSRS = Array.from(keys)[0];
                                    setSelectedSRS(newSRS || "");
                                }}
                                className="w-full"
                                size="sm"
                                variant="bordered"
                                isRequired
                            >
                                <SelectItem key="4326" value="4326">
                                    EPSG:4326 - WGS 84
                                </SelectItem>
                                <SelectItem key="3857" value="3857">
                                    EPSG:3857 - Web Mercator
                                </SelectItem>
                                <SelectItem key="32718" value="32718">
                                    EPSG:32718 - UTM zona 18S
                                </SelectItem>
                                <SelectItem key="32717" value="32717">
                                    EPSG:32717 - UTM zona 17S
                                </SelectItem>
                                <SelectItem key="32719" value="32719">
                                    EPSG:32719 - UTM zona 19S
                                </SelectItem>
                                <SelectItem key="24877" value="24877">
                                    EPSG:24877 - PSAD56 / UTM zona 17S
                                </SelectItem>
                                <SelectItem key="24878" value="24878">
                                    EPSG:24878 - PSAD56 / UTM zona 18S
                                </SelectItem>
                                <SelectItem key="24879" value="24879">
                                    EPSG:24879 - PSAD56 / UTM zona 19S
                                </SelectItem>
                            </Select>
                        </div>
                    )}
                    {fileData && (
                        <div className="bg-green-100 p-2 rounded mt-2">
                            <p className="text-sm text-green-800">
                                ✓ Archivo procesado: {fileData.transformedFeatures.length} features encontradas
                            </p>
                            <p className="text-xs text-green-600">
                                SRS original: {fileData.originalSRS} | Tipo: {fileData.fileType}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-green-600">Peso de la capa:</span>
                                <span className="text-xs font-semibold text-green-800">{dataSizeMB.toFixed(2)} MB</span>
                            </div>
                        </div>
                    )}
                    <div className="mt-2 text-xs text-gray-600">
                        {loteMaximo && loteMaximo.c_cod_lote ? (
                            <span>
                                💡 Códigos desde <strong>{(() => {
                                    const siguiente = parseInt(loteMaximo.c_cod_lote) + 1;
                                    return String(Math.min(siguiente, 999)).padStart(3, '0');
                                })()}</strong> 
                                (siguiente al lote máximo: {loteMaximo.c_cod_lote})
                            </span>
                        ) : (
                            <span>💡 Ingrese códigos manualmente (no hay lote máximo disponible)</span>
                        )}
                    </div>
                    {fileData && (
                        <div className="mt-2 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-yellow-800">
                                    🏷️ Códigos de lote ({fileData.transformedFeatures.length} features)
                                </h4>
                                <div className="flex gap-2">
                                    {loteMaximo && loteMaximo.c_cod_lote && (
                                        <Button 
                                            size="sm" 
                                            color="primary" 
                                            variant="light"
                                            type="button"
                                            onPress={() => {
                                                const codigoBase = parseInt(loteMaximo.c_cod_lote);
                                                const codigoMaximo = codigoBase + fileData.transformedFeatures.length;
                                                
                                                // 🔢 VALIDAR si se excederán los 3 dígitos
                                                if (codigoMaximo > 999) {
                                                    const confirmar = window.confirm(
                                                        `⚠️ ADVERTENCIA: Límite de códigos\n\n` +
                                                        `Código base: ${codigoBase}\n` +
                                                        `Features: ${fileData.transformedFeatures.length}\n` +
                                                        `Código máximo resultante: ${codigoMaximo}\n\n` +
                                                        `Los códigos solo pueden tener 3 dígitos (máximo 999).\n` +
                                                        `Los códigos que excedan 999 se establecerán como 999.\n\n` +
                                                        `¿Desea continuar?`
                                                    );
                                                    
                                                    if (!confirmar) {
                                                        return;
                                                    }
                                                }
                                                
                                                // 🧭 USAR ORDENAMIENTO GEOGRÁFICO
                                                const nuevosCodeigos = generarCodigosOrdenadosGeograficamente(
                                                    fileData.transformedFeatures, 
                                                    codigoBase
                                                );
                                                
                                                // ✅ ACTUALIZAR ESTADO Y MAPA INMEDIATAMENTE
                                                setCodigosLote(nuevosCodeigos);
                                                actualizarMapaConCodigos(nuevosCodeigos);
                                                
                                                const codigoInicial = Math.min(codigoBase + 1, 999);
                                                toast.success(`Códigos ordenados Norte→Sur desde ${String(codigoInicial).padStart(3, '0')}`);
                                            }}
                                        >
                                            🧭 Auto-generar Norte→Sur desde {(() => {
                                                const siguiente = parseInt(loteMaximo.c_cod_lote) + 1;
                                                return String(Math.min(siguiente, 999)).padStart(3, '0');
                                            })()}
                                        </Button>
                                    )}
                                    <Button 
                                        size="sm" 
                                        color="secondary" 
                                        variant="light"
                                        type="button"
                                        onPress={() => {
                                            const codigosVacios = {};
                                            fileData.transformedFeatures.forEach((feature, index) => {
                                                codigosVacios[index] = "";
                                            });
                                            
                                            // ✅ ACTUALIZAR ESTADO Y MAPA INMEDIATAMENTE
                                            setCodigosLote(codigosVacios);
                                            actualizarMapaConCodigos(codigosVacios);
                                            
                                            toast.success("Códigos limpiados");
                                        }}
                                    >
                                        🧹 Limpiar códigos
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {fileData.transformedFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className="text-xs text-gray-600 w-16">
                                            Feature {index + 1}:
                                        </span>
                                        <input
                                            type="text"
                                            value={codigosLote[index] || ''}
                                            onChange={(e) => actualizarCodigoLote(index, e.target.value)}
                                            placeholder="000"
                                            className="flex-1 px-2 py-1 text-xs border rounded"
                                            maxLength="3"
                                            pattern="[0-9]{0,3}"
                                            title="Solo números, máximo 3 dígitos"
                                        />
                                        {feature.properties?.area && (
                                            <span className="text-xs text-gray-500 w-20">
                                                {feature.properties.area.toFixed(0)}m²
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-2 text-xs text-gray-600">
                                💡 Los códigos se actualizan automáticamente al escribir
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {loteMaximo && loteMaximo.c_cod_lote ? (
                                    <span>
                                        🧭 Códigos desde <strong>{(() => {
                                            const siguiente = parseInt(loteMaximo.c_cod_lote) + 1;
                                            return String(Math.min(siguiente, 999)).padStart(3, '0');
                                        })()}</strong> 
                                        ordenados Norte→Sur (siguiente al lote máximo: {loteMaximo.c_cod_lote})
                                    </span>
                                ) : (
                                    <span>💡 Ingrese códigos manualmente (no hay lote máximo disponible)</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sección de control de capas subidas - SIMPLIFICADA PARA UNA SOLA CAPA */}
                {uploadedLayers.length > 0 && (
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium">
                                Capa activa:
                            </label>
                            <Button 
                                size="sm" 
                                color="warning" 
                                variant="light" 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clearAllUploadedLayers(true);
                                }}
                            >
                                Remover capa
                            </Button>
                        </div>
                        {/* Solo mostrar la primera (y única) capa */}
                        <div className="bg-blue-50 p-2 rounded text-xs">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-medium">{uploadedLayers[0].name}</span>
                                    <span className="text-gray-500 ml-2">({uploadedLayers[0].featuresCount} features)</span>
                                </div>
                                <Button 
                                    size="sm" 
                                    color="danger" 
                                    variant="light"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        removeLayerFromMap(uploadedLayers[0].id);
                                    }}
                                >
                                    ✕
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <Divider className="my-4" />

                {/* Texto instructivo */}
                <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">
                        Elegir lote que desea cambiar
                    </p>
                </div>

                {/* Formulario de selección */}
                <Controller
                    name={`id_sector`}
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
                    name={`id_manzana`}
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        label="Manzana:"                    
                        disabled={dataManzana?.length==0}
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
                
                <Controller
                    name={`id_lote`}
                    control={control}
                    render={({ field }) => (
                    <Select
                        {...field}
                        label="Lote"
                        disabled={dataLote?.length==0}
                        onChange={(value) => {
                            field.onChange(value);
                            seleccionLote(value);
                        }}
                        selectedKeys={[field.value]}
                    >
                        {dataLote?.map((lote) => (
                            <SelectItem key={lote.id_lote} value={lote.id_lote}>
                                {lote.c_cod_lote}
                            </SelectItem>
                        ))}
                    </Select>
                    )}
                />

                {/* Botón para descargar lote como Shapefile */}
                {selectedLote && loteSeleccionadoLayer && currentFormData.id_lote && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-800">
                                    📁 Descargar lote seleccionado
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    Lote: {dataLote?.find(l => l.id_lote === parseInt(selectedLote))?.c_cod_lote} 
                                    {selectedManzana && ` | Manzana: ${dataManzana?.find(m => m.id_manzana === parseInt(selectedManzana))?.c_cod_mzna}`}
                                    {selectedSector && ` | Sector: ${dataSectores?.find(s => s.id_sector === parseInt(selectedSector))?.c_cod_sector}`}
                                </p>
                            </div>
                            <Button 
                                size="sm" 
                                color="success" 
                                variant="solid"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    descargarLoteComoShp(currentFormData);
                                }}
                                className="flex items-center gap-2"
                            >
                                📥 Descargar SHP
                            </Button>
                        </div>
                    </div>
                )}

                {/* Mostrar información del lote máximo */}
                {loteMaximo && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-medium">📊</span>
                            <div>
                                <p className="text-sm font-medium text-blue-800">
                                    Lote con código más alto:
                                </p>
                                <p className="text-sm text-blue-700">
                                    <span className="font-semibold">{loteMaximo.c_cod_lote}</span>
                                    <span className="text-blue-500 ml-2">(ID: {loteMaximo.id_lote})</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mostrar validación de proximidad */}
                {validacionProximidad && (
                    <div className={`mt-2 p-3 rounded-lg border-l-4 ${
                        validacionProximidad.color === 'green' ? 'bg-green-50 border-green-400' :
                        validacionProximidad.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                        validacionProximidad.color === 'orange' ? 'bg-orange-50 border-orange-400' :
                        'bg-red-50 border-red-400'
                    }`}>
                        <div className="flex items-start gap-2">
                            <span className={`font-medium text-lg ${
                                validacionProximidad.color === 'green' ? 'text-green-600' :
                                validacionProximidad.color === 'blue' ? 'text-blue-600' :
                                validacionProximidad.color === 'orange' ? 'text-orange-600' :
                                'text-red-600'
                            }`}>
                                {validacionProximidad.estado === 'muy_lejos' ? '🚫' : 
                                 validacionProximidad.estado === 'lejos' ? '⚠️' : 
                                 validacionProximidad.estado === 'cerca' ? '📍' : '✅'}
                            </span>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                    validacionProximidad.color === 'green' ? 'text-green-800' :
                                    validacionProximidad.color === 'blue' ? 'text-blue-800' :
                                    validacionProximidad.color === 'orange' ? 'text-orange-800' :
                                    'text-red-800'
                                }`}>
                                    Validación de Proximidad
                                </p>
                                <div className="text-xs space-y-1 mt-1">
                                    <div className="flex justify-between">
                                        <span>Distancia entre centroides:</span>
                                        <span className="font-semibold">{validacionProximidad.distanciaConjunto}m</span>
                                    </div>
                                </div>
                                <p className={`text-xs mt-2 font-medium ${
                                    validacionProximidad.color === 'green' ? 'text-green-600' :
                                    validacionProximidad.color === 'blue' ? 'text-blue-600' :
                                    validacionProximidad.color === 'orange' ? 'text-orange-600' :
                                    'text-red-600'
                                }`}>
                                    {validacionProximidad.mensaje}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Leyenda de centroides - CON ESTILOS INLINE */}
                {validacionProximidad && (
                    <div className="mt-2 mb-2 p-2 bg-gray-50 rounded">
                        <p className="text-xs font-medium text-gray-700 mb-1">Leyenda de centroides en el mapa:</p>
                        <div className="flex flex-wrap gap-3 text-xs">
                            <div className="flex items-center gap-1">
                                <div 
                                    className="w-3 h-3 rounded-full border border-white"
                                    style={{ 
                                        backgroundColor: 'rgb(239, 68, 68)', // bg-red-500
                                        borderColor: 'white',
                                        borderWidth: '1px'
                                    }}
                                ></div>
                                <span>Centroide del lote seleccionado</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div 
                                    className="w-3 h-3 rounded-full border border-white"
                                    style={{ 
                                        backgroundColor: 'rgb(34, 197, 94)', // bg-green-500
                                        borderColor: 'white',
                                        borderWidth: '1px'
                                    }}
                                ></div>
                                <span>Centroide del archivo unido</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            El centroide verde se calcula de la unión de todos los features del archivo
                        </p>
                        
                        {/* Botón para limpiar centroides */}
                        <div className="mt-2">
                            <Button 
                                size="sm" 
                                color="secondary" 
                                variant="light" 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    eliminarCentroides();
                                }}
                            >
                                🧹 Ocultar centroides
                            </Button>
                        </div>
                    </div>
                )}

                {/* Mostrar comparación de áreas */}
                {comparacionAreas && validacionProximidad?.esValido && (
                    <div className={`mt-2 p-3 rounded-lg border-l-4 ${
                        comparacionAreas.color === 'green' ? 'bg-green-50 border-green-400' :
                        comparacionAreas.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                        comparacionAreas.color === 'orange' ? 'bg-orange-50 border-orange-400' :
                        'bg-red-50 border-red-400'
                    }`}>
                        <div className="flex items-start gap-2">
                            <span className={`font-medium text-lg ${
                                comparacionAreas.color === 'green' ? 'text-green-600' :
                                comparacionAreas.color === 'blue' ? 'text-blue-600' :
                                comparacionAreas.color === 'orange' ? 'text-orange-600' :
                                'text-red-600'
                            }`}>
                                {comparacionAreas.estado === 'muy_diferente' ? '⚠️' : 
                                 comparacionAreas.estado === 'diferente' ? '⚡' : 
                                 comparacionAreas.estado === 'similar' ? '📊' : '✅'}
                            </span>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                    comparacionAreas.color === 'green' ? 'text-green-800' :
                                    comparacionAreas.color === 'blue' ? 'text-blue-800' :
                                    comparacionAreas.color === 'orange' ? 'text-orange-800' :
                                    'text-red-800'
                                }`}>
                                    Comparación de Áreas
                                </p>
                                <div className="text-xs space-y-1 mt-1">
                                    <div className="flex justify-between">
                                        <span>Área del lote:</span>
                                        <span className="font-semibold">{comparacionAreas.areaLote} m²</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Área del archivo:</span>
                                        <span className="font-semibold">{comparacionAreas.areaArchivo} m²</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Diferencia:</span>
                                        <span className="font-semibold">{comparacionAreas.diferencia} m²</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Porcentaje:</span>
                                        <span className="font-semibold">{comparacionAreas.porcentajeDiferencia}%</span>
                                    </div>
                                </div>
                                <p className={`text-xs mt-2 font-medium ${
                                    comparacionAreas.color === 'green' ? 'text-green-600' :
                                    comparacionAreas.color === 'blue' ? 'text-blue-600' :
                                    comparacionAreas.color === 'orange' ? 'text-orange-600' :
                                    'text-red-600'
                                }`}>
                                    {comparacionAreas.mensaje}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mensaje cuando están muy lejos */}
                {validacionProximidad && !validacionProximidad.esValido && (
                    <div className="mt-2 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <div className="flex items-start gap-2">
                            <span className="text-red-600 font-medium text-lg">🚫</span>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-800">
                                    Geometrías muy distantes
                                </p>
                                <p className="text-xs text-red-600 mt-1">
                                    No se realiza comparación de áreas porque las geometrías están muy lejos unas de otras.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <Divider className="my-4" />
                {/* Botón de debug temporal - CONDICIÓN MÁS PERMISIVA */}
                {(fileData || loteSeleccionadoLayer) && (
                    <div className="mt-2 mb-2">
                        {/* Mostrar estado actual para debug */}
                        <div className="mt-1 text-xs text-gray-500">
                            <p>Estado: Archivo: {fileData ? '✅' : '❌'} | Lote: {loteSeleccionadoLayer ? '✅' : '❌'}</p>
                        </div>
                    </div>
                )}
                <Button 
                    type="submit" 
                    className="mt-4"
                    color={validarReemplazoCompleto().valido ? "success" : "danger"}
                    isDisabled={!validarReemplazoCompleto().valido}
                >
                    {(() => {
                        const validacion = validarReemplazoCompleto();
                        
                        if (validacion.valido) {
                            return `✅ Reemplazar Lote (${Object.keys(codigosLote).length} códigos válidos)`;
                        } else {
                            return `❌ ${validacion.razon}`;
                        }
                    })()}
                </Button>
            </form>
        </CustomModal>
        {/* Modal de Resumen - COMPONENTE SEPARADO */}
        <ModalResumenReemplazo
            isOpen={isModalOpenResumen}
            onClose={() => {
                setIsModalOpenResumen(false);
                setDatosResumen(null);
            }}
            datosResumen={datosResumen}
            onConfirmar={enviarReemplazoAlBackend} // ✅ NUEVA FUNCIÓN
            onCancelar={() => {
                setIsModalOpenResumen(false);
                setDatosResumen(null);
            }}
        />
        <ButtonMenu
            onPress={() => setIsModalOpen(true)}
            icon={<Buscar />}
            name="Filtro Por Encuesta"
        />
        </>
    );
}