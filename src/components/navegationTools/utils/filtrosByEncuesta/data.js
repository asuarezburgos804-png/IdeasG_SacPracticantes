export function eliminarRespuestasDuplicadas(data) {
    // Iterar sobre cada clave en el objeto respuestas
    for (const uuid in data.respuestas) {
      if (data.respuestas.hasOwnProperty(uuid)) {
        // Obtener el array de respuestas
        const respuestasArray = data.respuestas[uuid];
        
        // Crear un conjunto para rastrear las respuestas vistas
        const respuestasVistas = new Set();
        
        // Filtrar las respuestas eliminando duplicados
        const respuestasUnicas = respuestasArray.filter(respuesta => {
          // Crear una representación única para cada respuesta
          const respuestaClave = `${respuesta.id_pregunta_encuesta}|${respuesta.c_pregunta}|${respuesta.c_respuesta}|${respuesta.c_tipo}`;
          
          // Verificar si la clave ya existe en el conjunto
          if (respuestasVistas.has(respuestaClave)) {
            // Respuesta duplicada, se descarta
            return false;
          } else {
            // Añadir la clave al conjunto y mantener la respuesta
            respuestasVistas.add(respuestaClave);
            return true;
          }
        });
  
        // Actualizar el array de respuestas con las respuestas únicas
        data.respuestas[uuid] = respuestasUnicas;
      }
    }
  
    return data;
  }