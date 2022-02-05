import React from "react";
import "./styles/index.css";

import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import { ContextProvider } from "./context";
import AboutContainer from "./components/About/AboutContainer";
import DealsContainer from "./components/Deals/DealsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import RegisterContainer from "./components/Register/RegisterContainer";

const App = () => {
  return (
    <ContextProvider>
      <Wrapper>
        <HeaderContainer />
        <DealsContainer />
        <AboutContainer />
        <RegisterContainer />
        <Footer />
      </Wrapper>
    </ContextProvider>
  );
};

export default App;
