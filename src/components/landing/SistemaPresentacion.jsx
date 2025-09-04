import { Image } from "@nextui-org/react";

export default function SistemaPresentacion() {
  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/dibujo-montana-colores-rojo-amarillo_783884-45805.jpg?ga=GA1.1.1103086534.1748640265&semt=ais_hybrid&w=740')",
      }}
    >
      {/* Overlay opcional para mejor contraste */}
      <div className="absolute inset-0 bg-white/90 z-0"></div>

      <div className="relative w-full px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        {/* TEXTOS */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
            <span className="text-verdeIdeas">GLGIS</span>, Sistema de
            Información Geográfica para Gobiernos Locales
          </h1>
          <p className="mt-6 text-lg text-[#6B7280] mx-auto md:mx-0">
            GLGIS es una plataforma diseñada para facilitar el trabajo y la
            gestión del territorio de las municipalidades distritales y
            provinciales en el Perú.
          </p>
        </div>

        {/* IMAGEN ADELANTE */}
        <div className="flex-1 flex justify-center relative z-10">
          <Image
            src="https://img.freepik.com/fotos-premium/dibujo-montana-colores-rojo-amarillo_783884-45805.jpg?ga=GA1.1.1103086534.1748640265&semt=ais_hybrid&w=740"
            alt="Mapa GIS"
            className="rounded-xl    object-contain"
          />

          {/* Decoración */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F59E0B] opacity-20 rounded-full blur-3xl z-0"></div>
        </div>
      </div>
    </section>
  );
}
