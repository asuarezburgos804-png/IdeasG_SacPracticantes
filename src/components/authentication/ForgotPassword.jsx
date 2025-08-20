"use client";
import { EditIcon } from "@/icons/table/EditIcon";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const authenticate = await postAuthenticate(formData);
        if (authenticate.status == "success") {
          // await createTokenCookie(authenticate.token);
          // localStorage.setItem("token", authenticate.token);
          // toast.success(authenticate.message);
          // onCloseRef.current();
          // router.push("/dashboard");
          console.log("logeado");
        } else {
          toast.error(authenticate.message);
        }
      } catch (error) {
        toast.error("No se pudo autenticar, intente más tarde.");
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-1 flex-col overflow-hidden">
      <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <Image
          width={100}
          height={100}
          className="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none"
          src="/assets/beams-cover@95.jpg"
          alt="Imagen"
        />
        <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
          <div className="mb-8">
            <Image
              width={100}
              height={100}
              alt="Logo GOW"
              src="/assets/logo.png"
            />
          </div>
          <div className="max-w-sm">
            <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">
              Resetear tu contraseña
            </h1>
            <p className="mb-10 text-center text-sm">
              Ingresa el correo electrónico para enviar el enlace de reseteo de
              contraseña.
            </p>
          </div>

          <form action="/login" className="w-full max-w-sm">
            <div className="mb-6">
              <Input
                id="user"
                color="warning"
                name="user"
                type="text"
                label="Correo electrónico"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Ingrese su correo electrónico"
                autoComplete="user"
                value={formData.user}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              color="primary"
              fullWidth
              onClick={(e) => {
                handleSubmit(e);
              }}
              startContent={<EditIcon />}
            >
              Resetear contraseña
            </Button>
          </form>
        </div>

        <footer className="relative shrink-0">
          <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <p className="text-center sm:text-left">
              ¿Aún no tienes una cuenta?
            </p>
            <a
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
              href="/authentication/register"
            >
              <span>
                Registrarme <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
