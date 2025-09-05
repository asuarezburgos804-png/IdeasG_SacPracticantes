import environment from "@/config/enviroment";
const API_BASE_URL = environment.url_backend;

export const descargarResolucion = async (idResolucion, setErrorMessage, setError) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/urbano/asesoria-legal/descargar-resolucion/${idResolucion}`
    );
    
    if (response.ok) {
      // Crear un blob del PDF y descargarlo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `resolucion-${idResolucion}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    } else {
      setErrorMessage("Error al descargar la resolución");
      setError(true);
      return false;
    }
  } catch (error) {
    console.error("Error descargando resolución:", error);
    setErrorMessage("Error de conexión al servidor");
    setError(true);
    return false;
  }
};