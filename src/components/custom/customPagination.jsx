import React, { useMemo, useEffect, memo } from "react";
import { Pagination, Button, Select, SelectItem } from "@nextui-org/react";

const ChevronIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Función para calcular opciones óptimas de filas por página
const calculateRowsPerPageOptions = (totalRecords) => {
  const options = [];
  const baseOptions = [10, 15, 20, 25, 50, 100];
  const maxRecords = totalRecords;

  if (maxRecords <= 100) {
    return baseOptions
      .filter((opt) => opt <= maxRecords)
      .map(String)
      .concat("Todo");
  }

  let step = Math.ceil(maxRecords / 20);
  step = Math.max(10, Math.round(step / 10) * 10);

  for (let i = step; i <= maxRecords; i *= 2) {
    if (i >= maxRecords) break;
    options.push(i);
  }

  return [...new Set(options.filter((opt) => opt <= maxRecords && opt > 0))]
    .sort((a, b) => a - b)
    .map(String)
    .concat("Todo");
};

function CustomPagination({
  totalRecords,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  isPaginated = true,
  showRowsPerPage = true,
  className = "",
  paginationColors = { cursor: "bg-verdeVeci", item: "bg-verdeVeci/10" },
}) {
  // Calcular opciones de paginación
  const rowsPerPageOptions = useMemo(
    () => calculateRowsPerPageOptions(totalRecords),
    [totalRecords]
  );

  // Calcular total de páginas
  const pages = useMemo(() => {
    const calculatedPages = !isPaginated
      ? 1
      : Math.max(1, Math.ceil(totalRecords / rowsPerPage));
    return calculatedPages;
  }, [totalRecords, rowsPerPage, isPaginated]);

  // Manejar cambio de filas por página
  const handleRowsPerPageChange = (value) => {
    const newRowsPerPage = value === "Todo" ? totalRecords : Number(value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Manejar navegación a la página anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Manejar navegación a la página siguiente
  const handleNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reiniciar página cuando cambian filas por página o datos
  useEffect(() => {
    if (currentPage > pages) {
      setCurrentPage(1);
    }
  }, [currentPage, pages]);

  if (!isPaginated || totalRecords === 0) {
    return null;
  }

  return (
    <div className={`flex items-center ${className}`}>
      {showRowsPerPage && (
        <div className="flex items-center gap-2">
          <label className="text-default-400 text-sm">
            Filas por página:
          </label>
          <Select
            className="bg-transparent outline-none text-default-500 text-xs w-[100px]"
            value={
              rowsPerPage === totalRecords ? "Todo" : rowsPerPage.toString()
            }
            onChange={(e) => handleRowsPerPageChange(e.target.value)}
            aria-label="Filas por página"
            size="xs"
          >
            {rowsPerPageOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
      <div className="flex items-center gap-1 ml-auto">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="default"
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          aria-label="Página anterior"
          className="w-9 h-9 rounded-xl bg-default-100 p-0 min-w-0"
        >
          <ChevronIcon />
        </Button>
        <Pagination
          loop
          classNames={{
            cursor: paginationColors.cursor,
            item: paginationColors.item,
          }}
          page={currentPage}
          total={pages}
          onChange={(page) => setCurrentPage(page)}
        />
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="default"
          onClick={handleNextPage}
          isDisabled={currentPage === pages}
          aria-label="Página siguiente"
          className="w-9 h-9 rounded-xl bg-default-100 p-0 min-w-0"
        >
          <ChevronIcon className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}

// Memoizar CustomPagination para evitar renders innecesarios
export default memo(CustomPagination);