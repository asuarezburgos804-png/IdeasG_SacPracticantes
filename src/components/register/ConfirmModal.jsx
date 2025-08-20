import { Modal, ModalContent, ModalBody } from "@nextui-org/react";

export default function ConfirmModal({ isOpen }) {
  return (
    <Modal hideCloseButton={true} isOpen={isOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="flex items-center justify-center bg-[#0f2f16]">
                <div className="max-w-xl w-full mx-auto bg-[#14532d] rounded-xl overflow-hidden border border-[#22c55e]">
                  <div className="mx-auto pt-12 pb-14 px-5 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-[#22c55e]/20">
                      <svg
                        viewBox="0 0 48 48"
                        height="100"
                        width="100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <linearGradient
                          id="SVGID_success"
                          x1="37.081"
                          x2="10.918"
                          y1="10.918"
                          y2="37.081"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#4ade80" />
                          <stop offset="0.5" stopColor="#86efac" />
                          <stop offset="1" stopColor="#dcfce7" />
                        </linearGradient>
                        <circle
                          fill="url(#SVGID_success)"
                          r="18.5"
                          cy="24"
                          cx="24"
                        ></circle>
                        <polyline
                          points="16.5,23.5 21.5,28.5 32,18"
                          stroke="#15803d"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <h4 className="text-3xl text-[#22c55e] font-semibold mb-5">
                      ¡Registro satisfactorio!
                    </h4>
                    <p className="text-[#bbf7d0] text-sm font-medium">
                      Revise su correo y espere que el administrador acepte su
                      solicitud.
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
