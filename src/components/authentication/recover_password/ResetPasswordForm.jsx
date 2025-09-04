"use client";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Spinner, Chip } from "@nextui-org/react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { postCambiarPasswordConToken } from "@/app/services/security/register";
import { EyeIcon } from "@/icons/social/EyeIcon";
import { EyeOffIcon } from "@/icons/social/EyeOffIcon";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Watch para validación en tiempo real
  const watchPassword = watch("password", "");

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

  const handleChangePassword = async (data) => {
    setLoading(true);
    setMensaje("");
    setError("");

    try {
      const payload = {
        token: token,
        nuevaContrasena: data.password,
      };
      const response = await postCambiarPasswordConToken(payload);
      setMensaje("Contraseña actualizada correctamente");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.log("Error al cambiar la contraseña:", err);
      // Capturar el mensaje de error específico
      const errorMessage = err.message || "Error al cambiar la contraseña. Inténtalo nuevamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-4">
      <div className="w-full max-w-md bg-[#ffffff] p-6 rounded-2xl shadow-md border border-[#d1d5db]">
        <h2 className="text-xl font-bold mb-4 text-center text-[#2563eb]">
          Restablecer contraseña
        </h2>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="password"
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
              <div className="flex flex-col gap-2">
                <Input
                  {...field}
                  label="Nueva contraseña"
                  size="lg"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su nueva contraseña"
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
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
                  classNames={{
                    label: "font-bold",
                    input: "font-light text-xs",
                  }}
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
            name="confirmPassword"
            control={control}
            rules={{
              validate: (value) =>
                value === getValues("password") ||
                "Las contraseñas no coinciden",
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirmar contraseña"
                size="lg"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirme su nueva contraseña"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="focus:outline-none"
                  >
                    {showConfirm ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                }
                classNames={{
                  label: "font-bold",
                  input: "font-light text-xs",
                }}
              />
            )}
          />

          <Button
            type="submit"
            className="bg-[#2563eb] text-white"
            isDisabled={loading}
          >
            {loading ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Cambiar contraseña"
            )}
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
