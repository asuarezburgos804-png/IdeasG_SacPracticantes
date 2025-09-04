import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";

const ProyectoFueForm = () => {
  const { handleSubmit, control, setValue, watch, reset } = useForm({});

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
     <FieldSet title="PISOS" code="4.1">
      <div className="flex gap-2 p-2">
        <Controller
          name="c_pisos_"
          control={control}
          render={({ field }) => (
            <InputValidate {...field} label="Pisos" type="name" min={0} />
          )}
        />
        <Controller
          name="c_nuevo_"
          control={control}
          render={({ field }) => (
            <InputValidate {...field} label="Nuevo:" type="name" min={0} />
          )}
        />
      </div>
      <div className="flex gap-2 p-2">
        <Controller
          name="c_existente_"
          control={control}
          render={({ field }) => (
            <InputValidate {...field} label="Existente" type="name" min={0} />
          )}
        />
        <Controller
          name="c_demolicion"
          control={control}
          render={({ field }) => (
            <InputValidate {...field} label="Demolición:" type="name" min={0} />
          )}
        />
      </div>
      <div className="flex gap-2 p-2">
        <Controller
          name="c_amplificacion"
          control={control}
          render={({ field }) => (
            <InputValidate
              {...field}
              label="Amplificación"
              type="name"
              min={0}
            />
          )}
        />
        <Controller
          name="c_remodelacion"
          control={control}
          render={({ field }) => (
            <InputValidate
              {...field}
              label="Remodelación"
              type="name"
              min={0}
            />
          )}
        />
      </div>
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
      <FieldSet title="AREA LIBRE" code="4.2">
        <div className="flex gap-2 p-2">
          <Controller
            name="a_area_libre"
            control={control}
            render={({ field }) => (
              <InputValidate
                {...field}
                label="Porcentaje"
                type="number"
                min={0}
              />
            )}
          />
          <Controller
            name="a_m2_"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} label="M2" type="name" min={0} />
            )}
          />
        </div>
      </FieldSet>
    </FieldSet>
   </FieldSet>
  );
};
export default ProyectoFueForm;
