"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { UserCircle } from "@/icons/landing/userCircle";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("herramientas");
  const handleRedirect = () => {
    router.push("/register");
  };
  const handleRedirectLogin = () => {
    router.push("/dashboard");
  };
  return (
    <Navbar
      maxWidth="full"
      className=" text-verdeIdeas shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "transition-all",
          "duration-300",
          "hover:text-verdeIdeas",
          "data-[active=true]:font-semibold",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-1/2",
          "data-[active=true]:after:-translate-x-1/2",
          "data-[active=true]:after:w-8",
          "data-[active=true]:after:h-[3px]",
          "data-[active=true]:after:rounded-full",
          "data-[active=true]:after:bg-verdeIdeas",
        ],
      }}
    >
      <NavbarBrand>
        <Image width={150} src="/assets/logos/logo-sig.png" alt="logo glgis" />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link href="/">Inicio</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/herramientas"}>
          <Link href="/herramientas">Herramientas</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/planes"}>
          <Link href="/planes">Planes</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            onPress={handleRedirect}
            className="bg-gradient-to-r from-[#FF6A00] via-[#FF8C42] to-[#FFA94D] text-white font-semibold shadow-[0_4px_12px_rgba(255,106,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,106,0,0.6)] hover:scale-105 transition-transform duration-300"
            radius="lg"
            variant="shadow"
          >
            Empezar Gratis
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={handleRedirectLogin}
            className="border-naranjaIdeas text-naranjaIdeas font-medium hover:bg-[#fff3ec] transition"
            startContent={<UserCircle />}
            variant="bordered"
            radius="lg"
          >
            Iniciar Sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
