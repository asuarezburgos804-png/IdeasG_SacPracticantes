import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;

// Función para obtener técnicos del backend
export const obtenerTecnicos = async (setTecnicosList, setErrorMessage, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/urbano/mesa-partes/tecnicos`
    );
    const data = await response.json();
    if (data.success) {
      setTecnicosList(data.data);
    } else {
      setErrorMessage(data.message || "Error al cargar técnicos");
      setError(true);
    }
  } catch (error) {
    console.error("Error obteniendo técnicos:", error);
    setErrorMessage("Error de conexión al servidor");
    setError(true);
  }
};
