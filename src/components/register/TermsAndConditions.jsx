import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Controller } from "react-hook-form";

export default function TermsAndConditionsModal({ isOpen, onClose, control }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} scrollBehavior="inside">
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalBody className="text-sm leading-6 text-justify space-y-4">
              <div className="max-w-4xl mx-auto px-6 py-10 bg-[#ffffff] shadow-xl rounded-2xl text-[#1f2937] space-y-6">
                <h1 className="text-3xl font-bold text-center text-[#1e3a8a]">
                  Términos y Condiciones de Uso de GLGIS Municipal
                </h1>
                <p className="text-sm text-center text-[#6b7280]">
                  Antes de registrarte en GLGIS Municipal, por favor lee
                  detenidamente los siguientes términos y condiciones. Al
                  continuar con el registro, aceptas estos términos y
                  condiciones en su totalidad.
                </p>

                <div className="space-y-4 text-justify">
                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      1. Aceptación de Términos
                    </h2>
                    <p>
                      Al crear una cuenta en la plataforma GLGIS Municipal, el
                      usuario acepta quedar sujeto a los presentes Términos y
                      Condiciones, así como a nuestras políticas de privacidad y
                      uso responsable del sistema.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      2. Uso de la Plataforma
                    </h2>
                    <p>
                      GLGIS Municipal está destinado exclusivamente para el uso
                      de entidades gubernamentales, personal autorizado y otros
                      actores vinculados a la gestión territorial y
                      planificación local. El acceso no autorizado, así como el
                      uso indebido de la información, está estrictamente
                      prohibido.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      3. Registro y Responsabilidad del Usuario
                    </h2>
                    <p>
                      El usuario se compromete a proporcionar información veraz,
                      actualizada y completa durante el proceso de registro. Es
                      responsable de mantener la confidencialidad de sus
                      credenciales de acceso y de toda actividad que ocurra bajo
                      su cuenta.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      4. Propiedad Intelectual
                    </h2>
                    <p>
                      Todos los contenidos, diseños, mapas, documentos,
                      herramientas y componentes del sistema son propiedad de
                      GLGIS Municipal o de sus respectivos titulares y están
                      protegidos por las leyes de propiedad intelectual. No está
                      permitido reproducir, distribuir o modificar estos
                      contenidos sin autorización previa.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      5. Privacidad y Protección de Datos
                    </h2>
                    <p>
                      La información personal registrada será tratada conforme a
                      la legislación vigente en materia de protección de datos
                      personales. GLGIS Municipal se compromete a proteger la
                      privacidad del usuario y no compartir su información con
                      terceros sin su consentimiento, salvo requerimiento legal.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      6. Disponibilidad y Soporte
                    </h2>
                    <p>
                      La plataforma estará disponible las 24 horas del día,
                      salvo interrupciones por mantenimiento o causas de fuerza
                      mayor. Se brindará soporte técnico a través del correo
                      electrónico{" "}
                      <a
                        href="mailto:soporte@glgismunicipal.com"
                        className="text-[#2563eb] underline"
                      >
                        soporte@glgismunicipal.com
                      </a>
                      .
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      7. Modificaciones
                    </h2>
                    <p>
                      GLGIS Municipal se reserva el derecho de modificar estos
                      términos y condiciones en cualquier momento. Las
                      modificaciones serán comunicadas oportunamente, y el uso
                      continuado de la plataforma después de dichas
                      modificaciones constituirá la aceptación de los nuevos
                      términos.
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold text-lg text-[#2563eb]">
                      8. Terminación del Servicio
                    </h2>
                    <p>
                      El incumplimiento de estos términos puede dar lugar a la
                      suspensión o cancelación de la cuenta del usuario, sin
                      perjuicio de otras acciones legales que pudieran
                      corresponder.
                    </p>
                  </section>

                  <p className="text-sm text-[#374151]">
                    Al hacer clic en <strong>Aceptar</strong>, confirmo que he
                    leído y comprendido los Términos y Condiciones de Uso, y
                    acepto cumplir con ellos.
                  </p>
                </div>
                <Controller
                  name="terminos_condiciones"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <label className="flex items-center gap-3 text-sm text-[#1e3a8a] font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-[#0070f3] rounded border border-gray-300 shadow-sm transition-all focus:ring-2 focus:ring-[#0070f3] focus:outline-none"
                        {...field}
                        checked={field.value}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          field.onChange(isChecked);
                          if (isChecked) onClose();
                        }}
                      />
                      Acepto los{" "}
                      <span className="underline text-[#0070f3] hover:text-[#0059c9]">
                        Términos y Condiciones
                      </span>
                    </label>
                  )}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
