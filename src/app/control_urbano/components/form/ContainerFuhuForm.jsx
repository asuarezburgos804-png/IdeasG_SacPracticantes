import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SolicitudFuhuForm from "./forms_fuhu/SolicitudFuhuForm";
import RequisitosFuhuForm from "./forms_fuhu/RequisitosFuhuForm";
import ButtonMenu from "@/components/dashboard/general/buttonMenu";
import CustomModal from "@/components/dashboard/general/customModal";
import IconAreaChart from "@/icons/pestanas/EstadistitcaIcon";
import ObservacionesFuhuForm from "./forms_fuhu/ObservacionesFuhuForm";
import AdministradoFuhuForm from "./forms_fuhu/AdministradoFuhuForm";
import TerrenoFuhuForm from "./forms_fuhu/TerrenoFuhuForm";
import ProyectoFuhuForm from "./forms_fuhu/ProyectoFuhuForm";

const ContainerFuhuForm = ({ clienteConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <ButtonMenu
        icon={<IconAreaChart />}
        name="Formulario Unico de habilitaciones urbanas"
        onClick={handleOpen}
      />
      <CustomModal
        title="Formulario Unico de habilitaciones urbanas"
        isOpen={isOpen}
        onClose={handleClose}
        initialSize={{ width: 431, height: 472 }}
      >
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="1.Solicitud">
            <SolicitudFuhuForm />
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="2.Requisitos">
            <RequisitosFuhuForm />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="3.Administrado">
            <AdministradoFuhuForm />
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 4" title="4.Observaciones">
            <ObservacionesFuhuForm />
          </AccordionItem>
          <AccordionItem key="5" aria-label="Accordion 5" title="5.Terreno">
            <TerrenoFuhuForm />
          </AccordionItem>
          <AccordionItem key="6" aria-label="Accordion 5" title="6.Proyecto">
            <ProyectoFuhuForm />
          </AccordionItem>
        </Accordion>
      </CustomModal>
    </>
  );
};
export default ContainerFuhuForm;
