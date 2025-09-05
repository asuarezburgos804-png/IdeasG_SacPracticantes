import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;

export const generarResolucion = async (idExpediente, setSuccess, setErrorMessage, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/urbano/asesoria-legal/generar-resolucion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_expediente: idExpediente,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      setSuccess(true);
      return data.data;
    } else {
      setErrorMessage(data.message || "Error al generar resolución");
      setError(true);
      return null;
    }
  } catch (error) {
    console.error("Error generando resolución:", error);
    setErrorMessage("Error de conexión al servidor");
    setError(true);
    return null;
  }
};