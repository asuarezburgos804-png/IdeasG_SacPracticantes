import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
// import TabsAutoSwitch from "../herramientas/TabsAutoSwitch";
import SistemaPresentacion from "./SistemaPresentacion";

const Pricing = (props) => {
  const clientesLogo = [
    "/assets/clientes/Fitzcarrald.png",
    "/assets/clientes/kimbiri.jpg",
    "/assets/clientes/maynas.png",
  ];

  return (
    <div>
      {/* Contenedor del Carrusel */}
      <SistemaPresentacion></SistemaPresentacion>

      {/* Sección de Tarjetas Responsivas */}
      {/* <TabsAutoSwitch></TabsAutoSwitch> */}
      <section id="clientes">
        <h2
          className="text-5xl font-bold text-center p-2 text-[#1F2937]  relative block 
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 
       drop-shadow-[0_2px_2px_rgba(255,130,49,0.4)] "
        >
          Clientes
        </h2>
        <div className="flex justify-center items-center bg-white py-12 px-4">
          <div className="bg-white p-6 rounded-2xl   max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
              {clientesLogo.map((src, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white  transition-colors shadow-md flex justify-center items-center"
                >
                  <Image
                    removeWrapper
                    alt={`Cliente ${index + 1}`}
                    className="max-w-[200px] max-h-[200px] object-contain"
                    src={src}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
