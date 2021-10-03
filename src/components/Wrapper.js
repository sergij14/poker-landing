import React from "react";
import { useFont } from "../context";

const Wrapper = ({ children }) => {
  const font = useFont();
  return (
    <div className={`bg-landing-bg text-white font-${font}`}>{children}</div>
  );
};

export default Wrapper;
