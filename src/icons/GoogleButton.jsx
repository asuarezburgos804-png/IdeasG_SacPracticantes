import { Button } from "@nextui-org/react";
// import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton(props) {
  return (
    <div className="group relative flex w-full justify-center">
      <Button
        color="primary"
        fullWidth
        onClick={() => signIn("google")}
        startContent={
          <Image
            src="google.svg"
            width={24}
            height={24}
            alt="google"
            className="object-contain"
          />
        }
      >
        {props.title}
      </Button>
    </div>
  );
}
