import { GalleryIcon } from "@/icons/GaleryIcon";
import IconBxCog from "@/icons/pestanas/AdministracionIcon";
import IconClipboardCheck from "@/icons/pestanas/AuditoriaIcon";
import IconSearchLoading from "@/icons/pestanas/BusquedaIcon";
import IconBxHome from "@/icons/pestanas/CatastroIcon";
import IconAreaChart from "@/icons/pestanas/EstadistitcaIcon";
import IconGavel from "@/icons/pestanas/FiscalizacionIcon";
import IconBxChalkboard from "@/icons/pestanas/MaestroIcon";
import IconLayers from "@/icons/pestanas/MapIcon";
import IconMapLocationDot from "@/icons/pestanas/MapaIcon";
import IconShieldLock from "@/icons/pestanas/SeguridadIcon";
import IconPuzzleEditOutline from "@/icons/pestanas/TematicoIcon";

const iconRegistry = {
  GalleryIcon: <GalleryIcon />,
  AdministracionIcon: <IconBxCog></IconBxCog>,
  AuditoriaIcon: <IconClipboardCheck></IconClipboardCheck>,
  BusquedaIcon: <IconSearchLoading></IconSearchLoading>,
  CapasIcon: <IconLayers></IconLayers>,
  CatastroIcon: <IconBxHome></IconBxHome>,
  EstadisticaIcon: <IconAreaChart></IconAreaChart>,
  FiscalizacionIcon: <IconGavel></IconGavel>,
  MaestroIcon: <IconBxChalkboard></IconBxChalkboard>,
  MapaIcon: <IconMapLocationDot></IconMapLocationDot>,
  SeguridadIcon: <IconShieldLock></IconShieldLock>,
  TematicoIcon: <IconPuzzleEditOutline></IconPuzzleEditOutline>,
};

export default iconRegistry;
