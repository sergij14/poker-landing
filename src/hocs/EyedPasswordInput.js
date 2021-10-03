import React, { useState } from "react";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";

export const EyedPasswordInput = ({ name, register, label }) => {
  const [passwordType, setPasswordType] = useState("password");

  const onEyeButtonClick = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
  return (
    <div className="relative">
      <input
        placeholder={label}
        type={passwordType}
        className="login-input"
        {...register(name)}
      />
      <div
        onClick={onEyeButtonClick}
        className="absolute right-0 top-0 m-4 cursor-pointer z-20 opacity-70 hover:opacity-100"
      >
        <EyeIcon fill="#a1a1a1" width="24" height="24" />
      </div>
      {passwordType === "password" && (
        <div
          className="absolute right-4 top-7 transform rotate-45 w-6 bg-red-300"
          style={{ height: "1px" }}
        ></div>
      )}
    </div>
  );
};
