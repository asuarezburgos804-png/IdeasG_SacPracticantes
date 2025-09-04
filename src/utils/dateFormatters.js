// utils/dateFormatters.js

/**
 * Convierte una fecha VARCHAR (YYYY-MM-DD HH:MM:SS.fff) a formato DD/MM/YYYY HH:MM
 */
export const formatVarcharDateToDisplay = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "N/A";
  try {
    const [datePart, timePart] = dateString.split(" ");
    if (!datePart || !timePart) return "N/A";
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    if (!year || !month || !day || !hour || !minute) return "N/A";
    return `${day}/${month}/${year} ${hour}:${minute}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};

/**
 * Convierte un objeto Date a VARCHAR (YYYY-MM-DD HH:MM:SS)
 */
export const formatDateToVarchar = (date) => {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error("Error formatting date to VARCHAR:", error);
    return "";
  }
};

/**
 * Valida y formatea una fecha para un input datetime-local
 */
export const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 16);
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return "";
  }
};
