import React from "react";
import { useHistory } from "react-router";
import { useText } from "../context";

const Deals = () => {
  const history = useHistory();
  const t = useText();
  const deals = [
    {
      title: t("landing.deals.deal-1.title"),
      text: t("landing.deals.deal-1.text"),
      ico: "/images/landing/ico.svg",
    },
    {
      title: t("landing.deals.deal-2.title"),
      text: t("landing.deals.deal-2.text"),
      ico: "/images/landing/ico-02.svg",
    },
    {
      title: t("landing.deals.deal-3.title"),
      text: t("landing.deals.deal-3.text"),
      ico: "/images/landing/ico-03.svg",
    },
    {
      title: t("landing.deals.deal-4.title"),
      text: t("landing.deals.deal-4.text"),
      ico: "/images/landing/ico-04.svg",
    },
  ];
  return (
    <div
      className="bg-cover"
      style={{ backgroundImage: "url(/images/landing/bg-deals.svg)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h4 className="text-center text-3xl font-black my-16">
          {t("landing.deals.title")}
        </h4>
        <div className="grid lg:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.title}
              className="rounded-lg col-span-1 flex justify-between items-center p-10 bg-landing-bgSecondary bg-cover"
              style={{ backgroundImage: "url(/images/landing/gradient.svg)" }}
            >
              <div>
                <h3 className="text-white uppercase font-bold text-2xl my-3">
                  {deal.title}
                </h3>
                <p className="opacity-80 my-3 text-base max-w-xs">
                  {deal.text}
                </p>
              </div>
              <div className="flex justify-end">
                <img src={deal.ico} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-14 pb-24">
          <button
            onClick={() => history.push("/")}
            className="px-6 rounded-lg py-4 bg-landing-orange hover:bg-landing-orangeLight mt-5 uppercase font-bold focus:outline-none focus:ring-2 ring-white ring-opacity-20"
          >
            {t("landing.deals.get-text")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
