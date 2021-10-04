import React from "react";
import { useAppContext } from "../context";

const About = () => {
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
  return (
    <div className="bg-landing-bgTertiary py-20">
      <div className="mx-auto max-w-7xl sm:px-4">
        <h4 className="text-center text-3xl font-black mb-10">
          {text("landing.about.title")}
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {info.map((info) => (
            <div
              key={info.title}
              className="sm:rounded-lg col-span-1 p-6 sm:p-10 bg-landing-bgSecondary"
            >
              <div className="flex h-24 justify-center my-10">
                <img src={info.ico} alt="" />
              </div>
              <h4 className="text-xl font-bold">{info.title}</h4>
              <p className="mt-3">{info.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
