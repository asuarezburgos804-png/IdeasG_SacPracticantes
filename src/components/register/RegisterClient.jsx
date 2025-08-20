"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Chip,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

import {
  postRegisterClient,
  postVerifyEmailCode,
  postVerifyUserMaster,
  postVerifyCorreoMaster,
} from "@/app/services/security/register";
import { useVerifyEmailState } from "@/app/hooks/authentication/useRegister";
import { PlusIcon } from "@/icons/table/PlusIcon";
import { toast, Toaster } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { NotificationIcon } from "@/icons/reusable-table/NotificationIcon";
import DivResponsive from "../dashboard/general/divResponsive";
import { EyeIcon } from "@/icons/social/EyeIcon";
import { EyeOffIcon } from "@/icons/social/EyeOffIcon";
import TermsAndConditionsModal from "./TermsAndConditions";
import IconCheckCircle from "@/icons/checkIcon";
import ConfirmModal from "./ConfirmModal";
import { useDepartamentos, useDistritos, useProvincias } from "@/app/hooks/espaciales/useListas";

export default function RegisterClient() {
  const router = useRouter();
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisponibleEmailMaster, setIsDisponibleEmailMaster] = useState(true);
  const [isDisponibleUserMaster, setIsDisponibleUserMaster] = useState(true);
  const { data: listDep = [], isLoading: isLoadingDep } = useDepartamentos();
  const { data: listProv = [], isLoading: isLoadingProv } = useProvincias(selectedDepartamento);
  const { data: listDist = [], isLoading: isLoadingDist } = useDistritos(selectedProvincia);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      dni: "",
      celular: "",
      correo: "",
      cargo: "",
      usuario: "",
      contrasena: "",
      area_municipal: "",
      descripcion_uso: "",
      c_ubigeo_dep: "",
      c_ubigeo_prov: "",
      c_ubigeo_dist: "",
      terminos_condiciones: false,
    },
  });
  const terminos_condiciones = watch("terminos_condiciones");
  const email = watch("correo");
  const { isLoading, data, isError } = useVerifyEmailState(email);

  // Watch para validación en tiempo real de contraseña
  const watchPassword = watch("contrasena", "");

  // Función para validar contraseña en tiempo real
  const validatePasswordLive = (password) => {
    const validations = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      symbol: /\W/.test(password),
    };
    return validations;
  };

  const passwordValidations = validatePasswordLive(watchPassword);

  const handleVerifyCorreoMaster = async (email) => {
    const requestData = {
      correo: email,
    };

    try {
      const response = await postVerifyCorreoMaster(requestData);

      console.log("Verificación de correo:", response.disponible);
      setIsDisponibleEmailMaster(response.disponible);
      return response;
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      toast.error("Ocurrió un error al verificar el correo.");
      throw error;
    }
  };
  const username = watch("usuario");
  const handleVerifyUserMaster = async (username) => {
    const requestData = {
      usuario: username,
    };

    try {
      const response = await postVerifyUserMaster(requestData);
      setIsDisponibleUserMaster(response.disponible);
      console.log("Verificación de usuario:", response);
      return response;
    } catch (error) {
      console.error("Error al verificar el usuario:", error);
      toast.error("Ocurrió un error al verificar el usuario.");
      throw error;
    }
  };

  const handleRegisterClient = async (formData) => {
    const dataToSend = {
      ...formData,
      ubigeo: formData.c_ubigeo_dist,
      captchaToken: captchaToken,
    };

    delete dataToSend.c_ubigeo_dep;
    delete dataToSend.c_ubigeo_prov;
    delete dataToSend.c_ubigeo_dist;

    try {
      const response = await postRegisterClient(dataToSend);
      console.log("Registro exitoso:", response);
      toast.success("Registrado!");
      reset();
      return response;
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      toast.error("Ocurrió un error.", error);
      throw error;
    }
  };

  const handleVerifyEmailCode = async (email) => {
    const requestData = {
      correo: email,
    };

    try {
      const response = await postVerifyEmailCode(requestData);

      toast.success("Enviando correo para verificacion");
      console.log("enviado de correo:", response);
      return response;
    } catch (error) {
      console.error("Error al verificar el código de correo:", error);
      toast.error("Ocurrió un error al verificar el código.");
      throw error;
    }
  };

  const onSubmit = async (formData) => {
    console.log(formData);

    if (!terminos_condiciones) {
      toast.error("Por favor, Aceptar terminos y condiciones");
      return;
    }
    if (!captchaToken) {
      toast.error("Por favor, completa el CAPTCHA.");
      return;
    }
    if (!data?.confirmado) {
      toast.error("Por favor, verifica correo.");
      return;
    }

    if (data?.confirmado) {
      try {
        await handleRegisterClient(formData);
        toast.success("Registro exitoso!");
      } catch (error) {
        console.error("Error al registrar al cliente:", error);
        toast.error("Error al registrar al cliente.");
      } finally {
        setIsModalOpen(true);
        setTimeout(() => {
          router.push("/");
          setIsModalOpen(false);
        }, 6000);
      }
    }
  };

  useEffect(() => {
    if (email) {
      handleVerifyCorreoMaster(email);
    }
  }, [email]);
  useEffect(() => {
    if (username) {
      handleVerifyUserMaster(username);
    }
  }, [username]);
  return (
    <div className=" px-4 py-9 md:px-10 lg:px-24 xl:px-40">
      <Toaster position="top-right" richColors />
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md rounded-lg p-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* ---------------- Datos Personales ---------------- */}
          <div className="  flex flex-col gap-3">
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "Nombre es obligatorio" }}
              render={({ field }) => (
                <Input
                  label="Nombre"
                  size="lg"
                  classNames={{
                    label: "font-bold ",
                    input: "font-light text-xs",
                  }}
                  placeholder="Ingrese su nombre"
                  {...field}
                  isInvalid={!!errors.nombre}
                  errorMessage={errors.nombre?.message}
                />
              )}
            />

            <DivResponsive>
              <Controller
                name="apellido_paterno"
                control={control}
                rules={{ required: "Apellido Paterno es obligatorio" }}
                render={({ field }) => (
                  <Input
                    label="Apellido paterno"
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    placeholder="Ingrese su apellido paterno"
                    {...field}
                    isInvalid={!!errors.apellido_paterno}
                    errorMessage={errors.apellido_paterno?.message}
                  />
                )}
              />

              <Controller
                name="apellido_materno"
                control={control}
                rules={{ required: "Apellido Materno es obligatorio" }}
                render={({ field }) => (
                  <Input
                    label="Apellido materno"
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    placeholder="Ingrese su apellido materno"
                    {...field}
                    isInvalid={!!errors.apellido_materno}
                    errorMessage={errors.apellido_materno?.message}
                  />
                )}
              />
            </DivResponsive>

            <Controller
              name="dni"
              control={control}
              rules={{
                required: "DNI es obligatorio",
                pattern: {
                  value: /^\d{8}$/,
                  message: "DNI debe tener 8 dígitos numéricos",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="DNI"
                  size="lg"
                  classNames={{
                    label: "font-bold ",
                    input: "font-light text-xs",
                  }}
                  placeholder="Ingrese su DNI"
                  type="text"
                  maxLength={8}
                  isInvalid={!!errors.dni}
                  errorMessage={errors.dni?.message}
                />
              )}
            />

            <Controller
              name="correo"
              control={control}
              rules={{
                required: "Correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo no válido",
                },
              }}
              render={({ field }) => (
                <div className="flex flex-col gap-0.5 items-center">
                  {isDisponibleEmailMaster === false && (
                    <Chip
                      size="sm"
                      color="danger"
                      endContent={<NotificationIcon size={16} />}
                      variant="flat"
                    >
                      Correo electrónico registrado
                    </Chip>
                  )}
                  <Input
                    {...field}
                    label="Email"
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    placeholder="Ingrese su correo electrónico"
                    type="email"
                    isInvalid={!!errors.correo}
                    errorMessage={errors.correo?.message}
                  />
                  <div className="flex gap-3 items-center p-1">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => handleVerifyEmailCode(email)}
                      isDisabled={!email || !isDisponibleEmailMaster}
                    >
                      Verificar Correo
                    </Button>
                    {data?.confirmado && (
                      <Chip
                        size="sm"
                        color="success"
                        endContent={<IconCheckCircle size={16} />}
                        variant="flat"
                      >
                        Correo electrónico confirmado
                      </Chip>
                    )}
                  </div>
                </div>
              )}
            />

            <Controller
              name="celular"
              control={control}
              rules={{
                required: "Celular es obligatorio",
                pattern: {
                  value: /^\+?\d{9,15}$/,
                  message: "Número no válido",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  label="Celular"
                  size="lg"
                  classNames={{
                    label: "font-bold ",
                    input: "font-light text-xs",
                  }}
                  placeholder="Ingrese su celular"
                  isInvalid={!!errors.celular}
                  errorMessage={errors.celular?.message}
                />
              )}
            />
          </div>

          {/* --------------- Ubicación y Envío --------------- */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Controller
                  name="usuario"
                  control={control}
                  rules={{ required: "Usuario es obligatorio" }}
                  render={({ field }) => (
                    <div className="flex flex-col w-full">
                      {isDisponibleUserMaster === false && (
                        <Chip
                          size="sm"
                          color="danger"
                          endContent={<NotificationIcon size={16} />}
                          variant="flat"
                          className="mb-1"
                        >
                          Username registrado
                        </Chip>
                      )}
                      <Input
                        label="Usuario"
                        size="lg"
                        className="w-full"
                        classNames={{
                          label: "font-bold",
                          input: "font-light text-xs",
                        }}
                        placeholder="Ingrese su usuario"
                        {...field}
                        isInvalid={!!errors.usuario}
                        errorMessage={errors.usuario?.message}
                      />
                    </div>
                  )}
                />

                <Controller
                  name="contrasena"
                  control={control}
                  rules={{
                    required: "Contraseña es obligatoria",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                      message:
                        "Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y símbolos",
                    },
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col w-full gap-2">
                      <Input
                        {...field}
                        label="Contraseña"
                        size="lg"
                        className="w-full"
                        classNames={{
                          label: "font-bold",
                          input: "font-light text-xs",
                        }}
                        placeholder="Ingrese su contraseña"
                        type={showPassword ? "text" : "password"}
                        isInvalid={!!errors.contrasena}
                        errorMessage={errors.contrasena?.message}
                        endContent={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOffIcon size={18} />
                            ) : (
                              <EyeIcon size={18} />
                            )}
                          </button>
                        }
                      />
                      
                      {/* Indicadores de validación en tiempo real */}
                      {watchPassword && (
                        <div className="flex flex-wrap gap-1">
                          <Chip
                            size="sm"
                            color={passwordValidations.length ? "success" : "default"}
                            variant="flat"
                          >
                            {passwordValidations.length ? "✓" : "○"} Mín. 8 caracteres
                          </Chip>
                          <Chip
                            size="sm"
                            color={passwordValidations.lowercase ? "success" : "default"}
                            variant="flat"
                          >
                            {passwordValidations.lowercase ? "✓" : "○"} Minúscula
                          </Chip>
                          <Chip
                            size="sm"
                            color={passwordValidations.uppercase ? "success" : "default"}
                            variant="flat"
                          >
                            {passwordValidations.uppercase ? "✓" : "○"} Mayúscula
                          </Chip>
                          <Chip
                            size="sm"
                            color={passwordValidations.symbol ? "success" : "default"}
                            variant="flat"
                          >
                            {passwordValidations.symbol ? "✓" : "○"} Símbolo
                          </Chip>
                        </div>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="confirmarContrasena"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value === getValues("contrasena") ||
                      "Las contraseñas no coinciden",
                  }}
                  render={({ field }) => (
                    <div className="flex flex-col w-full">
                      <Input
                        {...field}
                        size="lg"
                        className="w-full"
                        classNames={{
                          label: "font-bold",
                          input: "font-light text-xs",
                        }}
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirmar contraseña"
                        placeholder="Confirme su contraseña"
                        isInvalid={!!errors.confirmarContrasena}
                        errorMessage={errors.confirmarContrasena?.message}
                        endContent={
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon size={18} />
                            ) : (
                              <EyeIcon size={18} />
                            )}
                          </button>
                        }
                      />
                    </div>
                  )}
                />
              </div>

              <Controller
                name="cargo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    label="Cargo"
                    placeholder="Ej. Alcalde, Regidor, Gerente Municipal"
                    isInvalid={!!errors.cargo}
                    errorMessage={errors.cargo?.message}
                  />
                )}
              />

              <Controller
                name="area_municipal"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    label="Area municipal"
                    placeholder="Ej. Desarrollo Urbano, Tesorería, Recursos Humanos"
                    isInvalid={!!errors.area_municipal}
                    errorMessage={errors.area_municipal?.message}
                  />
                )}
              />

              <Controller
                name="descripcion_uso"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    classNames={{
                      label: "font-bold ",
                      input: "font-light text-xs",
                    }}
                    label="Descripcion uso "
                    placeholder="Ej. Visualización de predios, análisis territorial, gestión de catastro"
                    isInvalid={!!errors.descripcion_uso}
                    errorMessage={errors.descripcion_uso?.message}
                  />
                )}
              />

              <DivResponsive>
                <Controller
                  name="c_ubigeo_dep"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isRequired
                      {...field}
                      classNames={{
                        label: "text-xs",
                        value: "text-xs",
                      }}
                      {...field}
                      isDisabled={isLoadingDep}
                      label="Seleccione departamento"
                      selectedKeys={field.value ? [field.value] : []}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                        setSelectedDepartamento(val);
                      }}
                    >
                      {listDep.map((d) => (
                        <SelectItem
                          classNames={{
                            title: "text-xs",
                          }}
                          key={d.iddpto}
                          value={d.iddpto}
                        >
                          {d.nombdep}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="c_ubigeo_prov"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isRequired
                      {...field}
                      classNames={{
                        label: "text-xs",
                        value: "text-xs",
                      }}
                      isDisabled={isLoadingProv}
                      label="Seleccione provincia"
                      selectedKeys={field.value ? [field.value] : []}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                        setSelectedProvincia(val);
                      }}
                    >
                      {listProv.map((p) => (
                        <SelectItem
                          classNames={{
                            title: "text-xs",
                          }}
                          key={p.idprov}
                          value={p.idprov}
                        >
                          {p.nombprov}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Controller
                  name="c_ubigeo_dist"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isRequired
                      {...field}
                      classNames={{
                        label: "text-xs",
                        value: "text-xs",
                      }}
                      {...field}
                      isDisabled={isLoadingDist}
                      label="Seleccione distrito"
                      selectedKeys={field.value ? [field.value] : []}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {listDist.map((d) => (
                        <SelectItem
                          classNames={{
                            title: "text-xs",
                          }}
                          key={d.iddist}
                          value={d.iddist}
                        >
                          {d.nombdist}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </DivResponsive>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="text-sm font-bold underline text-[#0070f0]"
                onClick={() => setShowModal(true)}
              >
                Ver Términos y Condiciones
              </button>
              <TermsAndConditionsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                control={control}
              />

              <ReCAPTCHA
                sitekey="6LcFFZYrAAAAANIhXGY8Ki0Sm4mTAh9uJI0oWpUA"
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <Button
              size="sm"
              color="primary"
              type="submit"
              startContent={<PlusIcon />}
              isDisabled={
                isDisponibleEmailMaster === false ||
                isDisponibleUserMaster === false
              }
            >
              Registrar Gratis
            </Button>
          </div>
        </form>
      </Card>
      <ConfirmModal isOpen={isModalOpen} />
    </div>
  );
}
