import React from "react";

import FieldSet from "@/components/dashboard/general/fieldset";
import InputValidate from "@/components/dashboard/general/input";
import DivResponsive from "@/components/dashboard/general/divResponsive";
import CustomCheckbox from "@/components/dashboard/general/CustomCheckbox";
import CustomSelect from "@/components/dashboard/general/CustomSelect";
import {PlusIcon} from "@/icons/table/PlusIcon";
import {DeleteIcon} from "@/icons/table/DeleteIcon";
import {EditIcon} from "@/icons/table/EditIcon";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@nextui-org/react";
import { postAdministrado,putAdministrado,deleteAdministrado } from "@/app/services/control_urbano/fue/fue";

const AdministradoFueForm =({id_expediente,
  recordedData,
  refetch,
  toast})=>{

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
        <FieldSet title="PROPIETARIO">
        <div className="flex gap-2 p-2">
            <Controller
              name="c_propietario"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="Si"
                  isSelected={false}
                />
              )}
            />
            <Controller
              name="c_propietario"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="No"
                  isSelected={false}
                />
              )}
            />
            </div>
            </FieldSet>
      </DivResponsive>
      <DivResponsive>
        <FieldSet title="PERSONA NATURAL" code="2.1">
          <DivResponsive>
          <FieldSet title="Apellido Paterno">
            <InputValidate
                        name="apellidoPaterno"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Apellido Materno">
            <InputValidate
                        name="apellidoMaterno"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Nombre(s)">
            <InputValidate
                        name="nombre"
                        control={control}
                    />
            </FieldSet>
            </DivResponsive>
            <DivResponsive>
            <FieldSet title="N° DNI/CE">
            <InputValidate
                        name="numero"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Teléfono">
            <InputValidate
                        name="telefono"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Correo Electrónico">
            <InputValidate
                        name="correo"
                        control={control}
                    />
            </FieldSet>
            </DivResponsive>

            <h1>Domicilio</h1>
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
          <h1>Estado Civil</h1>
          <div className="flex gap-2 p-2">
            <Controller
              name="c_estado"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="Soltero(a)"
                  isSelected={false}
                />
              )}
            />
            <Controller
              name="c_estado"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="Casado(a)"
                  isSelected={false}
                />
              )}
            />
            <Controller
              name="c_estado"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="Viudo(a)"
                  isSelected={false}
                />
              )}
            />
            <Controller
              name="c_anexos_adjunta"
              control={control}
              render={({ field }) => (
                <CustomCheckbox
                  {...field}
                  label="Divorciado(a)"
                  isSelected={false}
                />
              )}
            />
          </div>   
          <h1>Cónyugue</h1>
          <DivResponsive >
          <FieldSet title="Apellido Paterno">
            <InputValidate
                        name="apellidoPaterno"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Apellido Materno">
            <InputValidate
                        name="apellidoMaterno"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Nombre(s)">
            <InputValidate
                        name="nombre"
                        control={control}
                    />
            </FieldSet>
            </DivResponsive>

            <DivResponsive >
            <FieldSet title="N° DNI/CE">
            <InputValidate
                        name="numero"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Teléfono">
            <InputValidate
                        name="telefono"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Correo Electrónico">
            <InputValidate
                        name="correo"
                        control={control}
                    />
            </FieldSet>
              </DivResponsive>
              </FieldSet>
            </DivResponsive>

            <DivResponsive>
              <FieldSet title="PERSONA JURÍDICA" code="2.2">
                <DivResponsive>
                <FieldSet title="Razón Social o Denominación">
                  <InputValidate
                        name="razonSocial"
                        control={control}
                    />
                </FieldSet>
                <FieldSet title="Nº RUC">
                  <InputValidate
                        name="razonSocial"
                        control={control}
                    />
                </FieldSet>
                </DivResponsive>
                <h1>Domicilio</h1>
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
                </FieldSet>
              </DivResponsive>
              <DivResponsive>
              <FieldSet title="APODERADO O REPRESENTANTE LEGAL" code="2.3">
              <div className="flex gap-2 p-2">
              <Controller
                name="c_tipo_persona"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    {...field}
                    label="PERSONA NATURAL"
                    isSelected={false}
                  />
                )}
              />
              <Controller
                name="c_tipo_persona"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    {...field}
                    label="PERSONA JURÍDICA"
                    isSelected={false}
                  />
                )}
              />
              </div>
              <DivResponsive>
              <FieldSet title="Apellido Paterno">
                  <InputValidate
                      name="apellidoPaterno"
                      control={control}
                    />
              </FieldSet>
              <FieldSet title="Apellido Materno">
                  <InputValidate
                      name="apellidoMaterno"
                      control={control}
                    />
              </FieldSet>
              <FieldSet title="Nombre(s)">
                  <InputValidate
                      name="nombre"
                      control={control}
                    />
              </FieldSet>
              </DivResponsive>

              <DivResponsive >
              <FieldSet title="N°  DNI / CE ">
                  <InputValidate
                      name="numero"
                      control={control}
                      type="number"
                    />
              </FieldSet>
              <FieldSet title="Teléfono">
                  <InputValidate
                      name="telefono"
                      control={control}
                    />
              </FieldSet>
              <FieldSet title="Correo Electrónico">
                  <InputValidate
                      name="correo"
                      control={control}
                    />
              </FieldSet>
              </DivResponsive>
              <h1>Domicilio</h1>
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
                      type="number"
                    />
              </FieldSet>
              <FieldSet title="Sub Lote(s)">
                  <InputValidate
                      name="subLote"
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
                      name="numero"
                      control={control}
                    />
                </FieldSet>

                </DivResponsive>
              </FieldSet>
            </DivResponsive>   
    </FieldSet>
  );
};

export default AdministradoFueForm;


