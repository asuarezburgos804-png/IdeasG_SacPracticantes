import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;

export const buscarExpedientes = async (query, setResultados, setErrorMessage, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/urbano/asesoria-legal/expedientes?search=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.success) {
      // Usar el campo correcto 'titulo_verificado' que viene del backend
      const expedientesConVerificacion = data.data.map(expediente => ({
        ...expediente,
        titulo_verificado: Boolean(expediente.titulo_verificado) // Asegurar que sea boolean
      }));
      setResultados(expedientesConVerificacion);
    } else {
      setResultados([]);
      setErrorMessage(data.message || "Error en la búsqueda");
      setError(true);
    }
  } catch (error) {
    console.error("Error buscando expedientes:", error);
    setErrorMessage("Error de conexión al servidor");
    setError(true);
    setResultados([]);
  }
};