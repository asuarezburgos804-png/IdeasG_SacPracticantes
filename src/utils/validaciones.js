export const validateDNI = (value) => {
  if (!value) return "El DNI es requerido";
  if (!/^\d{8}$/.test(value)) return "El DNI debe tener exactamente 8 dígitos numéricos";
  if (value < 0) return "El DNI no puede ser negativo";
  return true;
};

export const validateEmail = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return "Ingrese un correo electrónico válido";
  }
  return true;
};

export const validatePlaca = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  if (!/^[A-Z0-9-]{6,8}$/.test(value)) {
    return "Placa inválida (6-8 caracteres alfanuméricos o guiones)";
  }
  return true;
}

export const validateName = (value) => {
  if (!value) return "El nombre es requerido";
  if (!/^[a-zA-Z\s]*$/.test(value)) {
    return "El nombre solo puede contener letras";
  }
  return true;
};

export const validateAlphanumeric = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
    return "Solo puede contener letras, números y espacios";
  }
  return true;
};

export const validateOnlyLetters = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  if (!/^[a-zA-Z\u00C0-\u00FF\s]*$/.test(value)) {
    return "Solo puede contener letras y espacios";
  }
  return true;
};

export const validatePhone = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  if (!/^[0-9+\-\(\)\s]*$/.test(value)) {
    return "El teléfono solo puede contener números, +, -, (), y espacios";
  }
  return true;
};

export const validateDateOfBirth = (value) => {
  if (!value) return true; // Permite vacío, la regla required lo controla
  // // Verificar formato YYYY-MM-DD
  // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  // if (!dateRegex.test(value)) {
  //   return "La fecha debe tener el formato AAAA-MM-DD";
  // }

  // Extraer el año de la fecha
  const year = parseInt(value.split("-")[0], 10);
  const currentYear = new Date().getFullYear();

  // Validar que el año tenga 4 dígitos
  if (year.toString().length !== 4) {
    return "El año debe tener exactamente 4 dígitos";
  }

  // Validar rango de años
  const minYear = currentYear - 150;
  if (year < minYear) {
    return `El año no puede ser anterior a ${minYear}`;
  }

  const maxYear = currentYear + 1;
  if (year >= maxYear) {
    return `El año no puede ser mayor a ${currentYear}`;
  }

  // Validar que la fecha sea válida
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "La fecha ingresada no es válida";
  }

  // Verificar que la fecha no sea futura
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche
  console.log("Fecha ingresada:", date, "Hoy:", today, "Comparación:", date >= today);
  if (date >= today) {
    return "La fecha de nacimiento no puede ser mayor a la fecha actual";
  }

  return true;
};