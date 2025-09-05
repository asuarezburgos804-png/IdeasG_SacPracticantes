  // Cuando se selecciona un resultado, establecer también el número de expediente
  export const handleSeleccionar = (item, setSeleccionado, setExpediente) => {
    setSeleccionado(item);
    setExpediente(item.expediente);
  };