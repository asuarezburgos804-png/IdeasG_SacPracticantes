"use client";

import dynamic from 'next/dynamic';

const LandingSelector = dynamic(
  () => import('@/components/landing/LandingSelector'),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center min-h-screen">
      <div>Cargando landing2...</div>
    </div>
  }
);

export default function Home() {
  return (
    <main className="snap-y snap-mandatory relative w-full h-screens">
      <div className="snap-center">
        <LandingSelector />
      </div>
    </main>
  );
}
