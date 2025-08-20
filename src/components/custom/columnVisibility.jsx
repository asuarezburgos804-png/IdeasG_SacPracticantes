import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ColumnaIcon } from "@/components/custom/columnaIcon";

export const ColumnVisibility = ({
  color = "default",
  columns,
  visibleColumns,
  onVisibilityChange
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color={color}
          variant="flat"
          radius="md"
          startContent={<ColumnaIcon className="text-3xl" />}
        >
          Columnas
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Columnas visibles"
        selectionMode="multiple"
        selectedKeys={visibleColumns}
        onSelectionChange={(keys) => {
          const newVisibleColumns = new Set(keys);
          // Siempre dejar actions visible
          if (!newVisibleColumns.has("actions")) newVisibleColumns.add("actions");
          onVisibilityChange(newVisibleColumns);
        }}
      >
        {columns.map((column) => (
          <DropdownItem key={column.key}>
            {column.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}