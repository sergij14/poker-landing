import React from "react";
import { useAppContext } from "../context";

const Wrapper = ({ children }) => {
  const { font } = useAppContext();
  return (
    <div className={`bg-landing-bg text-white font-${font}`}>{children}</div>
  );
};

export default Wrapper;
