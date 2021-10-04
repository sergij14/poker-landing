import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const AppContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const ContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const regSectionRef = useRef();

  const initContext = {
    lang: "",
    font: null,
    text: t,
    regSection: {
      ref: regSectionRef,
      scroll() {
        regSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
  };

  const [context, setContext] = useState(initContext);

  useEffect(() => {
    if (id) {
      i18next.changeLanguage(id);
      setContext((prev) => ({ ...prev, lang: id }));
    } else {
      i18next.changeLanguage("en");
      setContext((prev) => ({ ...prev, lang: "en" }));
    }
  }, [id]);

  useEffect(() => {
    if (context.lang === "ge") {
      setContext((prev) => ({ ...prev, font: "bodyGeo" }));
    } else {
      setContext((prev) => ({ ...prev, font: "body" }));
    }
  }, [context.lang]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
