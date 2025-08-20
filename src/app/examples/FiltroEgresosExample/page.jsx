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
          <h2 className="text-xl font-bold">Filtro de Egresos - Demo Integration</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <p className="text-gray-600">
              Este componente demuestra la integración completa del sistema de filtros de egresos
              con frontend y backend totalmente funcional.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Características implementadas:</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Servicios backend completos (CRUD + catálogos + operaciones)</li>
                <li>Hooks de React Query para manejo de estado</li>
                <li>Componente frontend con formulario de filtros</li>
                <li>Visualización de resultados con estadísticas</li>
                <li>Exportación a Excel</li>
                <li>Cascada geográfica (Departamento → Provincia → Distrito)</li>
                <li>Manejo de errores y estados de carga</li>
                <li>Diseño responsivo</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Endpoints backend conectados:</h3>
              <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                <li><code>/reportes/filtro-egresos/listar</code> - Listado de filtros</li>
                <li><code>/reportes/filtro-egresos/aplicar</code> - Aplicar filtros</li>
                <li><code>/reportes/catalogos/tipos-egreso</code> - Tipos de egreso</li>
                <li><code>/reportes/catalogos/categorias-egreso</code> - Categorías</li>
                <li><code>/reportes/catalogos/departamentos</code> - Departamentos</li>
                <li><code>/reportes/filtro-egresos/exportar/excel</code> - Exportar</li>
                <li><code>/reportes/filtro-egresos/estadisticas</code> - Estadísticas</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Cómo probar:</h3>
              <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                <li>Haz clic en el botón de Filtro de Egresos (💰)</li>
                <li>Selecciona los criterios de filtrado deseados</li>
                <li>Haz clic en &quot;Aplicar Filtro&quot; para ver los resultados</li>
                <li>Revisa las estadísticas en el panel superior</li>
                <li>Usa &quot;Exportar Excel&quot; para descargar los datos</li>
                <li>Navega de vuelta al formulario con &quot;Volver al Filtro&quot;</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Integración en tu aplicación:</h3>
              <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
              {`import FiltroEgresos from '@/components/navegationTools/FiltroEgresos';

              function MyComponent({ map }) {
                return (
                  <div>
                    <FiltroEgresos map={map} />
                  </div>
                );
              }`}
              </pre>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}