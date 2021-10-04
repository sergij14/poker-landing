import React from "react";
import { useAppContext } from "../context";

const Wrapper = ({ children }) => {
  const { font } = useAppContext();
  return (
    <div className={`bg-landing-bg font-bpg text-white fontF-${font}`}>
      {children}
    </div>
  );
};

export default Wrapper;
