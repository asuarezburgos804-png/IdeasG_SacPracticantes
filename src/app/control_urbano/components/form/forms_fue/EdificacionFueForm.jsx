import React from "react";

import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomRadioGroup from "@/components/dashboard/general/CustomRadioGroup";
import CustomCheckbox from "@/components/dashboard/general/CustomCheckbox";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";

import { Controller, useForm } from "react-hook-form";
import CustomCheckboxGroup from "@/components/dashboard/general/CustomCheckboxGroup";
import { Button } from "@nextui-org/react";

export default function EdificacionFueForm ({ name, id_fichaEdif, recordedData })  {
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

      <DivResponsive>
        <FieldSet title="EDIFICACIÓN EXISTENTE" code="8.1">
        <DivResponsive>
        <FieldSet title="Licencia de Construcción / de Obra / de Edificación N°">
          <Controller
            name="licenciaConstruccion"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} type="text" min={0} />
            )}
          />
        </FieldSet>
      </DivResponsive>

      <DivResponsive>
        <FieldSet title="Certificado de Conformidad de Obra / de Edificación / de Finalización de Obra N°">
          <Controller
            name="certificadoConformidad"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} type="text" min={0} />
            )}
          />
          </FieldSet>
        </DivResponsive>

      <DivResponsive>
        <FieldSet title="Declaratoria de Fábrica / de Edificación N°">
          <Controller
            name="declaratoriaFabrica"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} type="text" min={0} />
            )}
          />
        </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <FieldSet title="Inscrita en el Registro de Predios">
          <Controller
            name="inscritaRegistro"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} type="text" min={0} />
            )}
          />
        </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <FieldSet title="Código del Predio">
          <Controller
            name="codigoPredio"
            control={control}
            render={({ field }) => (
              <InputValidate {...field} type="text" min={0} />
            )}
          />
        </FieldSet>
      </DivResponsive>
       
        <DivResponsive>
        <FieldSet
            title="Asiento"
            >
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  type="text"
                  min={0}
                />
              )}
            />
            </FieldSet>
            <FieldSet
            title="Fojas"
            >
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  type="text"
                  min={0}
                />
              )}
            />
            </FieldSet>
            <FieldSet
            title="Tomo"
            >
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  type="text"
                  min={0}
                />
              )}
            />
            </FieldSet>
            </DivResponsive>
            <DivResponsive>
            <FieldSet
                title="Ficha"
            >
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  type="text"
                  min={0}
                />
              )}
            />
            </FieldSet>
            <FieldSet
                title="Partida Electrónica"
            >
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  type="text"
                  min={0}
                />
              )}
            />
            </FieldSet>
            </DivResponsive>
            <DivResponsive>
                <div> 
                <h1 className="text-[14px] text-[gray] mt-6 mb-2">
                (**) En caso se cuente con más de un documento inscrito, detallar en el rubro 8 Observaciones
                </h1>
                </div>
            </DivResponsive>

        </FieldSet>
      </DivResponsive>
    </FieldSet>
    );
}
