// use-area-icons.js

// Function to get an appropriate icon based on keywords in the area name or type
const getIconByKeywords = (areaName) => {
    const normalizedName = areaName.toLowerCase();
    
    // Array of keyword mappings
    const keywordMappings = [
      { keywords: ["piscina", "alberca", "natación"], icon: "lucide:waves" },
      { keywords: ["gimnasio", "gym", "ejercicio"], icon: "lucide:dumbbell" },
      { keywords: ["salón", "salon", "eventos", "reuniones"], icon: "lucide:users" },
      { keywords: ["parque", "infantil", "niños", "juegos"], icon: "lucide:playground" },
      { keywords: ["cancha", "deportiva", "futbol", "basket"], icon: "lucide:trophy" },
      { keywords: ["bbq", "parrilla", "asador"], icon: "lucide:flame" },
      { keywords: ["juegos", "gaming", "entretenimiento"], icon: "lucide:gamepad-2" },
      { keywords: ["terraza", "mirador", "jardín"], icon: "lucide:palm-tree" },
      { keywords: ["vip", "exclusiv"], icon: "lucide:star" },
      { keywords: ["spa", "masajes", "relax"], icon: "lucide:heart" },
      { keywords: ["cine", "teatro", "audiovisual"], icon: "lucide:video" },
      { keywords: ["biblioteca", "lectura", "estudio"], icon: "lucide:book-open" },
      { keywords: ["yoga", "meditación", "zen"], icon: "lucide:lotus" },
      { keywords: ["coworking", "trabajo", "oficina"], icon: "lucide:briefcase" },
      { keywords: ["música", "musica", "karaoke"], icon: "lucide:music" },
      { keywords: ["bar", "social", "lounge"], icon: "lucide:glass" },
      { keywords: ["comedor", "cafetería", "restaurante"], icon: "lucide:utensils" },
      { keywords: ["lavandería", "lavado"], icon: "lucide:washing-machine" },
      { keywords: ["guardería", "daycare"], icon: "lucide:baby" },
      { keywords: ["mascota", "pet", "perro"], icon: "lucide:paw-print" }
    ];
  
    // Check if any keywords match
    for (const mapping of keywordMappings) {
      if (mapping.keywords.some(keyword => normalizedName.includes(keyword))) {
        return mapping.icon;
      }
    }
  
    // Default icons for specific categories
    if (normalizedName.includes("zona")) return "lucide:map-pin";
    if (normalizedName.includes("sala")) return "lucide:layout";
    if (normalizedName.includes("área") || normalizedName.includes("area")) return "lucide:box";
  
    // Final fallback icon
    return "lucide:layout-grid";
  };
  
  export const getAreaIcon = (tipoArea) => {
    // Static mapping for common areas
    const iconMap = {
      "Piscina": "lucide:waves",
      "Gimnasio": "lucide:dumbbell",
      "Salón Comunal": "lucide:users",
      "Parque Infantil": "lucide:playground",
      "Cancha Deportiva": "lucide:trophy",
      "Zona BBQ": "lucide:flame",
      "Sala de Juegos": "lucide:gamepad-2",
      "Terraza": "lucide:palm-tree",
      "Zona VIP": "lucide:star",
      "Spa": "lucide:heart",
      "Cine": "lucide:video",
      "Biblioteca": "lucide:book-open"
    };
  
    // First try the static mapping
    if (iconMap[tipoArea]) {
      return iconMap[tipoArea];
    }
  
    // If not found in static mapping, try to determine by keywords
    return getIconByKeywords(tipoArea);
  };