"use client";

import { useState } from "react";
import {
  Listbox,
  ListboxItem,
  Image,
  Card,
  Tabs,
  Tab,
  CardBody,
} from "@nextui-org/react";
import { baseMapOptions } from "./layers/baseMapOptions";
import { listLayers } from "./layers/MapTiles";
import IconGlobal from "@/icons/tools/MapaBase";
import ButtonMenu from "../dashboard/general/buttonMenu";
import { getListBaseMap } from "@/app/services/espaciales/espaciales";
import { cargaMapasBase } from "./layers/baseMapExternal";
import CustomModal from "../dashboard/general/customModal";

export default function BaseMap({ map, clienteConfig }) {
  const mapa = map;
  const [listBase, setListBase] = useState();
  const [listBaseExterna, setListBaseExterna] = useState();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["15"]));
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBaseMapChange = (event, type) => {
    mapa
      .getLayers()
      .getArray()
      .map((e, index) => {
        if (
          e.getProperties().type === "interno-basemap" ||
          e.getProperties().type === "externo-basemap"
        ) {
          console.log(e);
          console.log(index);
        }
      });
    const selectedBaseMapId = parseInt(event.target.value);
    setSelectedKeys(new Set([event.target.value.toString()]));
    listLayers.map((el) => {
      // console.log(el);
      if (
        selectedBaseMapId === el.getProperties().id &&
        type === el.getProperties().type
      ) {
        el.setVisible(true);
        el.setZIndex(-1); // Establecer el índice Z a un valor bajo para enviar al fondo
      } else {
        el.setVisible(false);
      }
    });
  };

  async function ChangeBaseMaps() {
    setIsModalOpen(true);
    let value = !isOpen;
    setIsOpen(value);
    const base = [];
    const baseExterna = [];
    const respuesta = await getListBaseMap();
    const baseMapExternal = cargaMapasBase(respuesta, mapa);
    baseMapExternal.map((item) => {
      listLayers.push(item.layer);
    });
    baseMapOptions.map((option) => {
      option.type = "interno-basemap";
      base.push(
        <ListboxItem
          key={option.id}
          value={option.id}
          aria-setsize={3}
          onPress={(key) => handleBaseMapChange(key, "interno-basemap")}
          textValue={option.name}
          className="flex items-center space-x-4 p-2"
        >
          <div className="flex items-center space-x-4">
            <Image width={50} src={option.img.src} alt={option.name} />
            <span>{option.name}</span>
          </div>
        </ListboxItem>
      );
    });
    baseMapExternal.map((option) => {
      option.type = "externo-basemap";
      baseExterna.push(
        <ListboxItem
          key={option.id}
          value={option.id}
          aria-setsize={3}
          onPress={(key) => handleBaseMapChange(key, "externo-basemap")}
          textValue={option.name}
          className="flex items-center space-x-4 p-2"
        >
          <div className="flex items-center space-x-4">
            {/* <Image width={50} src={option.img.src} alt={option.name} /> */}
            <span>{option.name}</span>
          </div>
        </ListboxItem>
      );
    });
    // console.log(base);
    setListBaseExterna(baseExterna);
    setListBase(base);
  }

  return (
    <>
      <CustomModal
        title="Mapa base"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialSize={{ width: 348, height: 473 }}
        maxHeight={473}
      >
        <div className="max-h-[381px]">
          <Tabs aria-label="Options">
            <Tab key="photos" title="Predeterminados">
              <Card>
                <CardBody>
                  <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                  >
                    {listBase}
                  </Listbox>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Otros">
              <Card>
                <CardBody>
                  <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                  >
                    {listBaseExterna}
                  </Listbox>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </CustomModal>

      <ButtonMenu
        onClick={() => ChangeBaseMaps()}
        icon={<IconGlobal />}
        name="Mapa base"
        color_principal={clienteConfig?.color_principal}
      />
    </>
  );
}
