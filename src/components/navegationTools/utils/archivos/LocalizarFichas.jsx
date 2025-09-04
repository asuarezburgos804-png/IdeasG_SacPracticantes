
import React, { useState, useEffect, useRef, useContext }  from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableCell,
    TableRow,
    Button
} from "@nextui-org/react";
import { MapProviderContext } from "@/components/mapa/context/MapContainerProvider";

export const LocalizarFichas = ({ data }) => {

    
    const { datosUnicat, setDatosUnicat, changeClickFicha, setChangeClickFicha} = useContext(MapProviderContext) || {};
    function localizarFicha() {
        console.log(data);
        setDatosUnicat(
            {
                "id_sector": data[0].id_sector,
                "id_manzana": data[0].id_manzana,
                "id_lote": data[0].id_lote,
                "c_cod_sector": data[0].c_cod_sector,
                "c_cod_mzna": data[0].c_cod_mzna,
                "c_cod_lote": data[0].c_cod_lote,
            }
        )
        const boolean = !changeClickFicha;
        setChangeClickFicha(boolean);
    }
    return (
        <>
            <Button
                onPress={()=>localizarFicha()}
                // className="mb-4"
                color="success"
            >
                LocalizarFicha
            </Button>
            {/* <Table
                className="w-full max-h-80 overflow-y-auto"
                removeWrapper
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn className="text-xs font-semibold ">
                        SML
                    </TableColumn>
                    <TableColumn className="text-xs font-semibold " align="right">
                        Unicat
                    </TableColumn>
                </TableHeader>
                <TableBody>
                {data.filter((item)=>item.c_tipo !== 'PHOTO' && item.c_tipo !== 'FILE').map((item,index)=>
                    <TableRow key={index}>
                        <TableCell>{item.c_cod_sector + item.c_cod_mzna + item.c_cod_lote}</TableCell>
                        <TableCell>{item.id_unicat}</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table> */}
        </>
    );
};