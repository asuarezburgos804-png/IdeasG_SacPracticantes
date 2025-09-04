"use client";

import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenidos a <span className="text-[#3a9b02]">BIZGIS</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma integral de gestión empresarial con tecnología GIS para optimizar 
            tus procesos de ventas, distribución y marketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#3a9b02] text-white hover:bg-[#2F855A] px-8 py-3"
            >
              Comenzar ahora
            </Button>
            <Button 
              size="lg" 
              variant="bordered" 
              className="border-[#3a9b02] text-[#3a9b02] hover:bg-[#3a9b02] hover:text-white px-8 py-3"
            >
              Ver demo
            </Button>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div id="modulos" className="bg-white py-16">
        <div className="mx-auto my-6 w-4/5">
          <h2 className="text-3xl text-[#3a9b02] font-normal text-center mb-12">
            Módulos Bizgis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
            
            {/* Bizgis Principal */}
            <div className="relative w-full max-w-60 mx-auto h-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-12 border-b border-[#D1D5DB] flex items-center pl-5 bg-[#F9FAFB] rounded-t-lg">
                <span className="text-lg font-semibold text-[#1F2937]">Bizgis</span>
              </div>
              <div className="w-full h-full max-h-56 p-4 border-b border-[#D1D5DB]">
                <span className="text-sm font-medium text-[#374151] mb-4 block">
                  Características:
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-[#4B5563]">
                    • Seguimiento de pedidos
                  </span>
                  <span className="text-sm text-[#4B5563]">
                    • Seguimiento de vendedor
                  </span>
                  <span className="text-sm text-[#4B5563]">
                    • Zona de venta - clientes
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end p-4">
                <Link
                  href="/sistema/bizgis"
                  className="px-4 py-2 bg-[#3a9b02] text-white rounded-lg hover:bg-[#2F855A] transition-colors duration-200"
                >
                  Ingresar
                </Link>
              </div>
            </div>

            {/* Bizgis Marketing */}
            <div className="relative w-full max-w-60 mx-auto h-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-12 border-b border-[#D1D5DB] flex items-center pl-5 bg-[#F9FAFB] rounded-t-lg">
                <span className="text-lg font-semibold text-[#1F2937]">
                  Bizgis Marketing
                </span>
              </div>
              <div className="w-full h-full max-h-56 p-4 border-b border-[#D1D5DB]">
                <span className="text-sm font-medium text-[#374151] mb-4 block">
                  Próximamente...
                </span>
              </div>
              <div className="flex items-center justify-end p-4">
                <Link
                  href="#"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Próximamente
                </Link>
              </div>
            </div>

            {/* Bizgis Distribución */}
            <div className="relative w-full max-w-60 mx-auto h-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-12 border-b border-[#D1D5DB] flex items-center pl-5 bg-[#F9FAFB] rounded-t-lg">
                <span className="text-lg font-semibold text-[#1F2937]">
                  Bizgis de Distribución
                </span>
              </div>
              <div className="w-full h-full max-h-56 p-4 border-b border-[#D1D5DB]">
                <span className="text-sm font-medium text-[#374151] mb-4 block">
                  Próximamente...
                </span>
              </div>
              <div className="flex items-center justify-end p-4">
                <Link
                  href="#"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Próximamente
                </Link>
              </div>
            </div>

            {/* Bizgis Ventas */}
            <div className="relative w-full max-w-60 mx-auto h-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-12 border-b border-[#D1D5DB] flex items-center pl-5 bg-[#F9FAFB] rounded-t-lg">
                <span className="text-lg font-semibold text-[#1F2937]">
                  Bizgis de Ventas
                </span>
              </div>
              <div className="w-full h-full max-h-56 p-4 border-b border-[#D1D5DB]">
                <span className="text-sm font-medium text-[#374151] mb-4 block">
                  Próximamente...
                </span>
              </div>
              <div className="flex items-center justify-end p-4">
                <Link
                  href="#"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  Próximamente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#3a9b02] mb-4">BIZGIS</h3>
            <p className="text-gray-400 mb-6">
              Transformando la gestión empresarial con tecnología GIS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contacto
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              © 2025 BIZGIS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
