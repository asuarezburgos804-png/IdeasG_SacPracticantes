 import environment from "@/config/enviroment";
 const API_BASE_URL = environment.url_backend; 
  // Registrar solicitud
  export const handleRegistrar = async () => {
    if (!seleccionado) {
      setErrorMessage("Debe seleccionar una solicitud");
      setError(true);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/urbano/mesa-partes/asignar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_solicitud: seleccionado.id_solicitud,
            numero_expediente: expediente,
            id_tecnico: tecnico,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        // Limpia el formulario
        setExpediente("");
        setTecnico("");
        setSeleccionado(null);
        setResultados([]);
        setBusqueda("");
      } else {
        setErrorMessage(data.message || "Error al registrar");
        setError(true);
      }
    } catch (error) {
      console.error("Error asignando expediente/técnico:", error);
      setErrorMessage("Error de conexión al servidor");
      setError(true);
    }
  };