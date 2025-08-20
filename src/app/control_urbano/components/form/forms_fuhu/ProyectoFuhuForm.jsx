import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomCheckbox from "@/components/dashboard/general/CustomCheckbox";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "@/icons/ficha/SearchIcon";
export default function ProyectoFuhuForm  ({ name, id_ficha, recordedData }){
    return (
        <FieldSet>
          <DivResponsive>
            <Button
              size="sm"
              type="submit"
              color="primary"
              startContent={<PlusIcon />}
            >
              Registrar
            </Button>
    
            <Button
              size="sm"
              type="submit"
              color="warning"
              startContent={<EditIcon />}
            >
              Actualizar
            </Button>
    
            <Button size="sm" 
            color="danger" 
            startContent={<DeleteIcon />}>
              Eliminar
            </Button>
          </DivResponsive>
          <FieldSet title="Proyectistas" code="6.1">
        <div className="flex flex-col gap-2">
            <DivResponsive>
          <InputValidate
            type="number"
            label="N° de CAP:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <Button size="sm" 
          color="primary" 
          startContent={<SearchIcon />}>
          </Button>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="text"
            label="Nombre y apellido:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <InputValidate
            type="number"
            label="N° de planos:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="number"
            label="N° de CAP:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <Button size="sm" 
          color="primary" 
          startContent={<SearchIcon />}>
          </Button>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="text"
            label="Nombre y apellido:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <InputValidate
            type="number"
            label="N° de planos:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="number"
            label="N° de CAP:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <Button size="sm" 
          color="primary" 
          startContent={<SearchIcon />}>
          </Button>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="text"
            label="Nombre y apellido:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <InputValidate
            type="number"
            label="N° de planos:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="number"
            label="N° de CAP:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <Button size="sm" 
          color="primary" 
          startContent={<SearchIcon />}>
          </Button>
          </DivResponsive>
          <DivResponsive>
          <InputValidate
            type="text"
            label="Nombre y apellido:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          <InputValidate
            type="number"
            label="N° de planos:"
            variant="bordered"
            size="s"
          > 
          </InputValidate>
          </DivResponsive>
          </div>
          </FieldSet>
          <FieldSet title="Cuadro de áreas" code="6.2">
            <div> 
                
            <DivResponsive>
            <FieldSet>
            <InputValidate  
            label="Área bruta del terreno"
            variant="light"
            type="text"
            size="s"
            disabled={true} 
            ></InputValidate>
            </FieldSet>

            <FieldSet title="Area(m2)" >
            <InputValidate 
            type="number"
            variant="bordered"
            size="s"
           ></InputValidate>
          
          </FieldSet>
          <FieldSet title="Porcentaje(%)" >
            <InputValidate
            type="number"
            variant="bordered"
            size="s"
           ></InputValidate>
          </FieldSet>
          </DivResponsive>
          </div>

          <div> 
                <DivResponsive>
                <InputValidate  
                label="Área util de lotes"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
    
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              </DivResponsive>
              </div>

              <div> 
                
                <DivResponsive>
                <InputValidate  
                label="Área de vias"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
    
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              </DivResponsive>
              </div>

              <div> 
                
                <DivResponsive>
                <InputValidate  
                label="Área de aporte(s) para recreación publica"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>

                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
  
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              </DivResponsive>
              </div>

              <div> 
                <DivResponsive>
                <InputValidate  
                label="Área de aporte(s) para el ministerio de educación"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
      
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              </DivResponsive>
              </div>

              <div> 
                <DivResponsive>
                <InputValidate  
                label="Área de aporte(s) para otros fines"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
             
    
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
             
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
              </DivResponsive>
              </div>
              
              <div> 
                <DivResponsive>
                <InputValidate  
                label="Área de aporte(s) parques zonales"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
            
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
              </DivResponsive>
              </div>
              <div> 
                <DivResponsive>
                <InputValidate  
                label="Área para equipamiento urbano (*)"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
             
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>

              </DivResponsive>
              <div> 
                <DivResponsive>
                <InputValidate  
                label="Otros"
                variant="light"
                type="text"
                size="s"
                disabled={true} 
                ></InputValidate>
            
                <InputValidate 
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
                <InputValidate
                type="number"
                variant="bordered"
                size="s"
               ></InputValidate>
              
              </DivResponsive>
              </div>
              </div>
          </FieldSet>
          </FieldSet>  
    
    );
    };