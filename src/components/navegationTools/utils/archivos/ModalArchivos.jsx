import React, { useState, useEffect, useRef } from "react";
import { Modal,Button,Image,ModalContent,useDisclosure } from "@nextui-org/react";
import environment from "@/config/enviroment";
import ButtonMenu from "@/components/dashboard/general/buttonMenu";
import CustomModal from "@/components/dashboard/general/customModal";
import Dibujar from "@/icons/tools/Dibujar";
import CarouselImagen from "./CarruselImagen";
import FileList from "./ListFile";

export default function ModalArchivos({ isModalOpen, setIsModalOpen, photos}) {
    for (let index in photos) {
        const element = photos[index];
        element.imagen = element.img64;
        element.titulo = element.c_pregunta;
    }
    return(
        <CustomModal
            title="Dibujar"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialSize={{ width: 348, height: 473 }}
            maxHeight={473}
        >
            {
                photos?.length>0?<CarouselImagen photos={photos}/>:
                <>
                    No existen fotos en esta respuesta!
                </>
            }
        </CustomModal>
    );
};
