import React, { useEffect } from "react";
import { useAppContext } from "../context";

const Wrapper = ({ children }) => {
  const { font, setLangAndFont } = useAppContext();
  useEffect(() => {
    setLangAndFont("en");
  }, []); //eslint-disable-line
  return (
    <div
      className="bg-landing-bg font-bpg text-white"
      style={{
        fontFamily: `${font}`,
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
