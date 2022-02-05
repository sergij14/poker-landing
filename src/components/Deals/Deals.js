import React from "react";

const Deals = ({ regSection, text, deals }) => {
  return (
    <div
      className="bg-cover py-12 sm:py-14 md:py-16 lg:py-18"
      style={{ backgroundImage: "url(/images/landing/bg-deals.svg)" }}
    >
      <div className="mx-auto max-w-7xl sm:px-4">
        <h4 className="text-center text-3xl font-black mb-8">
          {text("landing.deals.title")}
        </h4>
        <div className="grid lg:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.title}
              className="relative sm:rounded-lg col-span-1 p-6 sm:p-10 bg-landing-bgSecondary bg-cover"
              style={{ backgroundImage: "url(/images/landing/gradient.svg)" }}
            >
              <div style={{ wordWrap: "break-word", maxWidth: "380px" }}>
                <h3 className="text-white uppercase font-bold text-2xl my-3">
                  {deal.title}
                </h3>
                <p className="opacity-80 my-3 text-base max-w-xs">
                  {deal.text}
                </p>
              </div>
              <div className="absolute z-0 top-0 right-0 m-10 hidden sm:block">
                <img src={deal.ico} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => regSection.scroll()}
            className="px-6 rounded-lg py-4 bg-landing-orange hover:bg-landing-orangeLight mt-5 uppercase font-bold focus:outline-none focus:ring-2 ring-white ring-opacity-20"
          >
            {text("landing.deals.get-text")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
