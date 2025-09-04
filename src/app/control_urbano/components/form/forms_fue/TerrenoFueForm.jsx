import React from "react";

import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import { EditIcon } from "@/icons/table/EditIcon";

import { Controller, useForm } from "react-hook-form";
import { Button, buttonGroup } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Select,SelectItem } from "@nextui-org/react";

export default function TerrenoFueForm ({name,id_fichaVia, recordedData}){
  const { handleSubmit, control, setValue, watch, reset } = useForm({});
  const tipoVia = [
    {
      cod_tipo_via: "01",
      nomb_tipo_tipo_via: "AV.",
    },
    {
      cod_tipo_via: "02",
      nomb_tipo_tipo_via: "JR.",
    },
    {
      cod_tipo_via: "03",
      nomb_tipo_tipo_via: "CALLE",
    },
    {
      cod_tipo_via: "04",
      nomb_tipo_tipo_via: "PASAJE",
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
        <FieldSet title="UBICACIÓN" code="3.1">
        <DivResponsive>
            <FieldSet title="Departamento">
            <InputValidate
                        name="departamento"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Provincia">
            <InputValidate
                        name="provincia"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Distrito">
            <InputValidate
                        name="distrito"
                        control={control}
                    />
            </FieldSet>
            </DivResponsive>
            <DivResponsive>
            <FieldSet title="Urbanización">
            <InputValidate
                        name="urbanizacion"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Mz">
            <InputValidate
                        name="mz"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Lote(s)">
            <InputValidate
                        name="lote"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Sub Lote(s)">
            <InputValidate
                        name="sublote"
                        control={control}
                        type="number"
                    />
            </FieldSet>
            <FieldSet title="Tipo de Via">
            <Controller
                  name="c_tipoVia"
                  control={control}
                  render={({ field }) => 
                  <CustomSelect
                  options={tipoVia?.map((tipo) => ({
                    key: tipo.cod_tipo_via,
                    value: tipo.cod_tipo_via,
                    label: tipo.nomb_tipo_tipo_via,
                    }))}
                    {...field}
                  />
                }
                />
            </FieldSet>
            <FieldSet title="N°">
            <InputValidate
                        name="numero"
                        control={control}
                        type="number"
                    />
            </FieldSet>
            <FieldSet title="Int.">
            <InputValidate
                        name="int"
                        control={control}
                    />
            </FieldSet>
            </DivResponsive>

          <DivResponsive>
            <div> 
              <h1 className="text-[14px] text-[gray] mt-6 mb-2">
                Para facilitarnos el tramite, selecciona donde queda el predio.
              </h1>
              <Button
                size="sm"
                type="submit"
                color="primary"
                startContent={<PlusIcon />}
                >
                Ubicar en el mapa
              </Button>
            </div>
          </DivResponsive>

        </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <FieldSet title="ÁREAS Y MEDIDAS PERIMÉTRICAS" code="3.2">
        <DivResponsive>
        <FieldSet title="Área total(m²)">
            <InputValidate
                name="areaTotal"
                control={control}
                type="number"
              />
            </FieldSet>
            <FieldSet title="Por el frente(m)">
            <InputValidate
                name="porElFrente"
                control={control}
                type="number"
              />
            </FieldSet>
            <FieldSet title="Por la derecha(m)">
            <InputValidate
                name="porLaDerecha"
                control={control}
                type="number"
              />
            </FieldSet>
            <FieldSet title="Por la izquierda(m)">
            <InputValidate
                name="porLaIzquierda"
                control={control}
                type="number"
              />
            </FieldSet>
            <FieldSet title="Por el fondo(m)">
            <InputValidate
                name="porElFondo"
                control={control}
                type="number"
              />
            </FieldSet>
          </DivResponsive>
        </FieldSet>
      </DivResponsive>
    </FieldSet>
  );
};