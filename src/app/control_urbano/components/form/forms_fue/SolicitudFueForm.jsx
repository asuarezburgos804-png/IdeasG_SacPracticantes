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

export default function SolicitudFueForm({ name, id_ficha, recordedData }) {
  const { handleSubmit, control, setValue, watch, reset } = useForm({});
  const tipoTramite = [
    {
      cod_tipo_tramite: "01",
      nomb_tipo_tipo_tramite: "ANTEPROYECTO EN CONSULTA",
    },
    {
      cod_tipo_tramite: "02",
      nomb_tipo_tipo_tramite: "LICENCIA DE EDIFICACION",
    },
  ];
  const tipoObra = [
    {
      cod_tipo_obra: "01",
      nomb_tipo_obra: "EDIFICACION NUEVA ",
    },
    {
      cod_tipo_tramite: "02",
      nomb_tipo_obra: "AMPLIACION",
    },
  ];
  const modalidad = [
    {
      cod_tipo_modalidad: "01",
      nomb_tipo_modalidad:
        "A. APROBACIÓN AUTOMÁTICA CON FIRMA DE PROFESIONALES ",
    },
    {
      cod_tipo_modalidad: "02",
      nomb_tipo_modalidad: "B. APROBACIÓN DE PROYECTO CON EVALUACIÓN POR:",
    },
    {
      cod_tipo_modalidad: "03",
      nomb_tipo_modalidad:
        "C. APROBACIÓN DE PROYECTO CON EVALUACIÓN PREVIA POR:",
    },
    {
      cod_tipo_modalidad: "04",
      nomb_tipo_modalidad:
        "D. APROBACIÓN DE PROYECTO CON EVALUACIÓN PREVIA POR:",
    },
  ];
  const onSubmit = (data) => {
    console.log("Form data:", data); // Aquí se capturan y muestran los valores del formulario
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <div className="flex gap-2 justify-start mb-2">
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
            type="button"
            color="warning"
            startContent={<EditIcon />}
          >
            Actualizar
          </Button>

          <Button
            type="button"
            size="sm"
            color="danger"
            startContent={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </div>
        <DivResponsive>
          <FieldSet title="TIPO DE TRÁMITE" code="1.1">
            <Controller
              name="c_tipo_tramite"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <CustomSelect
                  options={tipoTramite?.map((tipo) => ({
                    key: tipo.cod_tipo_tramite,
                    value: tipo.cod_tipo_tramite,
                    label: tipo.nomb_tipo_tipo_tramite,
                  }))}
                  {...field}
                />
              )}
            />
          </FieldSet>
        </DivResponsive>
        <DivResponsive>
          <FieldSet title="TIPO DE OBRA" code="1.2">
            <Controller
              name="c_tipo_obra"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={tipoObra?.map((tipo) => ({
                    key: tipo.cod_tipo_obra,
                    value: tipo.cod_tipo_obra,
                    label: tipo.nomb_tipo_obra,
                  }))}
                  {...field}
                />
              )}
            />
            <div className="flex gap-2 p-2">
              <Controller
                name="c_etapas"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    {...field}
                    label="¿Por etapa?"
                    checked={field.value} // Vincula el estado del checkbox al valor del formulario
                    onChange={(e) => field.onChange(e)} // Maneja el cambio de valor
                  />
                )}
              />
              <Controller
                name="n_etapas"
                control={control}
                render={({ field }) => (
                  <InputValidate
                    {...field}
                    label="N° de etapas:"
                    type="number"
                    min={0}
                    isDisabled={!watch("c_etapas")} // Deshabilita el input si el checkbox no está marcado
                  />
                )}
              />
              <Controller
                name="n_etapa_autorizar"
                control={control}
                render={({ field }) => (
                  <InputValidate
                    {...field}
                    label="Etapa por autorizar:"
                    type="number"
                    min={0}
                    isDisabled={!watch("c_etapas")}
                  />
                )}
              />
            </div>
          </FieldSet>
        </DivResponsive>
        <DivResponsive>
          <FieldSet title="MODALIDAD DE APROBACIÓN" code="1.3">
            <Controller
              name="c_modalidad_aprob"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={modalidad?.map((tipo) => ({
                    key: tipo.cod_tipo_modalidad,
                    value: tipo.cod_tipo_modalidad,
                    label: tipo.nomb_tipo_modalidad,
                  }))}
                  {...field}
                />
              )}
            />
            <div className="px-6 py-2">
              <Controller
                name="c_option"
                control={control}
                render={({ field }) => (
                  <CustomRadioGroup
                    {...field}
                    options={[
                      { label: "COMISIÓN TÉCNICA", value: "comision_tecnica" },
                      {
                        label: "REVISORES URBANOS",
                        value: "revisores_urbanos",
                      },
                      { label: "MUNICIPALIDAD", value: "municipalidad" },
                    ]}
                  />
                )}
              />
            </div>
          </FieldSet>
        </DivResponsive>
        <DivResponsive>
          <FieldSet title="ANEXOS QUE SE ADJUNTA" code="1.4">
            <div className="px-6 py-2">
              <Controller
                name="c_anexos_adjunta"
                control={control}
                render={({ field }) => (
                  <CustomCheckboxGroup
                    {...field}
                    options={[
                      {
                        label: "A - DATOS DE CONDÓMINOS - PERSONAS NATURALES",
                        value: "1",
                      },
                      {
                        label: "RB - DATOS DE CONDÓMINOS - PERSONAS JURÍDICAS",
                        value: "2",
                      },
                    ]}
                  />
                )}
              />
            </div>
          </FieldSet>
        </DivResponsive>
      </FieldSet>
    </form>
  );
}