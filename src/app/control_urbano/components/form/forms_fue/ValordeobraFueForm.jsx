import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";


const ValordeobraFueForm = () => {

  const { handleSubmit, control, setValue, watch, reset } = useForm({});
  const onSubmit = (data) => {
    console.log("Form data:", data); // Aquí se capturan y muestran los valores del formulario
  };
  const tipoObra = [
    {
      cod_tipo_obra: "01",
      nomb_tipo_tipo_obra: "EDIFICACIÓN NUEVA",
    },
    {
      cod_tipo_obra: "02",
      nomb_tipo_tipo_obra: "AMPLIACIÓN",
    },
    {
      cod_tipo_obra: "03",
      nomb_tipo_tipo_obra: "CERCADO",
    },
    {
      cod_tipo_obra: "04",
      nomb_tipo_tipo_obra: "REMODELACIÓN",
    },
    {
      cod_tipo_obra: "05",
      nomb_tipo_tipo_obra: "ACONDICIONAMIENTO",
    },
    {
      cod_tipo_obra: "06",
      nomb_tipo_tipo_obra: "DEMOLICIÓN TOTAL",
    },
    {
      cod_tipo_obra: "07",
      nomb_tipo_tipo_obra: "REFACCIÓN",
    },
    {
      cod_tipo_obra: "08",
      nomb_tipo_tipo_obra: "DEMOLICIÓN PARCIAL",
    },
    {
      cod_tipo_obra: "09",
      nomb_tipo_tipo_obra: "PUESTA EN VALOR HISTORICO MONUMENTAL",
    },
  ];
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
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
        <FieldSet title="TIPO DE OBRA">
          <Controller
            name="c_tipo_obra"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <CustomSelect
                options={tipoObra?.map((tipo) => ({
                  key: tipo.cod_tipo_obra,
                  value: tipo.cod_tipo_obra,
                  label: tipo.nomb_tipo_tipo_obra,
                }))}
                {...field}
              />
            )}
          />
          <div className="flex gap-2 p-2">
            <Controller
              name="c_area"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Area"
                  type="name"
                  min={0}
                />
              )}
            />
             <Controller
              name="c_presupuesto_est"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Presupuesto est:"
                  type="number"
                  min={0}
                />
              )}
            />
             <Controller
              name="c_valor_unitario"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Valor unitario:"
                  type="number"
                  min={0}
                />
              )}
            />
          </div>
        </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <Button
          size="sm"
          type="submit"
          color="warning"
          startContent={<PlusIcon />}
        >
          Agregar Nuevo Piso
        </Button>
      </DivResponsive>
    </FieldSet>
   </form>
  );
};
export default ValordeobraFueForm;