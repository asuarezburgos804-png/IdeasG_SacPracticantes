"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { UserIcon } from "@/icons/UserIcon";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {
  getDepartamentos,
  getProvincias,
  getDistritos,
} from "@/app/services/master/master";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  postRegisterUser,
  resendConfirmationEmail,
} from "@/app/services/security/authenticate";

const registerSchema = z
  .object({
    nombres: z.string().min(2, "Nombres son requeridos"),
    c_ape_paterno: z.string().min(2, "Apellido paterno es requerido"),
    c_ape_materno: z.string().min(2, "Apellido materno es requerido"),
    c_email: z.string().email("Correo electrónico inválido"),
    c_dni: z.string().length(8, "DNI debe tener 8 dígitos"),
    c_contrasena: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales"
      ),
    confirmPassword: z.string(),
    cod_departamento: z.string().min(1, "Seleccione una región"),
    cod_provincia: z.string().min(1, "Seleccione una provincia"),
    cod_distrito: z.string().min(1, "Seleccione un distrito"),
    c_ubigeo: z.string().min(1, "Ubigeo es requerido"),
    terminosAceptados: z
      .boolean()
      .refine((val) => val === true, "Debe aceptar los términos y condiciones"),
  })
  .refine((data) => data.c_contrasena === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function Register2() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [ubigeo, setUbigeo] = useState("000000");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captcha, setCaptcha] = useState({
    num1: Math.floor(Math.random() * 50),
    num2: Math.floor(Math.random() * 50),
    userAnswer: "",
    isValid: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terminosAceptados: false,
    },
  });

  // Observar cambios en región y provincia
  const selectedRegion = watch("cod_departamento");
  const selectedProvincia = watch("cod_provincia");

  useEffect(() => {
    // Cargar regiones al inicio
    cargarRegiones();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      cargarProvincias(selectedRegion);
      actualizarUbigeo(selectedRegion, "", "");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvincia) {
      cargarDistritos(selectedProvincia);
      actualizarUbigeo(selectedRegion, selectedProvincia, "");
    }
  }, [selectedProvincia]);

  useEffect(() => {
    const selectedDistrito = watch("cod_distrito");
    if (selectedDistrito) {
      actualizarUbigeo(selectedRegion, selectedProvincia, selectedDistrito);
    }
  }, [watch("cod_distrito")]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      setValue("cod_provincia", "");
      setValue("cod_distrito", "");
    }
  }, [selectedRegion, setValue]);

  useEffect(() => {
    if (selectedProvincia) {
      setValue("cod_distrito", "");
    }
  }, [selectedProvincia, setValue]);

  const cargarRegiones = async () => {
    try {
      const response = await getDepartamentos();
      if (response) {
        setRegiones(response);
      }
    } catch (error) {
      console.error("Error al cargar regiones:", error);
    }
  };

  const cargarProvincias = async (regionId) => {
    try {
      const response = await getProvincias(regionId);
      if (response) {
        setProvincias(response);
      }
    } catch (error) {
      console.error("Error al cargar provincias:", error);
    }
  };

  const cargarDistritos = async (provinciaId) => {
    try {
      const response = await getDistritos(provinciaId);
      if (response) {
        setDistritos(response);
      }
    } catch (error) {
      console.error("Error al cargar distritos:", error);
    }
  };

  const actualizarUbigeo = (region = "", provincia = "", distrito = "") => {
    let nuevoUbigeo = "000000";

    if (distrito) {
      nuevoUbigeo = distrito; // El ID del distrito ya viene con 6 dígitos
    } else if (provincia) {
      nuevoUbigeo = provincia.padEnd(6, "0"); // Completar el ID de provincia con ceros
    } else if (region) {
      nuevoUbigeo = region.padEnd(6, "0"); // Completar el ID de región con ceros
    }

    setUbigeo(nuevoUbigeo);
    setValue("c_ubigeo", nuevoUbigeo);
  };

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 50),
      num2: Math.floor(Math.random() * 50),
      userAnswer: "",
      isValid: false,
    });
  };

  const handleCaptchaChange = (e) => {
    const answer = e.target.value;
    const isCorrect = parseInt(answer) === captcha.num1 + captcha.num2;
    setCaptcha((prev) => ({
      ...prev,
      userAnswer: answer,
      isValid: isCorrect,
    }));

    if (isCorrect) {
      setShowCaptcha(false);
    }
  };

  const handleCheckboxClick = () => {
    if (!captcha.isValid) {
      setShowCaptcha(true);
      generateCaptcha();
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!captcha.isValid) {
        toast.error("Por favor, complete la verificación de seguridad");
        return;
      }

      const requestData = {
        c_nombres: data.nombres,
        c_ape_paterno: data.c_ape_paterno,
        c_ape_materno: data.c_ape_materno,
        c_email: data.c_email,
        c_dni: data.c_dni,
        c_contrasena: data.c_contrasena,
        c_ubigeo: data.c_ubigeo,
        cod_departamento: data.cod_departamento,
        cod_provincia: data.cod_provincia,
        cod_distrito: data.cod_distrito,
      };

      const response = await postRegisterUser(requestData);

      if (response.status === "success") {
        setShowConfirmationModal(true);
      } else {
        toast.error(response.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error(
        error.message ||
          "Ocurrió un error durante el registro. Por favor, intente nuevamente"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Toaster position="top-center" richColors />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Registro de Usuario
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Datos personales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                {...register("nombres")}
                label="Nombres"
                variant="bordered"
                color={errors.nombres ? "danger" : "default"}
                errorMessage={errors.nombres?.message}
              />
              <Input
                {...register("c_ape_paterno")}
                label="Apellido Paterno"
                variant="bordered"
                color={errors.c_ape_paterno ? "danger" : "default"}
                errorMessage={errors.c_ape_paterno?.message}
              />
              <Input
                {...register("c_ape_materno")}
                label="Apellido Materno"
                variant="bordered"
                color={errors.c_ape_materno ? "danger" : "default"}
                errorMessage={errors.c_ape_materno?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("c_dni")}
                label="DNI"
                variant="bordered"
                maxLength={8}
                color={errors.c_dni ? "danger" : "default"}
                errorMessage={errors.c_dni?.message}
              />
              <Input
                {...register("c_email")}
                label="Correo electrónico"
                variant="bordered"
                color={errors.c_email ? "danger" : "default"}
                errorMessage={errors.c_email?.message}
              />
            </div>

            {/* Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("c_contrasena")}
                type={isVisible ? "text" : "password"}
                label="Contraseña"
                variant="bordered"
                color={errors.c_contrasena ? "danger" : "default"}
                errorMessage={errors.c_contrasena?.message}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                  </button>
                }
              />
              <Input
                {...register("confirmPassword")}
                type={isVisible ? "text" : "password"}
                label="Confirmar contraseña"
                variant="bordered"
                color={errors.confirmPassword ? "danger" : "default"}
                errorMessage={errors.confirmPassword?.message}
              />
            </div>

            {/* Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                {...register("cod_departamento")}
                label="Región"
                variant="bordered"
                color={errors.cod_departamento ? "danger" : "default"}
                errorMessage={errors.cod_departamento?.message}
              >
                {regiones.map((region) => (
                  <SelectItem key={region.iddpto} value={region.iddpto}>
                    {region.nombdep}
                  </SelectItem>
                ))}
              </Select>

              <Select
                {...register("cod_provincia")}
                label="Provincia"
                variant="bordered"
                isDisabled={!selectedRegion}
                color={errors.cod_provincia ? "danger" : "default"}
                errorMessage={errors.cod_provincia?.message}
              >
                {provincias.map((provincia) => (
                  <SelectItem key={provincia.idprov} value={provincia.idprov}>
                    {provincia.nombprov}
                  </SelectItem>
                ))}
              </Select>

              <Select
                {...register("cod_distrito")}
                label="Distrito"
                variant="bordered"
                isDisabled={!selectedProvincia}
                color={errors.cod_distrito ? "danger" : "default"}
                errorMessage={errors.cod_distrito?.message}
                onChange={(e) => {
                  const distritoId = e.target.value;
                  setValue("cod_distrito", distritoId);
                  actualizarUbigeo(
                    selectedRegion,
                    selectedProvincia,
                    distritoId
                  );
                }}
              >
                {distritos.map((distrito) => (
                  <SelectItem key={distrito.iddist} value={distrito.iddist}>
                    {distrito.nombdist}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Input
              value={ubigeo}
              label="Ubigeo"
              variant="bordered"
              isReadOnly
            />

            {/* Términos y condiciones */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  {...register("terminosAceptados")}
                  isSelected={watch("terminosAceptados")}
                  onValueChange={(isSelected) =>
                    setValue("terminosAceptados", isSelected)
                  }
                  color={errors.terminosAceptados ? "danger" : "primary"}
                >
                  <span className="text-sm">
                    He leído y acepto los{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 font-medium underline focus:outline-none"
                      onClick={() => setIsModalOpen(true)}
                    >
                      términos y condiciones
                    </button>
                  </span>
                </Checkbox>
              </div>
              {errors.terminosAceptados && (
                <p className="text-danger text-xs">
                  {errors.terminosAceptados.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                isSelected={captcha.isValid}
                onClick={handleCheckboxClick}
                color="primary"
              >
                <span className="text-sm text-gray-600">No soy un robot</span>
              </Checkbox>

              {showCaptcha && !captcha.isValid && (
                <div className="inline-flex items-center gap-1.5 bg-gray-50/50 px-2 py-1 rounded">
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {captcha.num1} + {captcha.num2} =
                  </span>
                  <Input
                    type="number"
                    value={captcha.userAnswer}
                    onChange={handleCaptchaChange}
                    className="w-14"
                    size="sm"
                    variant="flat"
                    placeholder="?"
                    classNames={{
                      input: "text-center text-sm",
                      inputWrapper: "h-6 min-h-0 bg-white",
                    }}
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-gray-400 hover:text-gray-600 p-1 text-sm"
                  >
                    🔄
                  </button>
                </div>
              )}

              {showCaptcha && captcha.userAnswer && !captcha.isValid && (
                <span className="text-danger text-xs">Inténtalo de nuevo</span>
              )}
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={!captcha.isValid || !watch("terminosAceptados")}
              startContent={<UserIcon />}
            >
              Registrarme
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/authentication/(.)signIn"
                className="font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Modal de términos y condiciones */}
      <Modal
        isOpen={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        size="2xl"
        scrollBehavior="inside"
        className="max-h-[90vh]"
        classNames={{
          base: "rounded-2xl",
          header: "rounded-t-2xl",
          body: "rounded-none",
          footer: "rounded-b-2xl",
          closeButton: "hover:bg-gray-100 active:bg-gray-200 rounded-full",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center border-b border-gray-200 pb-4 sticky top-0 bg-white z-10 rounded-t-2xl bg-gradient-to-b from-gray-50 to-white">
                <h3 className="text-xl font-bold text-gray-800">
                  Términos y Condiciones
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Por favor, lee cuidadosamente nuestros términos y condiciones
                </p>
              </ModalHeader>

              <ModalBody className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-6">
                  <section className="space-y-2 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-lg">
                        1
                      </span>
                      Introducción
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Al registrarte en nuestra plataforma, aceptas cumplir y
                      estar sujeto a estos términos y condiciones de uso. Es
                      importante que leas y comprendas completamente este
                      acuerdo.
                    </p>
                  </section>

                  <section className="space-y-2 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-lg">
                        2
                      </span>
                      Uso del Servicio
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Nuestros servicios están diseñados para proporcionar una
                      experiencia segura y eficiente. Como usuario, te
                      comprometes a:
                    </p>
                    <ul className="list-none text-sm text-gray-600 space-y-2 mt-2">
                      {[
                        "Proporcionar información precisa y actualizada",
                        "Mantener la confidencialidad de tu cuenta",
                        "Usar el servicio de manera responsable",
                        "No realizar actividades fraudulentas",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-blue-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-2 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-lg">
                        3
                      </span>
                      Privacidad
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Tu privacidad es importante para nosotros. Recopilamos y
                      procesamos tu información personal de acuerdo con nuestra
                      Política de Privacidad.
                    </p>
                  </section>

                  <section className="space-y-2 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-lg">
                        4
                      </span>
                      Responsabilidades
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Como usuario de nuestra plataforma, eres responsable de:
                    </p>
                    <ul className="list-none text-sm text-gray-600 space-y-2 mt-2">
                      {[
                        "Mantener la seguridad de tu cuenta",
                        "Reportar cualquier actividad sospechosa",
                        "Cumplir con todas las leyes aplicables",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-blue-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </ModalBody>

              <ModalFooter className="flex flex-col border-t border-gray-200 pt-4 sticky bottom-0 bg-white z-10 rounded-b-2xl bg-gradient-to-t from-gray-50 to-white">
                <div className="flex justify-center gap-3 w-full">
                  <Button
                    color="primary"
                    size="sm"
                    className="px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                    onPress={() => {
                      setValue("terminosAceptados", true);
                      onClose();
                    }}
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="bordered"
                    size="sm"
                    className="px-8 rounded-full hover:bg-gray-100 transition-colors"
                    onPress={() => {
                      setValue("terminosAceptados", false);
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Al hacer clic en Aceptar, confirmas que has leído y aceptado
                  nuestros términos.
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showConfirmationModal}
        onOpenChange={setShowConfirmationModal}
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-gray-900">
                  ¡Registro Exitoso!
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg
                        className="w-8 h-8 text-green-500 checkmark-animation"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Tu cuenta ha sido creada exitosamente. Hemos enviado un
                    correo de confirmación a:
                  </p>
                  <p className="font-medium text-gray-900">
                    {watch("c_email")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Por favor, revisa tu bandeja de entrada y sigue las
                    instrucciones para activar tu cuenta.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    router.push("/authentication/(.)signIn");
                  }}
                >
                  Ir a Iniciar Sesión
                </Button>
                <Button
                  variant="light"
                  onPress={async () => {
                    try {
                      await resendConfirmationEmail(watch("c_email"));
                      toast.success("Correo de confirmación reenviado");
                    } catch (error) {
                      toast.error("Error al reenviar el correo");
                    }
                  }}
                >
                  Reenviar correo de confirmación
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
