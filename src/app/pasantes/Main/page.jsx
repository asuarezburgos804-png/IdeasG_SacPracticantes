"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { 
  BuildingIcon, 
  UserIcon, 
  FileTextIcon,
  SettingsIcon 
} from "@/icons/Alexander/icons";
import MesaDePartesRol from "../Alexander/ComponenteA/MesaDePartes/page";
import Programacion from "../Alexander/ComponenteA/RolTecnicoProg/page";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (ruta) => {
    router.push(ruta);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-#f9fafb">
      {/* Navbar Principal */}
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <div className="flex items-center gap-2">
              <BuildingIcon className="w-8 h-8 text-primary" />
              <div>
                <p className="font-bold text-inherit">Sistema de Control Urbano</p>
                <p className="text-xs text-#4a5565">Municipalidad Distrital</p>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Módulo Rol Mesa de Partes - Desktop */}
        <Dropdown>
            <DropdownTrigger>
            <Button variant="light" className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                Rol Mesa de Partes
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Rol Mesa de Partes">
            <DropdownItem 
                key="mesa-de-partes"
                onPress={() => handleNavigation("/pasantes/Alexander/ComponenteA/MesaDePartes")}
            >
                Solicitud
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>

        {/* Módulo Verificacion De Titularidad - Desktop */}
        <Dropdown>
            <DropdownTrigger>
            <Button variant="light" className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                Verificacion De Titularidad
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Verificacion De Titularidad">
            <DropdownItem 
                key="asesoria-legal"
                onPress={() => handleNavigation("/pasantes/Alexander/ComponenteA/VerificacionTitularidad")}
            >
                Asesoría Legal
            </DropdownItem>
            <DropdownItem 
                key="emision-resolucion"
                onPress={() => handleNavigation("/pasantes/Alexander/ComponenteA/EmisionDeResolucion")}
            >
                Emisión de Resolución
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>

        {/* Módulo FUHU-FUE - Desktop */}
        <Dropdown>
            <DropdownTrigger>
            <Button variant="light" className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                FUHU-FUE
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="FUHU-FUE">
            <DropdownItem 
                key="Acotar"
                onPress={() => handleNavigation("/pasantes/Miguel/Componente/Acotar")}
            >
                Acotar
            </DropdownItem>
            <DropdownItem 
                key="Asignar-Tecnico"
                onPress={() => handleNavigation("/pasantes/Fabricio/Componente/AsignarTecnico")}
            >
                AsignarTecnico
            </DropdownItem>
            <DropdownItem 
                key="Liquidacion"
                onPress={() => handleNavigation("/pasantes/Alexander/ComponenteA/Liquidacion")}
            >
                Liquidacion
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>

        {/* Módulo Rol Técnico - Desktop */}
        <Dropdown>
            <DropdownTrigger>
            <Button variant="light" className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                Rol Técnico
            </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Rol Técnico">
            <DropdownItem 
                key="Programacion"
                onPress={() => handleNavigation("/pasantes/Alexander/ComponenteA/RolTecnicoProg")}
            >
                Expedientes
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </NavbarContent>

      </Navbar>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center"> 
          <MesaDePartesRol/>
          <Programacion/>
        </div>
      </main>
    </div>
  );
}