import { useAppContext } from "../../context";
import About from "./About";

const AboutContainer = () => {
  const { text } = useAppContext();

  const info = [
    {
      title: text("landing.about.inf-1-title"),
      text: text("landing.about.inf-1"),
      ico: "/images/landing/ico-05.svg",
    },
    {
      title: text("landing.about.inf-2-title"),
      text: text("landing.about.inf-2"),
      ico: "/images/landing/ico-06.svg",
    },
    {
      title: text("landing.about.inf-3-title"),
      text: text("landing.about.inf-3"),
      ico: "/images/landing/ico-07.svg",
    },
  ];
  const props = {
    text,
    info,
  };
  return <About {...props} />;
};

export default AboutContainer;
