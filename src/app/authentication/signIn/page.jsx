"use client";

import Login from "@/components/authentication/Login";
import ModalComponent from "@/components/geoportales/modelComponent";
import { useState } from "react";

const SignInPage = (props) => {
  const [isModalOpenForModule, setIsModalOpenForModule] = useState(true);
  const closeModalForModule = () => {
    setIsModalOpenForModule(false);
  };

  return (
    <ModalComponent
      isOpened={isModalOpenForModule}
      onClosed={closeModalForModule}
      title="Iniciar sesión"
    >
      <Login
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      ></Login>
    </ModalComponent>
  );
};

export default SignInPage;
