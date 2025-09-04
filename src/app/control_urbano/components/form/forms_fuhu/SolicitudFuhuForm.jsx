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

export default function SolicitudFuhuForm({ name, id_ficha, recordedData }) {
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
      nomb_tipo_tipo_obra: "USO DE VIVIENDA O URBANIZACIÓN",
    },
    {
      cod_tipo_obra: "02",
      nomb_tipo_tipo_obra: "USO COMERCIAL",
    },
  ];
  const tipoObra2 = [
    {
      cod_tipo_obra: "01",
      nomb_tipo_tipo_obra2: "TIPO CONVECIONAL",
    },
    {
      cod_tipo_obra: "02",
      nomb_tipo_tipo_obra2: "CON CONSTRUCCION SIMULTANEA",
    },
  ];
  const tipoObra3 = [
    {
      cod_tipo_obra: "01",
      nomb_tipo_tipo_obra3: "CON VENTA GARANTIZADA DE LOTES",
    },
    {
      cod_tipo_obra: "02",
      nomb_tipo_tipo_obra3: "CON VENTAS VIVIENDAS EDIFICADAS(***)",
    },
  ];
  const modalidadAprob = [
    {
      cod_mod_aprob: "01",
      nomb_mod_aprob: "A. APROBACION AUTOMÁTICA CON FIRMA DE PROFESIONALES",
    },
    {
      cod_mod_aprob: "02",
      nomb_mod_aprob: "B. APROBACIÓN DE PROYECTOS CON EVALUACIÓN POR:",
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
            render={({ field }) => 
            <CustomSelect  options={tipoObra?.map((tipo) => ({
              key: tipo.cod_tipo_obra,
              value: tipo.cod_tipo_obra,
              label: tipo.nomb_tipo_tipo_obra,
            }))}
            {...field} />}
          />
          <Controller
            name="c_tipo_obra2"
            control={control}
            render={({ field }) => 
            <CustomSelect  options={tipoObra2?.map((tipo) => ({
              key: tipo.cod_tipo_obra2,
              value: tipo.cod_tipo_obra2,
              label: tipo.nomb_tipo_tipo_obra2,
            }))}
            {...field} />}
          />
          <Controller
            name="c_tipo_obra3"
            control={control}
            render={({ field }) => 
            <CustomSelect  options={tipoObra3?.map((tipo) => ({
              key: tipo.cod_tipo_obra3,
              value: tipo.cod_tipo_obra3,
              label: tipo.nomb_tipo_tipo_obra3,
            }))}
            {...field} />}
          />
          <div className="flex gap-2 p-2">
            <Controller
              name="c_etapas"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="¿Por etapa?"
                  isSelected={true}
                />
              )}
            />
            <Controller
              name="c_anexos_adjunta"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="N° de etapas:"
                  type="number"
                  min={0}
                />
              )}
            />
            <Controller
              name="c_anexos_adjunta"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  label="Etapa por autorizar:"
                  type="number"
                  min={0}
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
            render={({ field }) =>
           <CustomSelect 
            options={modalidadAprob.map((tipo) => ({
              key: tipo.cod_mod_aprob,
              value: tipo.cod_mod_aprob,
              label: tipo.nomb_mod_aprob,
            }))}
            {...field} />}
          />
          <div className="p-2">
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
                  onChange={(value) => setValue("c_option", value)}
                />
              )}
            />
          </div>
        </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <FieldSet className="px-2" title="ANEXOS QUE SE ADJUNTA" code="1.4">
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
                    label: "B - DATOS DE CONDÓMINOS - PERSONAS JURÍDICAS",
                    value: "2",
                  },
                  {
                    label: "E - INDEPENDIZACIÓN TERRENO RÚSTICO / HABILITACIÓN URBANA",
                    value: "3",
                  },
                  {
                    label: "F - SUBDIVISIÓN DE LOTE URBANO",
                    value: "4",
                  },
                  {
                    label: "G - REGULARIZACIÓN DE HABILITACIÓN URBANA EJECUTADA",
                    value: "5",
                  },
                ]}
              />
            )}
          />
        </FieldSet>
      </DivResponsive>
    </FieldSet>
  );
}
