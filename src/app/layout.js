import "@/styles/globals.css";
import { Providers } from "@/app/providers";
import dynamic from "next/dynamic";
import ClienteProvider from "@/components/layout/ClienteProvider";

// Dynamic imports para evitar problemas de hidratación
const DynamicHead = dynamic(
  () => import("@/components/layout/DynamicHead"),
  { ssr: false }
);

const ConditionalHeader = dynamic(
  () => import("@/components/landing/ConditionalHeader"),
  { ssr: false }
);

const ConditionalFooter = dynamic(
  () => import("@/components/landing/ConditionalFooter"),
  { ssr: false }
);

export const metadata = {
  // title: "Veci",
  description: "Desarrollado por Ideasg",
};

export default function RootLayout({ children }) {
  // console.log("RootLayout render - CONFIGURACIÓN FINAL");
  
  return (
    <html lang="en">
      <head>
        <title>GLGIS</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClienteProvider>
          <DynamicHead />
          <Providers>
            <ConditionalHeader/>
            <main className="flex-grow">{children}</main>
            <ConditionalFooter/>
          </Providers>
        </ClienteProvider>
      </body>
    </html>
  );
}