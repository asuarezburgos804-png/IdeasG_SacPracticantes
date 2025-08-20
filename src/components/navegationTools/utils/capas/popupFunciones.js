import { getRespuestasEncuestaIdaq, obteniendoFilePreguntaEncuesta, obteniendoFotosLotes, obteniendoFotosLotesSJL, obteniendoFotosPreguntaEncuesta, obteniendoUnicatByIdLote } from "@/app/services/espaciales/espaciales";

export function reemplazarNombresPropiedades(data, camposAlias, utilizaAlias) {
    // console.log(data, camposAlias, utilizaAlias);
    let dataSinAlias = [];
    
    // Crear un mapa para un acceso rápido a los alias basados en el campo
    const aliasMap = {};
    camposAlias.forEach(campo => {
        if (campo.b_visible) {
            aliasMap[campo.c_campo] = campo.c_alias;
        }
    });
    
    // Crear un array para almacenar las propiedades de cada feature con nombres reemplazados o no
    const dataConAlias = data.features.map(feature => {
        let propiedades = {};
        if (utilizaAlias) {
            // Reemplazar nombres de propiedades con alias
            for (let key in feature.properties) {
                if (aliasMap[key]) {
                    propiedades[aliasMap[key]] = feature.properties[key];
                }
            }
            dataSinAlias.push(feature.properties);
        } else {
            // Si no se utilizan alias, simplemente añadir las propiedades originales
            propiedades = { ...feature.properties };
        }
        return propiedades;
    });
    
    // Filtrar los IDs
    const idsCapa = data.features.map(feature => {
        // Extraer el ID después del último punto y convertirlo en número
        // console.log(feature.id);
        return feature.id.split('.').pop();
    });

    return { dataSinAlias, dataConAlias, idsCapa };
}

const dataArchivos = [
    { esquema: 'catastro_espaciales', tabla: 'sp_lote', tipo: 'imagen', campoBusqueda: null, campoObtenido: 'img_foto', funcion: obteniendoFotosLotes },
    { esquema: 'catastro_espaciales', tabla: 'sp_lote', tipo: 'localizarFicha', campoBusqueda: null, campoObtenido: null, funcion: obteniendoUnicatByIdLote },
    { esquema: 'catastro_espaciales', tabla: 'sjl_lote_with_data', tipo: 'imagen', campoBusqueda: 'fid', campoObtenido: 'img_foto', funcion: obteniendoFotosLotesSJL },
    { esquema: 'movil', tabla: 'view_tbl_coordenadas_pregunta', tipo: 'respuestaEncuesta', campoBusqueda: 'idaq', campoObtenido: null, funcion: getRespuestasEncuestaIdaq },
    { esquema: 'movil', tabla: 'view_tbl_coordenadas_pregunta', tipo: 'imagen', campoBusqueda: 'idaq', campoObtenido: 'img64', funcion: obteniendoFotosPreguntaEncuesta },
    { esquema: 'movil', tabla: 'view_tbl_coordenadas_pregunta', tipo: 'archivo', campoBusqueda: 'idaq', campoObtenido: 'img64', funcion: obteniendoFilePreguntaEncuesta },
    // { tabla: 'sp_lote', tipo: 'archivo', campo: 'img_foto', nombreArchivo: 'Archivos', funcion: obteniendoFotosLotes }
];

export async function obteniendoArchivos(dataTablas) {
    const promises = [];
    dataTablas.forEach(tabla => {
        dataArchivos.forEach(archivo => {
            if (tabla.tabla === archivo.tabla && tabla.esquema === archivo.esquema) {
                if (archivo.campoBusqueda) {
                    tabla.dataSinAlias.forEach(campo => {
                        const fetchPromise = archivo.funcion(campo[archivo.campoBusqueda]?.toString())
                            .then(result => {
                                // Modifica los objetos en el resultado para usar el tipo como clave en lugar de campo
                                const modifiedResult = result.map(item => ({
                                    ...item,
                                    [archivo.tipo]: item[archivo.campoObtenido],
                                    [archivo.campoObtenido]: undefined  // Elimina el campo original si no lo necesitas
                                }));
    
                                // Agrupa por idaq
                                let archivoObj = tabla.Archivos?.find(a => a[archivo.campoBusqueda] === campo[archivo.campoBusqueda]?.toString());
    
                                if (archivoObj) {
                                    archivoObj[archivo.tipo] = archivoObj[archivo.tipo] ? archivoObj[archivo.tipo].concat(modifiedResult) : modifiedResult;
                                } else {
                                    tabla.Archivos = tabla.Archivos || [];
                                    tabla.Archivos.push({
                                        tabla: archivo.tabla,
                                        [archivo.campoBusqueda]: campo[archivo.campoBusqueda]?.toString(),
                                        [archivo.tipo]: modifiedResult
                                    });
                                }
                            });
                        promises.push(fetchPromise);
                    });
                } else {
                    tabla.idsCapa.forEach(id => {
                        const fetchPromise = archivo.funcion(id.toString())
                            .then(result => {
                                // Modifica los objetos en el resultado para usar el tipo como clave en lugar de campo
                                const modifiedResult = result.map(item => ({
                                    ...item,
                                    [archivo.tipo]: item[archivo.campoObtenido],
                                    [archivo.campoObtenido]: undefined  // Elimina el campo original si no lo necesitas
                                }));

                                let archivoObj = tabla.Archivos?.find(a => a.id === id.toString());
    
                                if (archivoObj) {
                                    archivoObj[archivo.tipo] = archivoObj[archivo.tipo] ? archivoObj[archivo.tipo].concat(modifiedResult) : modifiedResult;
                                } else {
                                    tabla.Archivos = tabla.Archivos || [];
                                    tabla.Archivos.push({
                                        tabla: archivo.tabla,
                                        id: id.toString(),
                                        [archivo.tipo]: modifiedResult
                                    });
                                }
                            });
                        promises.push(fetchPromise);
                    });
                }
            }
        });
    });

    await Promise.all(promises);

    // Combina los resultados de la misma idaq
    dataTablas.forEach(tabla => {
        if (tabla.Archivos) {
            tabla.Archivos = Object.values(tabla.Archivos.reduce((acc, archivo) => {
                const idaq = archivo.idaq || archivo.id;
                if (!acc[idaq]) {
                    acc[idaq] = { ...archivo };
                } else {
                    acc[idaq] = { ...acc[idaq], ...archivo };
                }
                return acc;
            }, {}));
        }
    });
    return dataTablas;
}

