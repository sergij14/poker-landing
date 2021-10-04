import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useAppContext } from "../context";

const Header = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  // const [height, setHeight] = useState(null);
  const { text, lang, regSection } = useAppContext();

  const images = [
    {
      id: 1,
      url: "/images/landing/bg.jpg",
      bonus: "500%",
      bonusText: text("landing.header.h-1.text-1"),
      baseText: text("landing.header.h-1.text-2"),
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

  return (
    <div className="mx-auto overflow-hidden relative">
      <div className="absolute z-50 top-0 left-0 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center mt-8 mb-10 px-4">
          <div>
            <Link to="/">
              <img src="/images/landing/logo.png" alt="" />
            </Link>
          </div>
          <div className="flex space-x-3 bg-black bg-opacity-50 p-3 rounded-lg">
            <Link
              to="/ge"
              className={`${
                lang !== "ge" ? "opacity-30" : "opacity-80"
              } focus:outline-none cursor-pointer hover:opacity-100`}
            >
              <img
                alt=""
                src="/images/landing/georgia.svg"
                className="w-6 h-6"
              />
            </Link>
            <Link
              to="/"
              className={`${
                lang !== "en" ? "opacity-30" : "opacity-80"
              } focus:outline-none cursor-pointer hover:opacity-100`}
            >
              <img
                alt=""
                src="/images/landing/united-kingdom.svg"
                className="w-6 h-6"
              />
            </Link>
            <Link
              to="/ru"
              className={`${
                lang !== "ru" ? "opacity-30" : "opacity-80"
              } focus:outline-none cursor-pointer hover:opacity-100`}
            >
              <img
                alt=""
                src="/images/landing/russia.svg"
                className="w-6 h-6"
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        {...swipeHandlers}
        className="whitespace-nowrap transition-all duration-300 ease-linear"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-gray-800 w-full inline-block relative min-height-680 md:min-height-720 lg:min-height:920"
          >
            <img
              src={img.url}
              alt=""
              className="object-cover absolute top-0 left-0 w-full h-full filter brightness-50 sm:brightness-75"
            />
            <div className="absolute w-full z-10">
              <div className="max-w-7xl mx-auto whitespace-normal px-4">
                <div className="max-w-lg mt-44">
                  {img.id === 1 && (
                    <div>
                      <h4 className="text-4xl md:text-5xl font-black uppercase mt-3">
                        <span
                          className="leading-snug"
                          dangerouslySetInnerHTML={{ __html: img.baseText }}
                        />
                      </h4>
                    </div>
                  )}
                  {img.id === 2 && (
                    <div>
                      <span className="text-3xl md:text-4xl font-black uppercase">
                        {img.smallText}
                      </span>
                      <h4 className="text-4xl md:text-5xl font-black uppercase mt-3">
                        <span
                          className="leading-snug"
                          dangerouslySetInnerHTML={{ __html: img.bigText }}
                        />
                      </h4>
                    </div>
                  )}
                  {img.id === 3 && (
                    <div>
                      <h4 className="text-4xl font-black uppercase mt-3">
                        <span
                          className="leading-snug"
                          dangerouslySetInnerHTML={{ __html: img.bigText }}
                        />
                      </h4>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => regSection.scroll()}
                  className="px-6 rounded-lg py-4 text-xl bg-landing-orange hover:bg-landing-orangeLight mt-5 uppercase font-bold focus:outline-none focus:ring-2 ring-white ring-opacity-20"
                >
                  {text("landing.header.play-txt")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 z-20 w-full">
        <div className="mx-auto max-w-7xl flex space-x-4 px-4">
          {images.map((_, idx) => (
            <div
              onClick={() => setIndex(idx)}
              key={idx}
              className={`inline-block h-2 w-8 rounded-lg cursor-pointer mb-8 lg:mb-20 bg-white bg-opacity-40 ${
                index === idx && "bg-white bg-opacity-100"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
