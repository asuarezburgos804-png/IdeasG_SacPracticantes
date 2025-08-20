import { Dropdown, DropdownTrigger, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "@/icons/companieIcon";
export const CompaniesDropdown = () => {
  const [company, setCompany] = useState({
    url: "GLGIS",
    location: "Administración",
    logo: <AcmeIcon />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {company.logo}
          <div className="flex flex-col gap-4">
            <Image
              width={150}
              src="/assets/logos/logo-sig.png"
              alt="logo glgis"
            />
            <span className="text-xs font-medium text-default-500">
              {company.location}
            </span>
          </div>
        </div>
      </DropdownTrigger>
    </Dropdown>
  );
};
