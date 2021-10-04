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

  const setLangAndFont = async (langId) => {
    await i18next.changeLanguage(langId);
    setContext((prev) => ({
      ...prev,
      lang: langId,
      font: langId === "ge" ? "bpg_arial" : "inter",
    }));
  };

  useEffect(() => {
    if (langId) {
      setLangAndFont(langId);
    } else {
      setLangAndFont("en");
    }
  }, [langId]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
