"use client";
import { useRef } from "react";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { UserIcon } from "@/icons/UserIcon";
import Login from "../authentication/Login";

const Signin = ({ idsSistema }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onCloseRef = useRef();
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={onOpen}
        startContent={<UserIcon />}
        className="text-xs text-[#1445d1] text-[var(--color-secondary)] border-[var(--color-secondary)]"
      >
        Iniciar sesión
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            onCloseRef.current = onClose;
            return (
              <>
                <ModalBody>
                  <Login idsSistema={idsSistema}></Login>
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signin;
