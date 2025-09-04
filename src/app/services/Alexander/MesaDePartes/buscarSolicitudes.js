import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;
// Función para buscar solicitudes en el backend
  export const buscarSolicitudes = async (query) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/urbano/mesa-partes/solicitudes?search=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      if (data.success) {
        setResultados(data.data);
      } else {
        setResultados([]);
        setErrorMessage(data.message || "Error en la búsqueda");
        setError(true);
      }
    } catch (error) {
      console.error("Error buscando solicitudes:", error);
      setErrorMessage("Error de conexión al servidor");
      setError(true);
      setResultados([]);
    }
  };
