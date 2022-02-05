import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useAppContext } from "../../context";
import Header from "./Header";

const HeaderContainer = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  // const [height, setHeight] = useState(null);
  const { text, lang, regSection, setLangAndFont } = useAppContext();

  const images = [
    {
      id: 1,
      url: "/images/landing/bg.jpg",
      smallText: text("landing.header.h-1.text-1"),
      bigText: text("landing.header.h-1.text-2"),
    },
    {
      id: 2,
      url: "/images/landing/bg-02.png",
      smallText: text("landing.header.h-2.text-1"),
      bigText: text("landing.header.h-2.text-2"),
    },
    {
      id: 3,
      url: "/images/landing/bg-03.png",
      smallText: text("landing.header.h-3.text-1"),
      bigText: text("landing.header.h-3.text-2"),
    },
  ];

  const languages = ["ge", "en", "ru"];

  const delay = 4500;
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ),
    onSwipedRight: () =>
      index !== 0 ? setIndex(index - 1) : setIndex(images.length - 1),
  });

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => resetTimeout();
  }, [index]); //eslint-disable-line

  // useEffect(() => {
  //   setHeight(contentRef.current.getBoundingClientRect().height);
  // }, [])

  const props = {
    text,
    lang,
    regSection,
    setLangAndFont,
    languages,
    swipeHandlers,
    images,
    index,
    setIndex,
  };
  return <Header {...props} />;
};

export default HeaderContainer;
