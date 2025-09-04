"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic imports con configuración específica para NextUI
const SessionProvider = dynamic(
  () => import("next-auth/react").then((mod) => ({ default: mod.SessionProvider })),
  { 
    ssr: false,
    loading: () => null
  }
);

const NextUIProvider = dynamic(
  () => import("@nextui-org/react").then((mod) => ({ default: mod.NextUIProvider })),
  { 
    ssr: false,
    loading: () => null
  }
);

const QueryClientProvider = dynamic(
  () => import("@tanstack/react-query").then((mod) => ({ default: mod.QueryClientProvider })),
  { 
    ssr: false,
    loading: () => null
  }
);

// QueryClient dinámico
const DynamicQueryClient = dynamic(
  () => import("@tanstack/react-query").then((mod) => {
    const QueryClient = mod.QueryClient;
    
    // Componente con nombre que empiece con mayúscula
    const QueryClientWrapper = ({ children }) => {
      const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }));
      
      const Provider = mod.QueryClientProvider;
      return <Provider client={queryClient}>{children}</Provider>;
    };
    
    return {
      default: QueryClientWrapper
    };
  }),
  { 
    ssr: false,
    loading: () => null
  }
);

export function Providers({ children, session }) {
  // console.log("Providers render - CONFIGURACIÓN NEXTUI OPTIMIZADA");
  
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <DynamicQueryClient>
          {children}
        </DynamicQueryClient>
      </NextUIProvider>
    </SessionProvider>
  );
}
