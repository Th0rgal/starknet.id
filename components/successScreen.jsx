import Image from "next/image";
import React from "react";
import Button from "./button";

const SuccessScreen = ({ successButton, onClick, successMessage }) => {
  return (
    <div className="sm:w-2/3">
      <Image
        src="https://i.ibb.co/HhzL6JV/gigachad-chad.gif"
        height={400}
        width={236}
        alt="giga-chad"
      />
      <h1 className="sm:text-5xl text-5xl mt-2">{successMessage}</h1>
      <div className="mt-8 flex justify-center">
        <Button onClick={onClick}>{successButton}</Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
