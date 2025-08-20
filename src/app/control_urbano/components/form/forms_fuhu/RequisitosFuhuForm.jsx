import React from "react";
import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomCheckbox from "@/components/dashboard/general/CustomCheckbox";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";
import { Controller, useForm } from "react-hook-form";
import CustomCheckboxGroup from "@/components/dashboard/general/CustomCheckboxGroup";
import { Button } from "@nextui-org/react";

export default function RequisitosFuhuForm ({ name, id_ficha, recordedData }){
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
        <div className="flex gap-4 p-4">
          <FieldSet
          title="Nro de Recibo de pago tasa:"
          >
            <Controller
              name="c_tasa"
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
            title="F. Mun. de pago" >
            <Controller
              name="c_fecha"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  
                  type="date"
                  min={0}
                 
                />
              )}
            />
           </FieldSet>
  
            <FieldSet
            title="Monto Pagado:"
            >
            <Controller
              name="c_monto"
              control={control}
              render={({ field }) => (
                <InputValidate
                  {...field}
                  
                  type="number"
                  min={0}
                />
              )}
            />
            </FieldSet>
            </div>
        <DivResponsive>
        <FieldSet className="px-2" title="ANEXOS QUE SE ADJUNTA" code="2.1">
          <Controller
            name="c_anexos_adjunta"
            control={control}
            render={({ field }) => (
              <CustomCheckboxGroup
                {...field}
                options={[
                  {
                    label: "CERTIFICADO DE ZONIFICACIÓN Y VÍAS (1)",
                    value: "1",
                  },
                  {
                    label: "CERTIFICADO FACTIBILIDAD DE SERVICIOS",
                    value: "2",
                  },
                  {
                    label: "CERTIFICADO FACTIBILIDAD DE SERVICIOS AGUA",
                    value: "3",
                  },
                  {
                    label: "CERTIFICADO FACTIBILIDAD DE SERVICIOS ALCANTARILLADO ",
                    value: "4",
                  },
                  {
                    label: "CERTIFICADO FACTIBILIDAD DE SERVICIOS ENERGÍA ELÉCTRICA",
                    value: "5",
                  },
                  {
                    label: "PLANO DE UBICACIÓN Y LOCALIZACIÓN DEL TERRENO CON COORDENADAS UTM (3)",
                    value: "6",
                  },
                  {
                    label: "PLANO PERIMÉTRICO Y TOPOGRÁFICO (3)",
                    value: "7",
                  },
                  {
                    label: "PLANO DE TRAZADO Y LOTIZACIÓN (3)",
                    value: "8",
                  },
                  {
                    label: "PLANO DE ORNAMENTACIÓN DE PARQUES (3)",
                    value: "9",
                  },
                  {
                    label: "MEMORIA DESCRIPTIVA (3)",
                    value: "10",
                  },
                  {
                    label: "CERTIFICACIÓN AMBIENTAL",
                    value: "11",
                  },
                  {
                    label: "CERTIFICADO DE INEXISTENCIA DE RESTOS ARQUEOLÓGICOS(3)",
                    value: "12",
                  },
                  {
                    label: "ESTUDIO DE MECÁNICA DE SUELOS CON FINES DE PAVIMENTACION",
                    value: "13",
                  },
                  {
                    label: "ESTUDIO DE IMPACTO VIAL (2)(3)",
                    value: "14",
                  },
                  {
                    label: "COPIA DEL RECIBO DE PAGO EFECTUADO ANTE LOS COLEGIOS PROFESIONALES",
                    value: "15",
                  },
                  {
                    label: "INFORME TÉCNICO FAVORABLE DE REVISORES URBANOS",
                    value: "16",
                  },
                  {
                    label: "PLANO DE LAS REDES PRIMARIAS Y LOCALES",
                    value: "17",
                  },
                  {
                    label: "PLANO DE USOS DE LA TOTALIDAD DE LA PARCELA",
                    value: "18",
                  },
                  {
                    label: "PLANO DE LA PROPUESTA DE INTEGRACION A LA TRAMA URBANA",
                    value: "19",
                  },
                  {
                    label: "OTROS",
                    value: "20",
                  },
                  
                ]}
              />
            )}
          />
          <InputValidate
                  label=" "
                  type="text"
                  min={0}
                  
                />
        </FieldSet>
      </DivResponsive>
      </FieldSet>
        );
};
