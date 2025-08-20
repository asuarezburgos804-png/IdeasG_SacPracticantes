import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Pagination,
} from "@nextui-org/react";

export default function CustomTableExcel({
  data,
  columns,
  selectedRows,
  toggleRowSelection,
  toggleSelectAll,
  renderCell,
  page,
  setPage,
  rowsPerPage,
  classNames,
}) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  return (
    <>
      <Table
        removeWrapper
        aria-label="Tabla personalizada"
        classNames={{
          th: "bg-[#FEF9C3] text-default-800 text-xs uppercase border-b border-r border-default-200 px-2 py-2",
          td: "border-b border-r border-default-200 px-2 py-1 relative",
          table: "relative",
          ...classNames,
        }}
      >
        <TableHeader>
          <TableColumn width={50}>
            <Checkbox
              isSelected={selectedRows.size === data.length && data.length > 0}
              isIndeterminate={selectedRows.size > 0 && selectedRows.size < data.length}
              onValueChange={toggleSelectAll}
              size="sm"
            />
          </TableColumn>
          {columns.map((column) => (
            <TableColumn key={column.key} width={column.width}>
              <div className="flex items-center">
                {column.label}
                {column.filterButton}
              </div>
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow
              key={item.id_egreso}
              className={`hover:bg-default-50 ${selectedRows.has(item.id_egreso) ? "bg-primary-50" : ""}`}
            >
              <TableCell>
                <Checkbox
                  isSelected={selectedRows.has(item.id_egreso)}
                  onValueChange={() => toggleRowSelection(item.id_egreso)}
                  size="sm"
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-default-500">
          Mostrando {data.length} de {data.length} registros
        </span>
        <Pagination
          total={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={setPage}
          size="sm"
        />
      </div>
    </>
  );
}