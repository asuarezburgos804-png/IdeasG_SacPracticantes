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
import { Textarea } from "@nextui-org/react";

export default function DocAdjuntoFueForm ({ name, id_fichaDocAdj, recordedData })  {  
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

                <Button 
                    size="sm" 
                    color="danger" 
                    startContent={<DeleteIcon />}>
                Eliminar
                </Button>
            </DivResponsive>
            <DivResponsive style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <FieldSet>
                    <CustomCheckbox name="docDerechoEdificar" label="Documento que acredite el derecho a edificar" control={control} />
                    <CustomCheckbox name="certificadoFactibilidad" label="Certificado Factibilidad de Servicios de: Agua" control={control} />
                    <CustomCheckbox name="planosUbicacion" label="Plano de Ubicación y Localización según formato" control={control} />
                    <CustomCheckbox name="planosArquitectura" label="Planos de Arquitectura" control={control} />
                    <CustomCheckbox name="planoSeguridad" label="Planos de seguridad y evacuación " control={control} />
                    <CustomCheckbox name="planosEstructuras" label="Planos de Estructuras" control={control} />
                    <CustomCheckbox name="planosSanitarios" label="Planos de Instalaciones Sanitarias" control={control} />
                    <CustomCheckbox name="planosElectricos" label="Planos de Instalaciones Eléctricas" control={control} />
                    <CustomCheckbox name="planosCerramiento" label="Planos de cerramiento, para demolicion total en Modalidad C y D" control={control} />
                    <CustomCheckbox name="planosInstalaciones" label="Planos de Instalaciones" control={control} />
                    <CustomCheckbox name="planoSostenimiento" label="Planos de sostenimiento de excavaciones" control={control} />
                    <CustomCheckbox name="planosMemoria" label="Memoria(s) Descriptiva(s) de cada especialidad" control={control} />
                    <CustomCheckbox name="estudioMecanicaSuelos" label="Estudio de Mecánica de Suelos" control={control} />
                    <CustomCheckbox name="certificacionAmbiental" label="Certificación Ambiental" control={control} />
                    <CustomCheckbox name="estudioImpactoVial" label="Estudio de Impacto Vial (1)" control={control} />
                    <CustomCheckbox name="cartaSeguridadObra" label="Carta de Seguridad de Obra" control={control} />
                    <CustomCheckbox name="otros" label="Otros" control={control}/>
                    <div>                   
                    <Textarea
                        label=""
                        placeholder=""
                        minRows={4}
                        fullWidth
                    />
                    </div>
                    
                </FieldSet>

                <FieldSet >
                    <CustomCheckbox name="planosArquitectura" label="Copia documento y planos que acreditan la declaratoria de fabrica o de edificacion de ser el caso(4)" control={control} />
                    <CustomCheckbox name="copiaPlanos" label="Copia de planos y documentos de independizacion del inmueble matera de solicitud (2)(4)" control={control} />
                    <CustomCheckbox name="copiaReglamento" label="Copia del Reglamento Interno (2) (4)" control={control} />
                    <CustomCheckbox name="copiaCertificacion" label="Copia del Certificado de Finalizacion de obra o de Conformidad de obra y Declaratoria de Fabrica, de ser el caso (4)" control={control} />
                    <CustomCheckbox name="copiaLicencia" label="Copia de la Licencia de obra o de Edificacion, de ser caso (4)" control={control} />
                    <CustomCheckbox name="autorizacionJunta" label="Autorización de la Junta de Propietarios (2)" control={control} />
                    <CustomCheckbox name="polizaCar" label="Póliza CAR (Todo Riesgo Contratista) (3)" control={control} />
                    <CustomCheckbox name="informeTecnico" label=" Informe(s) Técnico(s) Favorable de Revisor(es) Urbano(s)" control={control} />
                    <CustomCheckbox name="copiaComprobante" label="Copia del comprobante de pago de la multa por construir sin licencia, para tramite de Licencia de Regularizacion de Edificaciones" control={control} />
                    <CustomCheckbox name="docFecha" label="Documento que acredite la fecha de ejecucion de la Obra para el trámite de Licencia de Regularizacion de Edificaciones" control={control} />
                    <CustomCheckbox name="autorizacion" label="Autorizaciones para uso de explosivos: SUCAMEC ( ) Otros (de corresponder)" control={control} />
                    <CustomCheckbox name="copiaCargo" label="Copia del cargo del documento dirigido a los propietarios y/u ocupantes de las edificaciones colindantes comunicando fecha y hora de las detonaciones, en el caso de uso de explosivos" control={control} />
                    <CustomCheckbox name="copiaPago" label=" Copia(s) de comprobante(s) de pago por revisión de proyecto" control={control} />
                    <CustomCheckbox name="archivoDigital" label="Archivo digital" control={control} />
                </FieldSet>
            </DivResponsive>
            <DivResponsive>
                <div> 
                <h1 className="text-[12px] text-[gray] mt-6 mb-2">
                (1)  De acuerdo a lo establecido en la Ley N° 29090 y su reglamento, según corresponda               
                </h1>
                <h1 className="text-[12px] text-[gray] mt-6 mb-2">
                (2) Para inmuebles sujetos al régimen de propiedad exclusiva y propiedad común.
                </h1>
                <h1 className="text-[12px] text-[gray] mt-6 mb-2">
                (3) Se entregada obligatoriamente a la Municipalidad como maximo el dia habil anterior al inicio de la obra, incluye poliza de responsabiliad civil.
                </h1>
                <h1 className="text-[12px] text-[gray] mt-6 mb-2">
                (4)Solo para ampliaciones, remodelaciones, demoliciones totales y demoliciones parciales
                </h1>
                </div>
            </DivResponsive>
            <DivResponsive>
            <FieldSet title="Número de recibo de pago de la tasa municipal correspondiente">
            <InputValidate
                        name="numeroRecibo"
                        control={control}
                    />
            </FieldSet>
            <FieldSet title="Fecha de pago de tasa municipal correspondiente">
            <InputValidate
                        name="fechaPagoTasa"
                        control={control}
                        type="date"
                    />
            </FieldSet>
            <FieldSet title="Monto pagado S/.">
            <InputValidate
                        name="montoPagado"
                        control={control}
                        type="number"
                    />
            </FieldSet>
            </DivResponsive>

            <DivResponsive>
                <FieldSet title="VERIFICACIÓN DEL CUMPLIMIENTO DE REQUISITOS:" code="9.1">
                <div>                   
                    <Textarea
                        label=""
                        placeholder=""
                        minRows={4}
                        fullWidth
                    />
                </div>
                </FieldSet>
            </DivResponsive>
            <DivResponsive>
            <FieldSet title="Fecha">
            <InputValidate
                        name="fecha"
                        control={control}
                        type="date"
                    />
            </FieldSet>
            </DivResponsive>

        </FieldSet>
    );
}