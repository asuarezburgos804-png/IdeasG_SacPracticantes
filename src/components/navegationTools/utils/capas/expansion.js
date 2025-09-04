export const toggleSuperGroup = (id_sg, expandedSuperGroups, setExpandedSuperGroups) => {
    setExpandedSuperGroups(prev => 
      prev.includes(id_sg)
        ? prev.filter(id => id !== id_sg)
        : [...prev, id_sg]
    );
  };
  
  export const toggleGroup = (id_sg, expandedGroups, setExpandedGroups) => {
    setExpandedGroups(prev => 
      prev.includes(id_sg)
        ? prev.filter(id => id !== id_sg)
        : [...prev, id_sg]
    );
  };

  export const toggleLayers = (id_capa, pertenece, expandedLayers, setExpandedLayers) => {
    const layer = { id_capa, pertenece };
    // Verificar si el objeto ya existe en el array
    const exists = expandedLayers.some(
      item => item.id_capa === id_capa && item.pertenece === pertenece
    );
  
    setExpandedLayers(prev =>
      exists
        ? prev.filter(item => item.id_capa !== id_capa || item.pertenece !== pertenece)
        : [...prev, layer]
    );
  };

  export const toggleItem = (item, setExpandedItem) => {
    setExpandedItem(prev =>
      prev.includes(item)
        ? prev.filter(element => element !== item)
        : [...prev, item]
    );
  };
  