import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;

export const verificarTitularidad = async (idExpediente, verificado, setSuccess, setErrorMessage, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/urbano/asesoria-legal/verificar-titularidad`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_expediente: idExpediente,
          verificado: verificado,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      setSuccess(true);
      return data;
    } else {
      setErrorMessage(data.message || "Error al verificar titularidad");
      setError(true);
      return null;
    }
  } catch (error) {
    console.error("Error verificando titularidad:", error);
    setErrorMessage("Error de conexión al servidor");
    setError(true);
    return null;
  }
};