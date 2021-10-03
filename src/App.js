import React from "react";
import "./styles/index.css";
import { ContextProvider } from "./Context";
import About from "./components/About";
import Deals from "./components/Deals";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./components/Register";
import Wrapper from "./components/Wrapper";

const App = () => {
  return (
    <ContextProvider>
      <Wrapper>
        <Header />
        <Deals />
        <About />
        <Register />
        <Footer />
      </Wrapper>
    </ContextProvider>
  );
};

export default App;
