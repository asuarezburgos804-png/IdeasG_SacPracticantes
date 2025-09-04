import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon as OlIcon } from "ol/style";
import { Icon } from "@iconify/react";

export default function GeoModal({
  isOpen,         // Estado de apertura del modal
  onClose,        // Handler para cerrar el modal
  c_x,            // Longitud inicial
  c_y,            // Latitud inicial
  readOnly,       // Si es true, deshabilita la edición
  handleConfirm,  // Handler de confirmación, recibe {c_x, c_y}
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerLayerRef = useRef(null); // Mantiene la capa de marcador
  const markerFeatureRef = useRef(null); // Mantiene el feature del marcador
  const clickListener = useRef(null);
  const [errors, setErrors] = useState({});
  // Estado local para las coordenadas
  const [localCoords, setLocalCoords] = useState({
    c_x: c_x || "",
    c_y: c_y || "",
  });

  // Sincroniza estado local al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setLocalCoords({
        c_x: c_x || "",
        c_y: c_y || "",
      });
      setErrors({});
    }
  }, [isOpen, c_x, c_y]);

  // Función para actualizar el marcador (feature)
  const updateMarker = (longitude, latitude) => {
    if (!mapInstance.current) return;
    // Si la capa de marcador no existe, créala y agrégala al mapa
    if (!markerLayerRef.current) {
      const markerSource = new VectorSource();
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      });
      markerSource.addFeature(markerFeature);
      const markerLayer = new VectorLayer({
        source: markerSource,
        style: new Style({
          image: new OlIcon({
            anchor: [0.5, 1],
            src: "https://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1",
          }),
        }),
      });
      mapInstance.current.addLayer(markerLayer);
      markerLayerRef.current = markerLayer;
      markerFeatureRef.current = markerFeature;
      // Solo al crear el marcador inicial, centra y ajusta el zoom
      mapInstance.current
        .getView()
        .setCenter(fromLonLat([longitude, latitude]));
      mapInstance.current.getView().setZoom(15);
    } else {
      // Si ya existe, solo actualiza la geometría del feature
      const markerFeature = markerFeatureRef.current;
      markerFeature.setGeometry(new Point(fromLonLat([longitude, latitude])));
      // Solo centra el mapa, no cambia el zoom
      mapInstance.current
        .getView()
        .setCenter(fromLonLat([longitude, latitude]));
    }
  };

  // Efecto para manejar el mapa
  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstance.current) {
      const newMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([
            localCoords.c_x && !isNaN(parseFloat(localCoords.c_x))
              ? parseFloat(localCoords.c_x)
              : -77.037526116,
            localCoords.c_y && !isNaN(parseFloat(localCoords.c_y))
              ? parseFloat(localCoords.c_y)
              : -11.823938246,
          ]),
          zoom: 15,
        }),
      });
      // Evento click
      const clickHandler = (evt) => {
        if (readOnly) return;
        const [longitude, latitude] = toLonLat(evt.coordinate);
        setLocalCoords({
          c_x: longitude.toString(),
          c_y: latitude.toString(),
        });
        updateMarker(longitude, latitude);
        setErrors((prev) => {
          const nxt = { ...prev };
          delete nxt.c_x;
          delete nxt.c_y;
          return nxt;
        });
      };
      clickListener.current = newMap.on("click", clickHandler);
      mapInstance.current = newMap;
      // Posicionar marcador inicial si hay coordenadas válidas
      if (
        localCoords.c_x &&
        localCoords.c_y &&
        !isNaN(parseFloat(localCoords.c_x)) &&
        !isNaN(parseFloat(localCoords.c_y))
      ) {
        updateMarker(parseFloat(localCoords.c_x), parseFloat(localCoords.c_y));
      }
    }
    return () => {
      if (mapInstance.current) {
        if (clickListener.current) {
          mapInstance.current.un("click", clickListener.current.listener);
        }
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
      // Limpiar capa y feature de marcador
      markerLayerRef.current = null;
      markerFeatureRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Actualizar marcador cuando cambian las coordenadas locales manualmente
  useEffect(() => {
    if (
      mapInstance.current &&
      localCoords.c_x &&
      localCoords.c_y &&
      !isNaN(parseFloat(localCoords.c_x)) &&
      !isNaN(parseFloat(localCoords.c_y))
    ) {
      updateMarker(parseFloat(localCoords.c_x), parseFloat(localCoords.c_y));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localCoords.c_x, localCoords.c_y]);

  // Manejar cambios en los inputs de coordenadas con validación
  const handleFieldChange = (e, fieldName) => {
    let { value } = e.target;
    value = value.replace(/[^0-9.\-]/g, "");
    value = value.replace(/-(?=.*-)/g, "");
    value = value.replace(/\.(?=.*\.)/g, "");
    if (value.includes("-") && !value.startsWith("-")) {
      value = "-" + value.replace(/-/g, "");
    }
    setLocalCoords((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const nxt = { ...prev };
        delete nxt[fieldName];
        return nxt;
      });
    }
  };

  // Manejar el botón de guardar
  const handleLocalConfirm = () => {
    setErrors({});
    handleConfirm({ ...localCoords });
    onClose();
  };

  // Manejar "Usar mi ubicación actual"
  const handleUseCurrentLocation = () => {
    if (readOnly) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocalCoords({
            c_x: longitude.toString(),
            c_y: latitude.toString(),
          });
          updateMarker(longitude, latitude);
          setErrors((prev) => {
            const nxt = { ...prev };
            delete nxt.c_x;
            delete nxt.c_y;
            return nxt;
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          let errorMessage =
            "No se pudo obtener la ubicación actual. Por favor, selecciona manualmente.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage =
              "Permiso de geolocalización denegado. Habilita los permisos en tu navegador.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage =
              "La ubicación no está disponible. Intenta de nuevo o selecciona manualmente.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Tiempo de espera agotado. Intenta de nuevo.";
          }
          setErrors({
            ...errors,
            general: errorMessage,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setErrors({
        ...errors,
        general: "La geolocalización no está soportada en este navegador.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Geolocalización de la vivienda
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                {/* Mapa */}
                <div
                  ref={mapRef}
                  className="h-[500px] rounded-lg overflow-hidden relative border border-default-100"
                />
                {/* Inputs de coordenadas */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Coordenadas</h3>
                    {errors.general && (
                      <p className="text-red-500 text-sm mb-4">
                        {errors.general}
                      </p>
                    )}
                    <div className="space-y-4">
                      <Input
                        label="X (Longitud)"
                        value={localCoords.c_x}
                        onChange={(e) => handleFieldChange(e, "c_x")}
                        variant="bordered"
                        isDisabled={readOnly}
                        isInvalid={!!errors.c_x}
                        errorMessage={errors.c_x}
                        startContent={
                          <Icon
                            icon="lucide:arrow-right"
                            className="text-default-400"
                          />
                        }
                        endContent={
                          <span className="text-default-400 text-xs">
                            grados
                          </span>
                        }
                      />
                      <Input
                        label="Y (Latitud)"
                        value={localCoords.c_y}
                        onChange={(e) => handleFieldChange(e, "c_y")}
                        variant="bordered"
                        isDisabled={readOnly}
                        isInvalid={!!errors.c_y}
                        errorMessage={errors.c_y}
                        startContent={
                          <Icon
                            icon="lucide:arrow-up"
                            className="text-default-400"
                          />
                        }
                        endContent={
                          <span className="text-default-400 text-xs">
                            grados
                          </span>
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-medium font-medium mb-2">Acciones</h3>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="bg-verdeVeci text-white"
                        variant="flat"
                        startContent={<Icon icon="lucide:crosshair" />}
                        onPress={handleUseCurrentLocation}
                        isDisabled={readOnly}
                      >
                        Usar mi ubicación actual
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onCloseModal}>
                Cancelar
              </Button>
              {!readOnly && (
                <Button
                  className="bg-verdeVeci text-white"
                  onPress={handleLocalConfirm}
                >
                  Guardar ubicación
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}