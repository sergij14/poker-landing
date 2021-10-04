import React, { useContext, useState, useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const AppContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const ContextProvider = ({ children }) => {
  const { t } = useTranslation();

  const regSectionRef = useRef();

  const initContext = {
    lang: "en",
    font: "inter",
    text: t,
    regSection: {
      ref: regSectionRef,
      scroll() {
        regSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    setLangAndFont: async (langId) => {
      await i18next.changeLanguage(langId);
      setContext((prev) => ({
        ...prev,
        lang: langId,
        font: langId === "ge" ? "bpgarial" : "inter",
      }));
    },
  };

  const [context, setContext] = useState(initContext);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
