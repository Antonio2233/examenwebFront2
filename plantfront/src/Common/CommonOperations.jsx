
export const formatDateInSpainTimezone = (timestamp) => {
  const date = new Date(timestamp);
  // Crear una fecha con la zona horaria de España (CET/CEST)
  return date.toLocaleDateString("es-ES", {
    timeZone: "Europe/Madrid",  // Especificar la zona horaria de España
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};