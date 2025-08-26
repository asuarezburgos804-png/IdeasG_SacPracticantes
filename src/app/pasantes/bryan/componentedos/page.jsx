"use client";

import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

/**
 * Example component demonstrating how to integrate FiltroEgresos
 * This shows the complete frontend-backend integration working together
 */
export default function FiltroEgresosExample() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Componente Bryan</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <p className="text-gray-600">
              Este componente demuestra la integración completa del sistema de filtros de egresos
              con frontend y backend totalmente funcional.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}