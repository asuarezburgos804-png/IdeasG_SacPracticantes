import { FacebookIcon } from "@/icons/social/FacebookIcon";
import { InstagramIcon } from "@/icons/social/InstagramIcon";
import { LinkedinIcon } from "@/icons/social/LinkedinIcon";
import { TiktokIcon } from "@/icons/social/TiktokIcon";
import { YoutubeIcon } from "@/icons/social/YoutubeIcon";
import { Image } from "@nextui-org/react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#399a00] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo y descripción */}
        <div>
          <Image
            width={150}
            src="/assets/logos/logo-sig.png"
            alt="logo glgis"
          />
          <p className="mt-4 text-sm">
            Soluciones GIS de alto rendimiento para gobiernos y empresas.
            Visualiza, analiza y transforma tus datos espaciales.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#e86f1a] transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/herramientas"
                className="hover:text-[#e86f1a] transition-colors"
              >
                Herramientas
              </Link>
            </li>
            <li>
              <Link
                href="/planes"
                className="hover:text-[#e86f1a] transition-colors"
              >
                Planes
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Lima, Perú</li>
            <li>📞 +51 991 095 669</li>
            <li>✉️ consultas@ideasg.org</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.facebook.com/ideasg.geomatica/?locale=it_IT"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.tiktok.com/@ideasggeomatica?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <TiktokIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/ideasg-geomatica/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://www.youtube.com/@IdeasGeomatica"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Footer base */}
      <div className="border-t border-white/30 mt-8 py-4 text-center text-xs px-4">
        © {new Date().getFullYear()} IdeasG. Todos los derechos reservados.
      </div>
    </footer>
  );
}
