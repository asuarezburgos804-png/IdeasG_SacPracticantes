import React from "react";
import {
    Button,
    Input,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function CustomSelect({
    label,
    placeholder = "Seleccionar",
    options,
    onSelect,
    selectedItem,
    searchKeys = ["label"],
    startIcon = "lucide:search",
    buttonColor = "primary",
}) {
    const [query, setQuery] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [filteredOptions, setFilteredOptions] = React.useState(options);
    const [selectedLabel, setSelectedLabel] = React.useState(
        selectedItem ? selectedItem.label : placeholder
    );

    // Update filtered options when query changes
    React.useEffect(() => {
        if (query.trim() === "") {
            setFilteredOptions(options);
            return;
        }

        const lowercaseQuery = query.toLowerCase();
        const filtered = options.filter((option) => {
            return searchKeys.some((key) => {
                const value = String(option[key] || "").toLowerCase();
                return value.includes(lowercaseQuery);
            });
        });

        setFilteredOptions(filtered);
    }, [query, options, searchKeys]);

    // Update selected label when selectedItem changes
    React.useEffect(() => {
        if (selectedItem) {
            setSelectedLabel(selectedItem.label);
        } else {
            setSelectedLabel(placeholder);
        }
    }, [selectedItem, placeholder]);

    const handleInputChange = (value) => {
        setQuery(value);
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (open) {
            setQuery("");
            setFilteredOptions(options);
        }
    };

    const handleSelect = (item) => {
        onSelect(item);
        setSelectedLabel(item.label);
        setIsOpen(false);
    };

    return (
        <Popover
            placement="bottom-start"
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
            showArrow
        >
            <PopoverTrigger>
                <Input
                    label={label}
                    placeholder={placeholder}
                    value={selectedLabel}
                    variant="bordered"
                    readOnly
                    classNames={{
                        label: "text-default-600 text-xs",
                        input: "text-default-800 text-sm",
                        inputWrapper: "cursor-pointer",
                    }}
                    title={selectedLabel}
                    radius="lg"
                    // startContent={
                    //     selectedItem && (
                    //         <div className={`bg-${buttonColor}-100 rounded-full p-1 mr-1`}>
                    //             {/* <Icon
                    //                 icon={startIcon}
                    //                 className={`text-${buttonColor}-500 text-sm`}
                    //             /> */}
                    //         </div>
                    //     )
                    // }
                    endContent={
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-default-400"
                        >
                            <Icon icon="lucide:chevron-down" className="text-sm" />
                        </Button>
                    }
                />
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                <div className="px-1 py-2">
                    <Input
                        isClearable
                        placeholder="Buscar..."
                        size="sm"
                        variant="bordered"
                        value={query}
                        onValueChange={handleInputChange}
                        startContent={
                            <Icon
                                icon="lucide:search"
                                className="text-default-400 text-sm"
                            />
                        }
                        className="mb-3"
                        autoFocus
                        radius="lg"
                    />
                    <div className="border border-default-200 rounded-lg">
                        <Listbox
                            aria-label="Opciones de búsqueda"
                            className="max-h-[200px] overflow-y-auto"
                            emptyContent="No se encontraron resultados"
                            items={filteredOptions}
                            onAction={(key) => {
                                const selected = filteredOptions.find(
                                    (item) => item.id === key
                                );
                                if (selected) {
                                    handleSelect(selected);
                                }
                            }}
                            itemClasses={{
                                base: "data-[hover=true]:bg-default-100",
                                title: "text-sm",
                            }}
                        >
                            {(item) => (
                                <ListboxItem key={item.id} textValue={item.label}>
                                    <div className="flex items-start gap-2">
                                        {/* <div
                                            className={`bg-${buttonColor}-100 rounded-full p-1 flex-shrink-0`}
                                        >
                                            <Icon
                                                icon={startIcon}
                                                className={`text-${buttonColor}-500 text-xs`}
                                            />
                                        </div> */}
                                        <span>{item.label}</span>
                                    </div>
                                </ListboxItem>
                            )}
                        </Listbox>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};