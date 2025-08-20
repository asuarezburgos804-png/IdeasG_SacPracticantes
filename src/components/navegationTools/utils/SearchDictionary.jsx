import { SearchIcon } from "@/icons/table/SearchIcon";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { useState } from "react";

const SearchDictionary = ({ data, onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const filteredData =
    searchTerm.length >= 3
      ? data.filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="mx-auto max-w-lg">
      <Input
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="p-0 gap-0 divide-y divide-[#cccccc] divide-default-300/50  bg-content1 max-h-[300px] overflow-auto shadow-small rounded-medium">
        {filteredData.map((item) => (
          <li
            key={item}
            className="py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleItemClick(item)}
          >
            <p className="ml-3">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDictionary;
