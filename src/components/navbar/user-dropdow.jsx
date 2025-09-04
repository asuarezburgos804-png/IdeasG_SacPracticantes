import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Importa signOut de next-auth/react
import React from "react";

export const UserDropdown = () => {
  const router = useRouter();
  const handleAction = async (actionKey) => {
    if (actionKey === "logout") {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ajusta el tiempo según sea necesario
      await signOut({ callbackUrl: "/" }); // Cierra la sesión y redirige al login
    }
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" size="md" src="/assets/logos/logo-sig.png" />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="User menu actions" onAction={handleAction}>
        <DropdownItem
          textValue="Cerrar sesión del usuario"
          key="logout"
          color="danger"
        >
          <Link className="text-md">Cerrar sesión</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
