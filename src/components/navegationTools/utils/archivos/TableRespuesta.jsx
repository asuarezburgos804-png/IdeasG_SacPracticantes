
import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableCell,
    TableRow
} from "@nextui-org/react";

export const TableRespuesta = ({ data }) => {
  return (
        <Table
            className="w-full max-h-80 overflow-y-auto"
            removeWrapper
            aria-label="Example static collection table"
        >
            <TableHeader>
                <TableColumn className="text-xs font-semibold ">
                    Pregunta
                </TableColumn>
                <TableColumn className="text-xs font-semibold " align="right">
                    Respuesta
                </TableColumn>
            </TableHeader>
            <TableBody>
            {data.filter((item)=>item.c_tipo !== 'PHOTO' && item.c_tipo !== 'FILE').map((item,index)=>
                <TableRow key={index}>
                    <TableCell>{item.c_pregunta}</TableCell>
                    <TableCell>{item.c_respuesta}</TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    );
};