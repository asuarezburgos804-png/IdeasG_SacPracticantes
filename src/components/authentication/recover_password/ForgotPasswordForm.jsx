"use client";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { postSolicitarRecuperacionPassword } from "@/app/services/security/register";

export default function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleSolicitud = async () => {
    setLoading(true);
    setMensaje(null);
    setError(null);
    try {
      const response = await postSolicitarRecuperacionPassword({ correo: email });
      setMensaje(response.mensaje);
    } catch (error) {
      setError(error.message); // "No se encontró ningún usuario con ese correo."
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4">
      <div className="w-full max-w-md bg-[#ffffff] p-6 rounded-2xl shadow-md border border-[#d1d5db]">
        <h2 className="text-xl font-bold mb-4 text-center text-[#2563eb]">
          Recuperar Contraseña
        </h2>

        <form
          onSubmit={handleSubmit(handleSolicitud)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no válido",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Correo electrónico"
                type="email"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  label: " text-[#1f2937]",
                  input: "text-sm text-[#111827]",
                }}
              />
            )}
          />

          <Button
            type="submit"
            className="bg-[#2563eb] text-white"
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" color="white" /> : "Enviar enlace"}
          </Button>

          {mensaje && (
            <div className="text-sm text-[#15803d] bg-[#dcfce7] p-3 rounded-md border border-[#bbf7d0]">
              ✅ {mensaje}
            </div>
          )}

          {error && (
            <div className="text-sm text-[#b91c1c] bg-[#fee2e2] p-3 rounded-md border border-[#fecaca]">
              ❌ {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
