import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";

const ProyectistasFueForm = () => {
  const { handleSubmit, control, setValue, watch, reset } = useForm({});
  const onSubmit = (data) => {
    console.log("Form data:", data); // Aquí se capturan y muestran los valores del formulario
  };
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
     <FieldSet title="ARQUITECTURA" code="5.1">
     <div className="flex flex-col gap-1 p-2">
       <Controller
              name="a_ndecap"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° CAP"
                  type="number"
                  min={0}
                />
              )}
            />
      <div className="flex gap-1">
      <Controller
        name="a_nombresapellidos"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="Nombre y Apellido"
            type="name"
          />
        )}
      />
      <Controller
        name="a_ndeplanos"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="N° de Planos"
            type="number"
            min={0}
          />
        )}
      />
    </div>
       </div>
     </FieldSet>
     <FieldSet title="ESTRUCTURAS" code="5.2">
     <div className="flex flex-col gap-1 p-2">
       <Controller
              name="es_numdeplanos"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° CAP"
                  type="number"
                  min={0}
                />
              )}
            />
        <div className="flex gap-1">
      <Controller
        name="es_nombreyapellido"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="Nombre y Apellido"
            type="name"
          />
        )}
      />
      <Controller
        name="es_ndeplanos"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="N° de Planos"
            type="number"
            min={0}
          />
        )}
      />
    </div>
       </div>
     </FieldSet>
     <FieldSet title="INSTALACIONES SANITARIAS" code="5.3">
     <div className="flex flex-col gap-1 p-2">
       <Controller
              name="in_ndecap"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° CAP"
                  type="number"
                  min={0}
                />
              )}
            />
        <div className="flex gap-1">
      <Controller
        name="in_nombreyapellido"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="Nombre y Apellido"
            type="name"
          />
        )}
      />
      <Controller
        name="in_ndeplanos"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="N° de Planos"
            type="number"
            min={0}
          />
        )}
      />
    </div>
       </div>
     </FieldSet>
     <FieldSet title="INSTALACIONES ELECTRICAS" code="5.4">
     <div className="flex flex-col gap-1 p-2">
       <Controller
              name="ele_ndecap"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° CAP"
                  type="number"
                  min={0}
                />
              )}
            />
        <div className="flex gap-1">
      <Controller
        name="ele_nombreyapellido"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="Nombre y Apellido"
            type="name"
          />
        )}
      />
      <Controller
        name="ele_ndeplanos"
        control={control}
        render={({ field }) => (
          <InputValidate
            {...field}
            label="N° de Planos"
            type="number"
            min={0}
          />
        )}
      />
    </div>
       </div>
     </FieldSet>
     <FieldSet title="OTRAS">
     <div className="flex gap-1 p-2">
       <Controller
              name="otras_cargo"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Cargo"
                  type="name"
                  min={0}
                />
              )}
            />
        <Controller
              name="otras_ndecap"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° de CIP / CAP:"
                  type="number"
                  min={0}
                />
              )}
            />
       </div>
      <div className="flex gap-1 p-2">
      <Controller
              name="otras_nombreyapellido"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Nombre y Apellido"
                  type="name"
                  min={0}
                />
              )}
            />
        <Controller
              name="otras_ndeplanos"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° de Planos:"
                  type="number"
                  min={0}
                />
              )}
            />
      </div>
     </FieldSet>
   </FieldSet>
   </form>
  );
};
export default ProyectistasFueForm;