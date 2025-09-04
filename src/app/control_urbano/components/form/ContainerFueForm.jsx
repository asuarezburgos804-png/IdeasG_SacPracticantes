import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SolicitudFueForm from "./forms_fue/SolicitudFueForm";
import AdministradoFueForm from "./forms_fue/AdministradoFueForm";
import TerrenoFueForm from "./forms_fue/TerrenoFueForm";
import ProyectoFueForm from "./forms_fue/ProyectoFueForm";

import ButtonMenu from "@/components/dashboard/general/buttonMenu";
import CustomModal from "@/components/dashboard/general/customModal";
import IconAreaChart from "@/icons/pestanas/EstadistitcaIcon";
import ProyectistasFueForm from "./forms_fue/ProyectistasFueForm";
import ObservacionesFueForm from "./forms_fue/ObservacionesFueForm";
import ValordeobraFueForm from "./forms_fue/ValordeobraFueForm";
import EdificacionFueForm from "./forms_fue/EdificacionFueForm";
import DocAdjuntoFueForm from "./forms_fue/DocAdjuntoFueForm";

const ContainerFueForm = ({ clienteConfig }) => {
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
        name="Formulario Unico de edificaciones"
        onClick={handleOpen}
      />
      <CustomModal
        title="Formulario Unico de edificaciones"
        isOpen={isOpen}
        onClose={handleClose}
        initialSize={{ width: 431, height: 472 }}
      >
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="1. Solicitud">
            <SolicitudFueForm />
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="2. Administrado">
            <AdministradoFueForm />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 2" title="3. Terreno">
            <TerrenoFueForm />
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 2" title="4. Proyecto">
            <ProyectoFueForm />
          </AccordionItem>
          <AccordionItem key="5" aria-label="Accordion 2" title="5. Proyectistas">
            <ProyectistasFueForm />
          </AccordionItem>
          <AccordionItem key="6" aria-label="Accordion 2" title="6. Observaciones">
            <ObservacionesFueForm />
          </AccordionItem>
          <AccordionItem key="7" aria-label="Accordion 2" title="7. Valor de obra">
            <ValordeobraFueForm />
          </AccordionItem>
          <AccordionItem key="8" aria-label="Accordion 8" title="8. Edificacion">
            <EdificacionFueForm/>
          </AccordionItem>
          <AccordionItem key="9" aria-label="Accordion 9" title="9. Documentos que se adjuntan">
            <DocAdjuntoFueForm/>
          </AccordionItem>
        </Accordion>
      </CustomModal>
    </>
  );
};
export default ContainerFueForm;
