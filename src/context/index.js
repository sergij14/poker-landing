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
  const { langId } = useParams();
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
    if (langId) {
      i18next.changeLanguage(langId);
      setContext((prev) => ({ ...prev, lang: langId }));
    } else {
      i18next.changeLanguage("en");
      setContext((prev) => ({ ...prev, lang: "en" }));
    }

    if (langId === "ge") {
      setContext((prev) => ({ ...prev, font: "bodyGeo" }));
    } else {
      setContext((prev) => ({ ...prev, font: "body" }));
    }
  }, [langId]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
