import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomCheckbox from "@/components/dashboard/general/CustomCheckbox";
import CustomRadioGroup from "@/components/dashboard/general/CustomRadioGroup";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
export default function AdministradoFuhuForm ({ name, id_ficha, recordedData }){
  const { handleSubmit, control, setValue, watch, reset } = useForm({});
  const estcivil =[
     {
      cod_est_civil: "1", 
      tipo_est_civil:"Soltero",
      },
    {
      cod_est_civil: "2", 
      tipo_est_civil: "Casado",
    },
    {
      cod_est_civil: "3", 
      tipo_est_civil: "Viudo",
    },
    {
      cod_est_civil: "4", 
      tipo_est_civil: "Divorciado",
    },
  ];
  const depart3 =[
    {
     cod_depart3: "1", 
     tipo_depart3:"Junin",
     },
   {
     cod_depart3: "2", 
     tipo_depart3: "Amazonas",
   },
   {
     cod_depart3: "3", 
     tipo_depart3: "Ancash",
   },
   {
     cod_depart3: "4", 
     tipo_depart3: "Lima",
   },
 ];
 const provin3 =[
  {
   cod_provin3: "1", 
   tipo_provin3:"Satipo",
   },
 {
   cod_provin3: "2", 
   tipo_provin3: "Bongara",
 },
 {
   cod_provin3: "3", 
   tipo_provin3: "Recuay",
 },
 {
   cod_provin3: "4", 
   tipo_provin3: "Lima",
 },
];
const distr3 =[
  {
   cod_distr3: "1", 
   tipo_distr3:"Mazamari",
   },
 {
   cod_distr3: "2", 
   tipo_distr3: "Florida",
 },
 {
   cod_distr3: "3", 
   tipo_distr3: "Marca",
 },
 {
   cod_distr3: "4", 
   tipo_distr3: "Miraflores",
 },
];
const tipoV =[
  {
   cod_est_via: "1", 
   tipo_est_via:"Avenida",
   },
 {
   cod_est_via: "2", 
   tipo_est_via: "Calle",
 },
 {
   cod_est_via: "3", 
   tipo_est_via: "Jiron",
 },
 {
   cod_est_via: "4", 
   tipo_est_via: "Pasaje",
 },
 {
  cod_est_via: "5", 
  tipo_est_via: "Carretera",
},
{
  cod_est_via: "6", 
  tipo_est_via: "PRLG",
},
];

  
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

        <Button size="sm" color="danger" startContent={<DeleteIcon />}>
          Eliminar
        </Button>
      </DivResponsive>
      <DivResponsive>
      <div className="flex flex-col gap-4">
        
             <Controller
              name="c_prop"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  code="3.1"
                  label="PROPIETARIO"
                  isSelected={false}
                />
              )}
            />
           
        </div>
        </DivResponsive>
        <div className="p-2">
            <Controller
              name="c_option"
              control={control}
              render={({ field }) => (
                <CustomRadioGroup
                  {...field}
                  options={[
                    { label: "PERSONA NATURAL", value: "persona_natural" },
                    {
                      label: "PERSONA JURIDICA",value: "persona_juridica",
                    }
                  ]}
                  onChange={(value) => setValue("c_option", value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
        <FieldSet title="Datos de Persona Natural"  code="3.1 "></FieldSet>
        <DivResponsive>
          <InputValidate
            type="number"
            label="DNI:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Apellido pat.:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Apellido mat.:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Nombres:"
            variant="bordered"
            size="sm"
          ></InputValidate>
          </DivResponsive>

          <div className="flex flex-col gap-4">
            <DivResponsive>
          <InputValidate
            type="text"
            label="Telefono:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Correo elect.:"
            variant="bordered"
            size="sm"
          ></InputValidate>
          
          <Controller
            name="c_est_civil"
           
            control={control}
            render={({ field }) => 
          <CustomSelect 
            label="Estado Civil"
            options={estcivil?.map((tipo) => ({
            key: tipo.cod_est_civil,
            value: tipo.cod_est_civil,
            label: tipo.tipo_est_civil,
          }))}
          {...field} />}
          />
          </DivResponsive>
          </div>
      

        <div>
          <FieldSet title="Domicilio de persona Natural"></FieldSet>
          <div className="flex flex-col gap-4">
            <DivResponsive>
            <InputValidate
              type="number"
              label="Departamento:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Provincia:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Distrito:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
          </div>

          <div className="flex flex-col gap-4">
          <DivResponsive>
            <InputValidate
              type="text"
              label="Urbanizacion:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Manzana:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="number"
              label="Lote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
            </div>
            <div className="flex flex-col gap-4">
            <DivResponsive>
            <InputValidate
              type="text"
              label="Sublote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            
             <Controller
            name="c_tipoV"
            control={control}
            render={({ field }) => 
          <CustomSelect 
            label="Tipo de Via"
            options={tipoV?.map((tipo) => ({
            key: tipo.cod_est_via,
            value: tipo.cod_est_via,
            label: tipo.tipo_est_via,
          }))}
          {...field} />}
          />
            <InputValidate
              type="text"
              label="Via:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
            </div>
            <div className="flex flex-col gap-4">
            <DivResponsive>
            <InputValidate
              type="number"
              label="N°:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Interior:"
              variant="bordered"
              size="sm"
            ></InputValidate>
             </DivResponsive>
             </div>
            
          </div>
         
        
        <div className="flex flex-col gap-4">
        <FieldSet title="Datos de Persona Juridica"  code="3.2 "></FieldSet>
        <DivResponsive>
          <InputValidate
            type="number"
            label="N° RUC:"
            variant="bordered"
            size="sm"
          ></InputValidate>
          <InputValidate
            type="text"
            label="Razon Social"
            variant="bordered"
            size="sm"
          ></InputValidate>
          </DivResponsive>
        <div>
          <FieldSet title="Domicilio de persona Juridica" ></FieldSet>
          <div className="flex flex-col gap-4" >
            <DivResponsive>
            <InputValidate
              type="number"
              label="Departamento:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Provincia:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Distrito:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
          </div>

          <div className="flex flex-col gap-4">
          <DivResponsive>
            <InputValidate
              type="text"
              label="Urbanizacion:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Manzana:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="number"
              label="Lote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
            <DivResponsive>
            <InputValidate
              type="text"
              label="Sublote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Tipo de via:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Via:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
            <DivResponsive>
            <InputValidate
              type="number"
              label="N°:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Interior:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
          </div>
          </div>
          <div className="flex flex-col gap-4">
        <FieldSet title="Apoderado o representante legal"  code="3.3"></FieldSet>
        <div>
        <DivResponsive>
        <Controller
              name="c_option"
              control={control}
              render={({ field }) => (
                <CustomRadioGroup
                  {...field}
                  options={[
                    { label: "PERSONA NATURAL", value: "persona_natural" },
                    {
                      label: "PERSONA JURIDICA",value: "persona_juridica",
                    }
                  ]}
                  onChange={(value) => setValue("c_option", value)}
                />
              )}
            />
            </DivResponsive>
          </div>
          <div>
          <DivResponsive>
        
          <InputValidate
            type="text"
            label="Apellido pat.:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Apellido mat.:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Nombres:"
            variant="bordered"
            size="sm"
          ></InputValidate>
          </DivResponsive>
          </div>
          <div className="flex flex-col gap-4">
            <DivResponsive>
            <InputValidate
            type="number"
            label="DNI:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Telefono:"
            variant="bordered"
            size="sm"
          ></InputValidate>

          <InputValidate
            type="text"
            label="Correo elect.:"
            variant="bordered"
            size="sm"
          ></InputValidate>
          </DivResponsive>

          <DivResponsive>
          <Controller
            name="c_est_depart3"
           
            control={control}
            render={({ field }) => 
          <CustomSelect 
            label="Departamento"
            options={depart3?.map((tipo) => ({
            key: tipo.cod_depart3,
            value: tipo.cod_depart3,
            label: tipo.tipo_depart3,
          }))}
          {...field} />}
          />
          <Controller
            name="c_est_provin3"
            control={control}
            render={({ field }) => 
          <CustomSelect 
            label="Provincia"
            options={provin3?.map((tipo) => ({
            key: tipo.cod_provin3,
            value: tipo.cod_provin3,
            label: tipo.tipo_provin3,
          }))}
          {...field} />}
          />
          <Controller
            name="c_est_distr3"
            control={control}
            render={({ field }) => 
          <CustomSelect 
            label="Distrito"
            options={distr3?.map((tipo) => ({
            key: tipo.cod_distr3,
            value: tipo.cod_distr3,
            label: tipo.tipo_distr3,
          }))}
          {...field} />}
          />
          </DivResponsive>
          <div className="flex flex-col gap-4">
          <DivResponsive>
            <InputValidate
              type="text"
              label="Urbanizacion:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Manzana:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="number"
              label="Lote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
            <DivResponsive>
            <InputValidate
              type="text"
              label="Sublote:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Tipo de via:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Via:"
              variant="bordered"
              size="sm"
            ></InputValidate>
           
            <InputValidate
              type="number"
              label="N°:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            <InputValidate
              type="text"
              label="Interior:"
              variant="bordered"
              size="sm"
            ></InputValidate>
            </DivResponsive>
          </div>
          </div>
          </div>
        </div>

      </div>
    </FieldSet>
  );
};

