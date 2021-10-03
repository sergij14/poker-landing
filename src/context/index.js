import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const LangContext = React.createContext();
const TextContext = React.createContext();
const FontContext = React.createContext();

export const useLang = () => {
   return useContext(LangContext);
}

export const useText = () => {
  return useContext(TextContext);
}

export const useFont = () => {
  return useContext(FontContext);
}

export const ContextProvider = ({ children }) => {
  const [lang, setLang] = useState("");
  const [font, setFont] = useState(null);
  const params = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    if (params.id) {
      i18next.changeLanguage(params.id);
      setLang(params.id);
    } else {
      i18next.changeLanguage("en");
      setLang("en");
    }
  }, [params.id]);
  useEffect(() => {
    if(lang === 'ge'){
      setFont("bodyGeo");
    } else {
      setFont("body")
    }
  }, [lang])
  return(
      <LangContext.Provider value={lang}>
        <TextContext.Provider value={t}>
         <FontContext.Provider value={font}>
         {children}
         </FontContext.Provider>
        </TextContext.Provider>
      </LangContext.Provider>
  )
};
