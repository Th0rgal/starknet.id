import Image from "next/image";
import React from "react";
import Button from "./button";

const ErrorScreen = ({ errorButton, onClick }) => {
  return (
    <>
      <Image
        src="https://i.ibb.co/PWQkkN9/error-Meme.gif"
        height={227}
        width={270}
        alt="error meme"
      />
      <h1 className="sm:text-5xl text-5xl mt-4">
        Shit ... an error occurred !
      </h1>
      <Button onClick={onClick}>{errorButton}</Button>
    </>
  );
};

export default ErrorScreen;
