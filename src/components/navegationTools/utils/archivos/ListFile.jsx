import React from 'react';
import environment from "@/config/enviroment";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import Icon198Download2 from '@/icons/table/IconDownload';

const ListFile = ({ data }) => {
  const archivos = data;
  const url_backend = environment.url_backend;

  const columns = [
    { name: "Pregunta", uid: "c_pregunta" },
    { name: "Archivo", uid: "c_ruta_file" },
    { name: "Acciones", uid: "actions" },
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    
    switch (columnKey) {
      case "c_pregunta":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "c_ruta_file":
        const fileName = cellValue.split('/').pop();
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{fileName}</p>
          </div>
        );

      case "actions":
        return (
          <div className="flex items-center justify-center"> {/* Añadido justify-center */}
            <Tooltip content="Abrir archivo">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => window.open(url_backend + user.c_ruta_file, '_blank')}
              >
                <Icon198Download2 />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={archivos}>
        {(item) => (
          <TableRow key={item.id_file}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ListFile;
