import React, { useEffect, useState } from "react";
import IconArrowLeftSquareFill from "@/icons/table/IconArrowLeftSquareFill";
import IconArrowRightSquareFill from "@/icons/table/IconArrowRightSquareFill";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableCell,
    TableRow,
    Autocomplete,
    AutocompleteItem,
    Pagination,
    Button,
    Divider
} from "@nextui-org/react";
import CarouselImagen from "../archivos/CarruselImagen";
import ListFile from "../archivos/ListFile";
import IconPhoto from "@/icons/table/IconPhoto";
import IconFile from "@/icons/table/IconFile";
import Arriba from "@/icons/tools/ControlCapasArriba";
import Abajo from "@/icons/tools/ControlCapasAbajo";
import { toggleEncuestas, toggleEncuestasArchivos } from "../filtrosByEncuesta/expansion";
import IconSurveyFill from "@/icons/table/IconSurveyFill";
import { TableRespuesta } from "../archivos/TableRespuesta";
import { LocalizarFichas } from "../archivos/LocalizarFichas";
import IconFileText from "@/icons/table/FileText";

export default function PopupTable({ datosTabla, map }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(10);
    const [value, setValue] = React.useState("0");
    const [expandedEncuestasArchivos, setExpandedEncuestasArchivos] = useState(['tabla']);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  
    React.useEffect(() => {
        if (datosTabla.length > 0) {
            const newTotalPages = datosTabla[0].dataConAlias.length;
            setTotalPages(newTotalPages);
        }
    }, [datosTabla]);
  
    React.useEffect(() => {
        if (datosTabla.length > 0 && value) {
            const newTotalPages = datosTabla[value].dataConAlias.length;
            setTotalPages(newTotalPages);
            setCurrentPage(1);
        }
    }, [value]);
    
    function botonAnterior() {
        const valueInt = parseInt(value);
        if (valueInt - 1 >= 0) setValue((valueInt - 1).toString());
    }
  
    function botonSiguiente() {
        const valueInt = parseInt(value);
        if (valueInt + 1 <= datosTabla.length - 1) setValue((valueInt + 1).toString());
    }

    function retornarArchivos(archivos) {
        // console.log(archivos);
        const renderSection = (key, title, IconComponent, ContentComponent, value) => (
            <div key={key} className="mt-4 w-full">
                <div className="flex items-center">
                    <IconComponent className="mr-2" />
                    <div className="mr-2">{title}</div>
                    <button
                        onClick={() =>
                            toggleEncuestas(key, expandedEncuestasArchivos, setExpandedEncuestasArchivos)
                        }
                    >
                        {expandedEncuestasArchivos.includes(key) ? <Abajo /> : <Arriba />}
                    </button>
                </div>
                {expandedEncuestasArchivos.includes(key) && (
                    <div className="mt-2">
                        {Array.isArray(value) && value.length > 0 ? (
                            <ContentComponent data={value} />
                        ) : (
                            <p>No tiene {title.toLowerCase()}</p>
                        )}
                    </div>
                )}
                <Divider className="mt-4" />
            </div>
        );
        return (
            <div className="flex flex-col items-start w-full">
                {archivos && Object.entries(archivos).map(([key, value], index) => {
                    switch (key) {
                        case 'respuestaEncuesta':
                            return renderSection(key, 'Respuestas Encuesta', IconSurveyFill, TableRespuesta, value);
                        case 'imagen':
                            return renderSection(key, 'Imágenes', IconPhoto, CarouselImagen, value);
                        case 'localizarFicha':
                            return renderSection(key, 'Localizar Fichas', IconFileText, LocalizarFichas, value);
                        case 'archivo':
                            return renderSection(key, 'Archivos', IconFile, ListFile, value);
                        default:
                            return null;
                    }
                })}
            </div>
        );
    }

    const popupContent = () => {
        if (!map.popupGeneral) {
            return <></>;
        }
        if (datosTabla.length === 0) {
            return <>No se encontraron datos!</>;
        }
        return (
            <div className="w-full">
                <div className="flex items-center space-x-4">
                    <Button isIconOnly onPress={() => botonAnterior()} color="success" aria-label="Like" className="h-10 w-10">
                        <IconArrowLeftSquareFill />
                    </Button>
                    <Autocomplete
                        defaultItems={datosTabla.map((item, index) => ({ 
                            titulo: item.titulo, 
                            pertenece: item.pertenece, 
                            id_capa: item.id_capa,
                            index // Incluye el índice en los datos
                        }))}
                        className="w-60 h-10 flex items-center" // Ajusta el ancho y la altura
                        defaultSelectedKey={"0"}
                        selectedKey={value}
                        onSelectionChange={setValue}
                    >
                        {(item) => (
                            <AutocompleteItem
                                key={item.index} // Usa el índice como clave
                                className="whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                {item.titulo}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                    <Button isIconOnly onPress={() => botonSiguiente()} color="success" aria-label="Like" className="h-10 w-10">
                        <IconArrowRightSquareFill />
                    </Button>
                </div>
                <Divider className="mt-4 mb-4"/>
                <div className="mt-4 w-full">
                  <div className="flex items-center">
                      <IconSurveyFill className="mr-2" />
                      <div className="mr-2">Campos</div>
                      <button
                          onClick={() =>
                              toggleEncuestas(
                                  'tabla',
                                  expandedEncuestasArchivos,
                                  setExpandedEncuestasArchivos
                              )
                          }
                      >
                          {expandedEncuestasArchivos.some((item) => item === 'tabla') ? (
                              <Abajo />
                          ) : (
                              <Arriba />
                          )}
                      </button>
                  </div>
                  {expandedEncuestasArchivos.includes('tabla') && (
                    <Table
                        className="w-full max-h-80 overflow-y-auto"
                        removeWrapper
                        aria-label="Example static collection table"
                    >
                        <TableHeader>
                            <TableColumn className="text-xs font-semibold ">
                                Propiedad
                            </TableColumn>
                            <TableColumn className="text-xs font-semibold " align="right">
                                Valor
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(datosTabla[value]?.dataConAlias[currentPage-1] ?? {}).map(([key, value], index) => (
                                <TableRow key={index}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  )}
                  <Divider className="mt-4"/>
              </div>
                <div className="flex flex-col items-start mt-4">
                    {datosTabla[value]?.Archivos && retornarArchivos(datosTabla[value].Archivos[currentPage-1])}
                </div>
                <Pagination
                    color="success"
                    showControls
                    total={totalPages}
                    initialPage={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        );
    };

    return <>{popupContent()}</>;
}
