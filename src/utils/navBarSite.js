import {
  Activity,
  ChevronDown,
  Flash,
  Scale,
  Server,
  TagUser,
  Lock,
} from "@/icons/icons.jsx";

export const menuItems = [
  { label: "QUIÉNES SOMOS", url: "/geomidis/sobre" },
  {
    label: "COMPONENTES",
    subItems: [
      {
        label: "Catálogo de Objetos Geográficos",
        url: "/geomidis/catobj_geograficos",
      },
      { label: "Catálogo de   Metadatos", url: "/geomidis/cat_metadatos" },
      { label: "Geoservicios", url: "/geomidis/geoservicios" },
      {
        label: "Documentos técnicos y normativas",
        url: "/geomidis/doctech_normativo",
      },
      { label: "Visor Geográfico", url: "/geomidis/visor_geografico" },
      {
        label: "Visores de aplicaciones temáticas",
        url: "/geomidis/visores_tematicos",
      },
    ],
  },
  {
    label: "ENLACES DE INTERÉS",
    subItems: [
      { label: "InfoMIDIS", url: "https://sdv.midis.gob.pe/infomidis/#/" },
      { label: "RedInforma", url: "https://sdv.midis.gob.pe/redinforma" },
      {
        label: "MIDIStrito",
        url: "https://sdv.midis.gob.pe/RedInforma/Reporte/Reporte?id=18",
      },
      {
        label: "Mi Región",
        url: "https://sdv.midis.gob.pe/RedInforma/Reporte/Reporte?id=17",
      },
      {
        label: "Mi ámbito",
        url: "https://sdv.midis.gob.pe/RedInforma/Reporte/Reporte?id=27",
      },
      {
        label: "Tablero de Control de Anemia",
        url: "https://sdv.midis.gob.pe/RedInforma/Reporte/OtrosRecursos?id=1",
      },
    ],
  },

  { label: "ACTIVIDADES", url: "/geomidis/componentes" },
];

export const icons = {
  chevron: <ChevronDown fill="white" size={16} />,
  chevron2: <ChevronDown fill="black" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: (
    <Activity className="text-secondary" fill="currentColor" size={30} />
  ),
  flash: <Flash className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <TagUser className="text-danger" fill="currentColor" size={30} />,
};

export const links = [
  {
    label: "Catálogo de Objetos Geográficos",
    url: "/geomidis/catobj_geograficos",
  },
  { label: "Catálogo de Metadatos", url: "/geomidis/cat_metadatos" },
  { label: "Geoservicios", url: "/geomidis/geoservicios" },
  { label: "Visor Geográfico", url: "/geomidis/visor_geografico" },
  {
    label: "Visores de Aplicaciones Temáticas",
    url: "/geomidis/visores_tematicos",
  },
];
