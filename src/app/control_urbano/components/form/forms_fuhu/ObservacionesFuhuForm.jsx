import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import FieldSet from "@/components/dashboard/general/fieldset";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";
import { Controller, useForm } from "react-hook-form";

const ObservacionesFuhuForm = () => {
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
      <FieldSet title="OBSERVACIONES Y CONSIDERACIONES">
      <Controller
              name="c_observaciones_consideraciones"
              control={control}
              render={({ field }) => (
                <Textarea
                  label=""
                  placeholder=""
                  minRows={4}
                  fullWidth
                  />
              )}
            />
      </FieldSet>
      </FieldSet>
      </form>
  );
};
export default ObservacionesFuhuForm;