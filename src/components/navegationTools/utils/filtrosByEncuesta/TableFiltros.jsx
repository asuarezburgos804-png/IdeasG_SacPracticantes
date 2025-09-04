import React, { useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip,
  Modal, Image, ModalContent, useDisclosure
} from "@nextui-org/react";
import { obteniendoFotosPreguntaEncuesta, obteniendoCoordenadasPreguntaEncuesta, crearReporteExcelEncuesta } from "@/app/services/espaciales/espaciales";
import IconPhoto from "@/icons/table/IconPhoto";
import IconLocation from "@/icons/table/IconLocation";
import IconSurveyFill from "@/icons/table/IconSurveyFill";
import IconFileExcel from "@/icons/tools/FileExcel";
import Arriba from "@/icons/tools/ControlCapasArriba";
import Abajo from "@/icons/tools/ControlCapasAbajo";
import ModalArchivos from "../archivos/ModalArchivos";
import { localizarPunto } from "../accionesEspaciales/localizarPunto";
import { toggleEncuestas } from "./expansion";
import environment from "@/config/enviroment";
import { eliminarRespuestasDuplicadas } from "./data";
import Icon198Download2 from "@/icons/table/IconDownload";

export default function TableFilterByEncuesta({ map, respuestasEncuestas }) {
  const url_backend = environment.url_backend;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [expandedEncuestas, setExpandedEncuestas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function getCoordinates(idRespuesta) {
    const coordenadas = await obteniendoCoordenadasPreguntaEncuesta(idRespuesta);
    const lon = parseFloat(coordenadas.x);
    const lat = parseFloat(coordenadas.y);
    const proj = "EPSG:4326";
    localizarPunto(lon, lat, proj, map,'',false);
  }

  function descargarExcel(dataEncuesta) {    
    dataEncuesta = eliminarRespuestasDuplicadas(dataEncuesta);
    console.log(dataEncuesta);
    crearReporteExcelEncuesta(dataEncuesta);
  }

  const handleImageClick = (foto) => {
    setSelectedImage(url_backend + foto);
    onOpen(true);
  };

  return (
    <div>
      {selectedImage && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <Image src={selectedImage} alt="Imagen ampliada" />
          </ModalContent>
        </Modal>
      )}
      <div className="flex flex-col">
        <ModalArchivos
          photos={photos}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {Object.entries(respuestasEncuestas).map(([idEncuesta, encuestaData]) => {
          const preguntasUnicas = Array.from(
            new Set(
              Object.values(encuestaData.respuestas)
                .flat()
                .map((pregunta) => pregunta.c_pregunta)
            )
          );

          return (
            <div key={idEncuesta} className="flex-col">
              <div className="flex items-center">
                <IconSurveyFill className="mr-2" />
                <div className="mr-2">{encuestaData.c_nombre_encuesta}</div>
                <Button
                  className="mr-2"
                  onPress={() => descargarExcel(encuestaData)}
                  isIconOnly
                  color="white"
                  endContent={<IconFileExcel />}
                />
                <button
                  onClick={() =>
                    toggleEncuestas(
                      idEncuesta,
                      expandedEncuestas,
                      setExpandedEncuestas
                    )
                  }
                >
                  {expandedEncuestas.some((item) => item === idEncuesta) ? (
                    <Abajo />
                  ) : (
                    <Arriba />
                  )}
                </button>
              </div>
              {expandedEncuestas.includes(idEncuesta) && (
                <>
                  <Table
                    aria-label={`Tabla de respuestas para ${encuestaData.c_nombre_encuesta}`}
                    css={{ marginTop: 10, marginBottom: 20 }}
                  >
                    <TableHeader>
                      {preguntasUnicas.map((pregunta, index) => (
                        <TableColumn key={pregunta}>{pregunta}</TableColumn>
                      ))}
                      <TableColumn key="acciones">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(encuestaData.respuestas).map(
                        ([idRespuesta, preguntas], rowIndex) => {
                          const respuestaMap = new Map();
                          preguntas.forEach((pregunta) => {
                            respuestaMap.set(pregunta.c_pregunta, {
                              respuesta: pregunta.c_respuesta,
                              tipo: pregunta.c_tipo,
                            });
                          });

                          return (
                            <TableRow key={idRespuesta}>
                              {preguntasUnicas.map((pregunta) => {
                                const respuestaObj = respuestaMap.get(pregunta);
                                return (
                                  <TableCell key={pregunta}>
                                    {respuestaObj
                                      ? renderizarCelda(
                                          respuestaObj.respuesta,
                                          respuestaObj.tipo
                                        )
                                      : "N/A"}
                                  </TableCell>
                                );
                              })}
                              <TableCell>
                                <div className="flex">
                                  <Tooltip content="Localizar">
                                    <Button
                                      onClick={() => getCoordinates(idRespuesta)}
                                      color="white"
                                      isIconOnly
                                      startContent={<IconLocation />}
                                    />
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  function renderizarCelda(respuesta, tipo) {
    switch (tipo) {
      case "PHOTO":
        return (
          <img
            onClick={() => handleImageClick(respuesta)}
            src={url_backend+respuesta}
            alt="Foto de la encuesta"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        );
      case "FILE":
        return (
          <Tooltip content="Abrir archivo">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => window.open(url_backend + respuesta, '_blank')}
            >
              <Icon198Download2 />
            </span>
          </Tooltip>
        );
      default:
        return respuesta;
    }
  }
}
