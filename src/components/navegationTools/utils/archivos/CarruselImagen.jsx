import React, { useState, useEffect, useRef } from "react";
import { Modal, Image, ModalContent, useDisclosure } from "@nextui-org/react";
import environment from "@/config/enviroment";

const Carousel = ({ data }) => {
  const photos = data;
  const url_backend = environment.url_backend;
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const intervalRef = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
        stopAutoPlay();
      };
    }
  }, []);

  const handleImageClick = (foto) => {
    setSelectedImage(url_backend + foto);
    onOpen(true);
  };

  return (
    <>
      <div className="relative w-4/5 mx-auto mt-0.5">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 bg-black flex flex-col items-center justify-center"
              >
                <div className="text-center text-white mb-2">
                  <p>{photo.c_pregunta}</p> {/* Aquí se muestra la pregunta como título */}
                </div>
                <img
                  onClick={() => handleImageClick(photo.imagen)}
                  src={url_backend + photo.imagen}
                  alt={`Slide ${index + 1}`}
                  className="object-cover max-w-[100px] max-h-[100px] mx-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-full focus:outline-none"
          onClick={prevSlide}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-900 px-4 py-2 rounded-full focus:outline-none"
          onClick={nextSlide}
        >
          {">"}
        </button>
      </div>

      {selectedImage && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <Image src={selectedImage} alt="Imagen ampliada" />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Carousel;
