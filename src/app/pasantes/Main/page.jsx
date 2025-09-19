"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { BuildingIcon } from "@/icons/Alexander/icons";
import Image from "next/image";

// Importa tus componentes
import MesaDePartesRol from "../Alexander/ComponenteA/MesaDePartes/page";
import Programacion from "../Alexander/ComponenteA/RolTecnicoProg/page";
import Acotar from "../Miguel/Componente/Acotar/page";
import AsignarTecnico from "../Fabricio/Componente/AsignarTecnico/page";
import Liquidacion from "../Alexander/ComponenteA/Liquidacion/page";
import VerificacionTitularidad from "../Alexander/ComponenteA/VerificacionTitularidad/page";
import EmisionResolucion from "../Alexander/ComponenteA/EmisionDeResolucion/page";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 👉 Estado inicial en "default" (pantalla de bienvenida)
  const [selectedView, setSelectedView] = useState("default");

  const handleViewChange = (view) => {
    setSelectedView(view);
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
                <p className="font-bold text-inherit">
                  Sistema de Control Urbano
                </p>
                <p className="text-xs text-#4a5565">Municipalidad Distrital</p>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* Módulo Rol Mesa de Partes */}
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
                onPress={() => handleViewChange("mesa")}
              >
                Solicitud
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Módulo Verificacion De Titularidad */}
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
                onPress={() => handleViewChange("verificacion")}
              >
                Asesoría Legal
              </DropdownItem>
              <DropdownItem
                key="emision-resolucion"
                onPress={() => handleViewChange("resolucion")}
              >
                Emisión de Resolución
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Módulo FUHU-FUE */}
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
                onPress={() => handleViewChange("acotar")}
              >
                Acotar
              </DropdownItem>
              <DropdownItem
                key="Asignar-Tecnico"
                onPress={() => handleViewChange("asignar")}
              >
                Asignar Técnico
              </DropdownItem>
              <DropdownItem
                key="Liquidacion"
                onPress={() => handleViewChange("liquidacion")}
              >
                Liquidación
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Módulo Rol Técnico */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                Rol Técnico
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Rol Técnico">
              <DropdownItem
                key="programacion"
                onPress={() => handleViewChange("programacion")}
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
          {/* 👇 Pantalla de Bienvenida */}
          {selectedView === "default" && (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <Image
                src="/escudo.png"
                alt="Escudo Municipalidad"
                width={180}
                height={180}
                className="mb-6"
              />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Bienvenido al Sistema
              </h1>
              <p className="text-lg text-gray-600">
                Municipalidad Distrital – Gestión Urbana
              </p>
            </div>
          )}

          {/* 👇 Vistas de cada módulo */}
          {selectedView === "mesa" && <MesaDePartesRol />}
          {selectedView === "programacion" && <Programacion />}
          {selectedView === "acotar" && <Acotar />}
          {selectedView === "asignar" && <AsignarTecnico />}
          {selectedView === "liquidacion" && <Liquidacion />}
          {selectedView === "verificacion" && <VerificacionTitularidad />}
          {selectedView === "resolucion" && <EmisionResolucion />}
        </div>
      </main>
    </div>
  );
}
