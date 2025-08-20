import { Button, Input, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function CustomPopover({
  data = [],
  onSelect,
  selectedItem = null,
  getLabel = (item) => item.label || "",
  placeholder = "Seleccione una opción",
  searchPlaceholder = "Escriba para buscar",
  startContent = null,
  disabled = false,
  isLoading = false,
  noResultsText = "No se encontraron resultados",
  popoverProps = {},
  inputProps = {},
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState(selectedItem);
  const [selectedLabel, setSelectedLabel] = useState(selectedItem ? getLabel(selectedItem) : placeholder);

  useEffect(() => {
    setSelected(selectedItem);
    setSelectedLabel(selectedItem ? getLabel(selectedItem) : placeholder);
  }, [selectedItem, placeholder, getLabel]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        getLabel(item).toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, query, getLabel]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) setQuery("");
  };

  return (
    <Popover
      size="lg"
      placement="bottom-start"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      {...popoverProps}
    >
      <PopoverTrigger>
        <Input
          className="w-full bg-gray-50 rounded-lg py-1"
          classNames={{
            label: "text-xs",
            input: "font-light text-left text-xs overflow-hidden text-ellipsis whitespace-nowrap",
          }}
          placeholder={placeholder}
          labelPlacement="outside"
          size="lg"
          value={selectedLabel}
          isReadOnly
          title={selectedLabel}
          startContent={startContent}
          disabled={disabled}
          {...inputProps}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div>
            <Input
              className="w-full mb-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
              isClearable
              type="text"
              placeholder={searchPlaceholder}
              labelPlacement="outside"
              value={query}
              onClear={() => {
                setQuery("");
                setFilteredData([]);
              }}
              onChange={handleInputChange}
              startContent={startContent}
              autoFocus
            />
            <div className="max-h-[300px] overflow-y-auto">
              <Listbox aria-label="Opciones">
                {isLoading ? (
                  <ListboxItem disabled>Cargando...</ListboxItem>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <ListboxItem
                      textValue={getLabel(item)}
                      onClick={() => {
                        setSelected(item);
                        setSelectedLabel(getLabel(item));
                        onSelect(item);
                        setIsOpen(false);
                      }}
                      key={item.id || getLabel(item)}
                    >
                      {getLabel(item)}
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem disabled>{noResultsText}</ListboxItem>
                )}
              </Listbox>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
