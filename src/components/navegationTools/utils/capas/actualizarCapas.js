import loadLayers from "./LoadLayers";
const updateLayersChecked = (newLayers,setLayersChecked) => {
    setLayersChecked(prev => {
        const updatedLayers = [...prev];

        // Añadimos o actualizamos las capas
        newLayers.forEach(layer => {
        const index = updatedLayers.findIndex(l => 
            l.id_capa === layer.id_capa && 
            l.pertenece === layer.pertenece && 
            l.id_grupo === layer.id_grupo && 
            l.id_sg === layer.id_sg
        );
        if (index >= 0) {
            updatedLayers[index] = layer;
        } else {
            updatedLayers.push(layer);
        }
        });
        return updatedLayers;
    });
};

// export const handleLayersUpdate = (map,data,setLayersChecked, session) => {
//     if (!data) return;

//     // Obtener las capas actuales en el mapa que pertenecen a 'grupo'
//     const arrayCapasGrupo = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'grupo');

//     // Obtener los IDs de las capas actuales en el mapa
//     const currentLayerIds = arrayCapasGrupo.map(layer => (layer.getProperties().capas_id));

//     // Comparar las capas nuevas con las actuales en el mapa
//     const layersNotInMap = data.filter(item => !currentLayerIds.includes(item.capas_id));
    
//     // Para ver el resultado
//     // console.log('Layers not present in the map:', layersNotInMap);

//     // Agregar las capas que no están presentes
//     loadLayers(map, layersNotInMap, session);

//     // Determinar las capas que deben ser eliminadas
//     const newLayerIds = data.map(item => item.capas_id);
//     const layersToRemove = arrayCapasGrupo.filter(layer => !newLayerIds.includes(layer.getProperties().capas_id) && layer.getProperties().pertenece === 'grupo');

//     // Para ver el resultado
//     // console.log('Layers to remove:', layersToRemove);

//     // Eliminar las capas que ya no están en el nuevo array
//     layersToRemove.forEach(layer => {
//         map.removeLayer(layer);
//     });

//     // Crear un nuevo array de capas con todos los campos necesarios
//     const arrayCapasGrupoSet = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'grupo');
 
//     const newLayers = arrayCapasGrupoSet.map(item => ({
//         id_capa: item.getProperties().capas_id,
//         pertenece: 'grupo',
//         visible: item.getProperties().visible,
//         id_grupo: item.getProperties().id_grupo, // Asegúrate de que `data.capas` incluya `id_grupo`
//         id_sg: item.getProperties().id_sg,      // Asegúrate de que `data.capas` incluya `id_sg`
//         n_opacity: 1,
//         n_swipe: 0
//     }));
//     // Actualizar el estado de las capas
//     updateLayersChecked(newLayers,setLayersChecked);
// };

// export const handleLayersUpdateSG = (map,data,setLayersChecked, session) => {
//     if (!data) return;

//     // Obtener las capas actuales en el mapa que pertenecen a 'grupo'
//     const arrayCapasSuperGrupo = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'supergrupo');

//     // Obtener los IDs de las capas actuales en el mapa
//     const currentLayerIds = arrayCapasSuperGrupo.map(layer => layer.getProperties().capas_id);

//     // Comparar las capas nuevas con las actuales en el mapa
//     const layersNotInMap = data.filter(item => !currentLayerIds.includes(item.capas_id));

//     // Para ver el resultado
//     // console.log('Layers not present in the map:', layersNotInMap);

//     // Agregar las capas que no están presentes
//     loadLayers(map, layersNotInMap, session);

//     // Determinar las capas que deben ser eliminadas
//     const newLayerIds = data.map(item => item.capas_id);
//     const layersToRemove = arrayCapasSuperGrupo.filter(layer => !newLayerIds.includes(layer.getProperties().capas_id) && layer.getProperties().pertenece === 'supergrupo');

//     // Eliminar las capas que ya no están en el nuevo array
//     layersToRemove.forEach(layer => {
//         map.removeLayer(layer);
//     });

//     // Crear un nuevo array de capas con todos los campos necesarios
//     const arrayCapasGrupoSet = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'supergrupo');
    
//     // Actualizar el estado si es necesario
//     const newLayers = arrayCapasGrupoSet.map(item => ({
//         id_capa: item.getProperties().capas_id,
//         pertenece: 'supergrupo',
//         visible: item.getProperties().visible,
//         id_grupo: item.getProperties().id_grupo, // Asegúrate de que `data.capas` incluya `id_grupo`
//         id_sg: item.getProperties().id_sg,      // Asegúrate de que `data.capas` incluya `id_sg`
//         n_opacity: 1,
//         n_swipe: 0
//     }));

//     updateLayersChecked(newLayers,setLayersChecked);
// };

export const handleLayersUpdateAll = (map,data,setLayersChecked, session) => {
    if (!data) return;

    // Obtener las capas actuales en el mapa que pertenecen a 'grupo'
    const arrayCapasGrupo = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'grupo' || item.getProperties().pertenece === 'supergrupo');

    // Obtener los IDs de las capas actuales en el mapa
    const currentLayerIds = arrayCapasGrupo.map(layer => (layer.getProperties().capas_id));

    // Comparar las capas nuevas con las actuales en el mapa
    const layersNotInMap = data.filter(item => !currentLayerIds.includes(item.capas_id));
    
    // Para ver el resultado
    // console.log('Layers not present in the map:', layersNotInMap);

    // Agregar las capas que no están presentes
    loadLayers(map, layersNotInMap, session);

    // Determinar las capas que deben ser eliminadas
    const newLayerIds = data.map(item => item.capas_id);
    const layersToRemove = arrayCapasGrupo.filter(layer => !newLayerIds.includes(layer.getProperties().capas_id) && (layer.getProperties().pertenece === 'grupo' || layer.getProperties().pertenece === 'supergrupo'));

    // Para ver el resultado
    // console.log('Layers to remove:', layersToRemove);

    // Eliminar las capas que ya no están en el nuevo array
    layersToRemove.forEach(layer => {
        map.removeLayer(layer);
    });

    // Crear un nuevo array de capas con todos los campos necesarios
    const arrayCapasGrupoSet = map.getLayers().getArray().filter(item => item.getProperties().pertenece === 'grupo'|| item.getProperties().pertenece === 'supergrupo');

    const newLayers = arrayCapasGrupoSet.map(item => ({
        id_capa: item.getProperties().capas_id,
        pertenece:item.getProperties().pertenece,
        visible: item.getProperties().visible,
        id_grupo: item.getProperties().id_grupo, // Asegúrate de que `data.capas` incluya `id_grupo`
        id_sg: item.getProperties().id_sg,      // Asegúrate de que `data.capas` incluya `id_sg`
        n_opacity: 1,
        n_swipe: 0
    }));
    // Actualizar el estado de las capas
    // console.log(newLayers);

    updateLayersChecked(newLayers,setLayersChecked);
};