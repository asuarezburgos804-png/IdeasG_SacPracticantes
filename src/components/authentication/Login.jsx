"use client";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { UserIcon } from "@/icons/UserIcon";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import IconBack from "@/icons/tools/IconBack";
import { animals, paises } from "@/utils/paises";
import { tiposDocumento } from "@/utils/documento";
import {
  saveSolicitud,
  sendEmail,
  solicitudNewUser,
} from "@/app/services/authentication/management";
import { cargos } from "@/utils/cargos";
import { useSession, signIn, signOut } from "next-auth/react";

import jwt from "jsonwebtoken";

export default function Login({ idsSistema, idCliente}) {
  // console.log(props);
  // console.log(idsSistema);
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const [formRegister, setFormRegister] = useState({
    fk_geoportal: "",
    nombres: "",
    apellidos: "",
    nacionalidad: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    telefono: "",
    ocupacion: "",
    institucion: "",
    cargo: "",
    motivacion: "",
    password: "",
    confirmPassword: "",
  });

  const [valueMail, setValueMail] = useState("");

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (valueMail === "") return false;

    return validateEmail(valueMail) ? false : true;
  }, [valueMail]);

  const [valueEmail, setValueEmail] = useState("");

  const [isLoadingSend, setIsLoadingSend] = useState(false);

  const isInvalidRecovery = useMemo(() => {
    return validateEmail(valueEmail) ? false : true;
  }, [valueEmail]);

  const handleSubmitReset = async (e) => {
    setIsLoadingSend(true);
    e.preventDefault();
    const numero = parseInt(pathname.split("/")[2]);
    const res = await sendEmail({
      email: valueEmail,
      fk_geoportal: numero,
    });
    if (res) {
      toast.success(
        islanguage
          ? "Se ha enviado las credenciales reseteadas a su correo."
          : "Your reset credentials have been sent to your email."
      );
      setValueEmail("");
      setIsForm(1);
      setIsLoadingSend(false);
    } else {
      toast.error(
        islanguage
          ? "Algo pasó durante la solicitud, intente más tarde."
          : "Something went wrong during the request, please try again later"
      );
      setIsLoadingSend(false);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const { valid, errors } = validateFormRegister();
    if (valid) {
      const numero = parseInt(pathname.split("/")[2]);
      formRegister.fk_geoportal = numero;
      formRegister.tipoDocumento = value.currentKey;
      formRegister.cargo = valueCargo.currentKey;
      formRegister.nacionalidad = selectedKey;

      const res = await saveSolicitud(formRegister);
      // console.log(formRegister);
      if (res) {
        toast.success(
          islanguage
            ? "La solicitud ha sido enviada con exito, recibira un correo cuando se apruebe."
            : "The request has been successfully submitted. You will receive an email once it is approved."
        );
        setIsForm(1);
        const body = {
          nombres: formRegister.nombres + " " + formRegister.apellidos,
          cargo: formRegister.cargo,
          email: formRegister.email,
          tipoDocumento: formRegister.tipoDocumento,
          numeroDocumento: formRegister.numeroDocumento,
          telefono: formRegister.telefono,
        };
        await solicitudNewUser(body);
      } else {
        toast.error(
          islanguage
            ? "Algo pasó durante la solicitud, intente más tarde."
            : "Something went wrong during the request, please try again later"
        );
      }
    } else {
      alert(errors.user);
    }
  };

  // const [value, setValue] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);
  const [value, setValue] = useState(new Set([]));

  const [valueCargo, setValueCargo] = useState(new Set([]));

  const onSelectionChange = (id) => {
    setSelectedKey(id);
  };

  const onInputChange = (value) => {
    // setValue(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const validateFormRegister = () => {
    let valid = true;
    const errors = {};

    if (value.size === 0) {
      errors.user = islanguage
        ? "Selecciona un tipo de documento"
        : "Select a document type";
      valid = false;
    }
    if (value.size != 0) {
      if (
        value.currentKey == "DNI" &&
        formRegister.numeroDocumento.length < 8
      ) {
        errors.user = islanguage
          ? "El DNI debe tener 8 digitos"
          : "The DNI must have 8 digits";
        valid = false;
      }
      if (
        value.currentKey == "RUC" &&
        formRegister.numeroDocumento.length < 11
      ) {
        errors.user = islanguage
          ? "El RUC debe tener 11 digitos"
          : "The RUC must have 11 digits";
        valid = false;
      }
      if (formRegister.numeroDocumento == "") {
        errors.user = islanguage
          ? "Ingrese el número de documento"
          : "Enter the document number";
        valid = false;
      }
    }

    if (valueCargo.size === 0) {
      errors.user = islanguage ? "Selecciona un cargo" : "Select a position";
      valid = false;
    }

    if (selectedKey === null) {
      errors.user = islanguage ? "Selecciona tu país" : "Choose your contry";
      valid = false;
    }

    if (formRegister.password == "" && formRegister.password.length > 5) {
      errors.user = islanguage
        ? "Debe ingresar una contraseña y debe ser mayor a 5 digitos"
        : "You must enter a password and it must be greater than 5 digits";
      valid = false;
    }

    if (formRegister.password !== formRegister.confirmPassword) {
      errors.user = islanguage
        ? "Las contraseñas no coinciden"
        : "Passwords do not match";
      valid = false;
    }
    if (!formRegister.telefono) {
      errors.user = islanguage
        ? "El telefono es requerido"
        : "The phone number is required";
      valid = false;
    }
    return { valid, errors };
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.user) {
      errors.user = "El usuario es obligatorio";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "La contraseña es obligatoria";
      valid = false;
    }

    return valid;
  };
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = () => {
      if (status === "authenticated") {
        // La sesión se ha actualizado
        const decodedRefresToken = jwt.decode(
          session?.user?.backendTokens?.refresToken
        );
        const n_nivel_acceso = decodedRefresToken?.n_nivel_acceso;
        if (n_nivel_acceso >= 10) {
          router.push("/suite");
        } else if (n_nivel_acceso >= 5) {
          router.push("/dashboard"); // Corrige la URL si es necesario
        } else if (n_nivel_acceso === 1) {
          toast.error(
            "Usuario con nivel de acceso muy bajo, ingresar al sistema correspondiente!"
          );
          router.push("/unauthorized");
          // signOut()
        } else {
          // router.push('/unauthorized'); // O cualquier otra ruta para acceso denegado
          const redirectUrl = `${window.location.pathname}?unauthorized=true`;
          router.push(redirectUrl);
        }
      }
    };

    fetchData(); // Llamar a la función async definida dentro del useEffect
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const res = await signIn("credentials", {
        username: formData.user,
        password: formData.password,
        id_sistemaSistema: idsSistema?.id || null,
        id_clienteSistema: idsSistema?.id_cliente || null,
        id_cliente: idsSistema?.id_cliente || null, // 👈 Aquí lo pasas
        redirect: false,
      });

      if (!res?.error) {
        toast.success("Bienvenido");
      } else {
        toast.error("Credenciales erróneas o usuario no autorizado al Geoportal");
      }
    }
  };

  const [islanguage, setIsLanguage] = useState(true);

  const [isForm, setIsForm] = useState(1);

  const handleRedirectChangePassword = () => {
    router.push("/authentication/forgot");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <>
        <Toaster richColors position="top-center" />
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="light"
            hidden={isForm !== 2 && isForm !== 3}
            isIconOnly
            onPress={() => {
              setIsForm(1);
            }}
          >
            <IconBack></IconBack>
          </Button>

          <Button
            className="mr-2"
            variant="light"
            aria-label="Like"
            onClick={() => setIsLanguage(!islanguage)}
          >
            <p className="underline text-xs">
              {!islanguage ? "English" : "Español"}
            </p>
          </Button>
        </div>

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <form
            action="/login"
            hidden={isForm == 2 || isForm == 3}
            className="px-8 py-3"
          >
            <div className="mb-6">
              <Input
                id="user"
                color="primary"
                name="user"
                type="text"
                label={islanguage ? "Usuario" : "User"}
                labelPlacement="outside"
                variant="bordered"
                placeholder="Ingrese su usuario"
                autoComplete="user"
                value={formData.user}
                onChange={handleInputChange}
                required
              />
            </div>
            <Spacer x={2}></Spacer>
            <div className="mb-6">
              <Input
                label={islanguage ? "Contraseña" : "Password"}
                labelPlacement="outside"
                variant="bordered"
                placeholder="Ingrese su contraseña"
                id="password"
                color="primary"
                name="password"
                autoComplete="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              fullWidth
              onClick={(e) => {
                handleSubmit(e);
              }}
              startContent={<UserIcon />}
            >
              {islanguage ? "Iniciar sesión" : "Log In"}
            </Button>
            <Spacer y={4}></Spacer>
            <div className="flex items-center justify-center flex-row gap-2">
              {/* <Button
                className="text-xs"
                variant="light"
                onClick={(e) => {
                  setIsForm(2);
                }}
              >
                <p className="underline">
                  {islanguage ? "Registrarse" : "Register"}
                </p>
              </Button> */}
              <Button
                className="text-xs"
                variant="light"
                onClick={handleRedirectChangePassword}
              >
                <p className="underline">
                  {islanguage
                    ? "Olvidaste tu contraseña"
                    : "Forgot your password"}
                </p>
              </Button>
            </div>
          </form>

          <form
            onSubmit={handleSubmitRegister}
            hidden={isForm == 1 || isForm == 3}
          >
            <div className="grid grid-cols-1 gap-4">
              <Input
                isRequired
                name="nombres"
                type="text"
                label={islanguage ? "Nombres" : "First Name"}
                placeholder={
                  islanguage ? "Ingrese sus nombres" : "Enter your first name"
                }
                value={formRegister.nombres}
                onChange={handleInputChangeRegister}
                required
              />
              <Input
                isRequired
                name="apellidos"
                type="text"
                label={islanguage ? "Apellidos" : "Last Name"}
                placeholder={
                  islanguage ? "Ingrese sus apellidos" : "Enter your last name"
                }
                value={formRegister.apellidos}
                onChange={handleInputChangeRegister}
                required
              />
              <Autocomplete
                label={islanguage ? "Selecciona tu pais" : "Choose your contry"}
                defaultItems={paises}
                color="primary"
                allowsCustomValue={true}
                onSelectionChange={onSelectionChange}
                onInputChange={onInputChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  isRequired
                  color="primary"
                  name="tipoDocumento"
                  label={islanguage ? "Tipo de Documento" : "Type of Document"}
                  placeholder="Seleccione el tipo de documento"
                  selectedKeys={value}
                  onSelectionChange={setValue}
                >
                  {tiposDocumento.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  isRequired
                  name="numeroDocumento"
                  type="number"
                  label={islanguage ? "N° de Documento" : "Number of Document"}
                  placeholder={
                    islanguage
                      ? "Ingrese su número de documento"
                      : "Enter your document number"
                  }
                  value={formRegister.numeroDocumento}
                  onChange={handleInputChangeRegister}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      return;
                    }
                    if (value.currentKey == "DNI") {
                      if (!/[0-9]/.test(e.key) || e.target.value.length >= 8) {
                        e.preventDefault();
                      }
                    }
                    if (value.currentKey == "RUC") {
                      if (!/[0-9]/.test(e.key) || e.target.value.length >= 11) {
                        e.preventDefault();
                      }
                    }
                  }}
                />
                <Input
                  isRequired
                  name="email"
                  type="email"
                  label={islanguage ? "Correo Electrónico" : "Email"}
                  placeholder={
                    islanguage
                      ? "Ingrese su correo electrónico"
                      : "Enter your email"
                  }
                  value={formRegister.email}
                  onChange={handleInputChangeRegister}
                  required
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "success"}
                  onValueChange={setValueMail}
                />
                <Input
                  name="telefono"
                  type="tel"
                  label={islanguage ? "Teléfono personal" : "Personal Phone"}
                  placeholder={
                    islanguage
                      ? "Ingrese su teléfono"
                      : "Enter your phone number"
                  }
                  value={formRegister.telefono}
                  onChange={handleInputChangeRegister}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      return;
                    }
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <Input
                  name="ocupacion"
                  type="text"
                  label={islanguage ? "Ocupación" : "Occupation"}
                  placeholder={
                    islanguage
                      ? "Ingrese su ocupación"
                      : "Enter your occupation"
                  }
                  value={formRegister.ocupacion}
                  onChange={handleInputChangeRegister}
                  required
                />
                <Input
                  name="institucion"
                  type="text"
                  label={
                    islanguage
                      ? "Institución donde Labora o estudia"
                      : "Institution where you work or study"
                  }
                  placeholder={
                    islanguage
                      ? "Ingrese su institución"
                      : "Enter your institution"
                  }
                  value={formRegister.institucion}
                  onChange={handleInputChangeRegister}
                  required
                />
                {/* <Input
                isRequired
                name="cargo"
                type="text"
                label={islanguage ? "Cargo" : "Position"}
                placeholder={
                  islanguage ? "Ingrese su cargo" : "Enter your position"
                }
                value={formRegister.cargo}
                onChange={handleInputChangeRegister}
                required
              /> */}
                <Textarea
                  name="motivacion"
                  label={islanguage ? "Motivacion" : "Motivation"}
                  placeholder={
                    islanguage
                      ? "Escriba su motivación o cargo en la institución"
                      : "Write your motivation or position in the institution."
                  }
                  rows={4}
                  value={formRegister.motivacion}
                  onChange={handleInputChangeRegister}
                  required
                />

                <Input
                  isRequired
                  name="password"
                  type="password"
                  label={
                    islanguage ? "Crea su contraseña" : "Create your password"
                  }
                  placeholder={
                    islanguage ? "Ingrese su contraseña" : "Enter your password"
                  }
                  value={formRegister.password}
                  onChange={handleInputChangeRegister}
                  required
                />
                <Input
                  isRequired
                  name="confirmPassword"
                  type="password"
                  label={
                    islanguage ? "Confirmar contraseña" : "Confirm password"
                  }
                  placeholder={
                    islanguage
                      ? "Confirme su contraseña"
                      : "Confirm your password"
                  }
                  value={formRegister.confirmPassword}
                  onChange={handleInputChangeRegister}
                  required
                />
              </div>
            </div>
            <Spacer y={4}></Spacer>
            <Button color="primary" type="submit">
              {islanguage ? "Registrarme" : "Register"}
            </Button>
          </form>
          <form
            onSubmit={handleSubmitReset}
            hidden={isForm == 1 || isForm == 2}
          >
            <Input
              name="email"
              type="email"
              label={islanguage ? "Correo Electrónico" : "Email"}
              placeholder={
                islanguage
                  ? "Ingrese su correo electrónico"
                  : "Enter your email"
              }
              required
              isInvalid={isInvalidRecovery}
              color={isInvalidRecovery ? "danger" : "success"}
              onValueChange={setValueEmail}
            />

            <Spacer y={4}></Spacer>
            <Button color="primary" type="submit" isLoading={isLoadingSend}>
              {islanguage ? "Enviar correo" : "Send email"}
            </Button>
          </form>
        </main>
      </>
    </div>
  );
}
