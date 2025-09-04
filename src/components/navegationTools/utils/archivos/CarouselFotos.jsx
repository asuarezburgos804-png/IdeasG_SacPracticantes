import React, { useState, useEffect } from "react";
import {
  Modal,
  Image,
  ModalContent,
  useDisclosure,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { DeleteIcon } from "@/icons/table/DeleteIcon";
import IconCheckCircle from "@/icons/checkIcon";
import {
  fetchDeleteFotoFicha,
  putUpdateIsPrincipal,
} from "@/app/services/individual/individual";
import { Toaster, toast } from "sonner";

const CarouselFotos = ({ urlFoto, loadPhoto, idFicha }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // No necesitas 'onOpenChange' directamente aquí
  const [currentIndex, setCurrentIndex] = useState(0);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urlFoto.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === urlFoto.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleImageClick = (foto) => {
    setSelectedImage(foto);
    onOpen(); // Abre el modal
  };

  const handleDelete = async (idFoto) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta foto? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        console.log(idFoto);

        let res = await fetchDeleteFotoFicha(idFoto);

        if (res.status == "success") {
          toast.success("La foto ha sido eliminada satisfactoriamente...");
          if (loadPhoto) {
            await loadPhoto();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error, intente más tarde...");
      }
    } else {
      toast.success("Eliminación cancelada");
    }
  };
  const handleSetPrincipal = async (idFoto) => {
    const confirmSetPrincipal = window.confirm(
      "¿Deseas establecer esta foto como principal?"
    );

    if (confirmSetPrincipal) {
      try {
        const body = {
          id_ficha: idFicha,
          id_foto: idFoto,
        };

        console.log(body);

        let res = await putUpdateIsPrincipal(body);

        if (res.status == "success") {
          toast.success("La foto ha sido marcada como principal...");
          if (loadPhoto) {
            await loadPhoto(); // Recargar fotos
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Error al actualizar la foto principal, intente más tarde..."
        );
      }
    } else {
      toast.success("Actualización cancelada");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <div className="relative w-4/5 mx-auto mt-0.5">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {urlFoto.map((foto, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0  flex flex-col items-center  justify-around"
              >
                <div className="flex gap-1 items-center ">
                  {foto.b_principal ? (
                    <div className="text-xs text-primary text-center">
                      Es Principal
                    </div>
                  ) : (
                    <div className="text-xs text-primary text-center">
                      No es Principal
                    </div>
                  )}
                  <div className="flex gap-1">
                    <Tooltip
                      content={
                        <div className="text-xss font-light">Eliminar foto</div>
                      }
                      color="danger"
                    >
                      <Button
                        size="sm"
                        color="danger"
                        isIconOnly
                        onClick={() => handleDelete(foto.id_foto)}
                        startContent={<DeleteIcon />}
                      ></Button>
                    </Tooltip>
                    <Tooltip
                      content={
                        <div className="text-xss font-light">
                          Hacer foto principal
                        </div>
                      }
                      color="success"
                    >
                      <Button
                        size="sm"
                        color="success"
                        isIconOnly
                        onClick={() => handleSetPrincipal(foto.id_foto)}
                        startContent={<IconCheckCircle />}
                      ></Button>
                    </Tooltip>
                  </div>
                </div>
                <img
                  onClick={() => handleImageClick(foto.img_foto)}
                  src={foto.img_foto}
                  alt={`Slide ${index + 1}`}
                  className="object-cover mx-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-full focus:outline-none"
          onClick={prevSlide}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-black bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-full focus:outline-none"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>

      {selectedImage && (
        <Modal
          size="full"
          onClose={onClose} // Maneja el cierre del modal
          isOpen={isOpen}
        >
          <ModalContent>
            <Image src={selectedImage} alt={selectedImage} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CarouselFotos;
