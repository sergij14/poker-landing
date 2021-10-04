import React from "react";
import { ReactComponent as FBIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as INIcon } from "../assets/icons/instagram.svg";
import { useAppContext } from "../context";

const Footer = () => {
  const { text } = useAppContext();

  return (
    <div className="bg-landing-bgSecondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row py-16 lg:items-center lg:justify-between">
          <div className="flex flex-col order-3">
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/mima_live_poker/"
                rel="noreferrer"
                target="_blank"
                className="hover:opacity-80 focus:outline-none"
              >
                <INIcon fill="white" width="32" height="32" />
              </a>
              <a
                href="https://www.facebook.com/MiMaLivePoker"
                rel="noreferrer"
                target="_blank"
                className="hover:opacity-80 focus:outline-none"
              >
                <FBIcon fill="white" width="32" height="32" />
              </a>
            </div>
            <div className="mt-6">
              <p>© 2021, {text("landing.footer.copyright")}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 order-2 mb-6 lg:mb-0 lg:order-4">
            <button className="rounded-lg py-3 px-6 font-semibold uppercase bg-landing-primaryLight hover:bg-opacity-80 focus:outline-none focus:ring-2 ring-white ring-opacity-20">
              {text("landing.footer.terms")}
            </button>
            <button className="rounded-lg py-3 px-6 font-semibold uppercase bg-landing-primaryLight hover:bg-opacity-80 focus:outline-none focus:ring-2 ring-white ring-opacity-20">
              {text("landing.footer.privacy")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
