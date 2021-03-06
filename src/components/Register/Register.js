import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

const Register = ({
  text,
  regSection,
  registered,
  handleSubmit,
  isSubmitting,
  onSubmit,
  basicFields,
  errors,
  register,
}) => {
  return (
    <div
      className="bg-cover py-12 sm:py-14 md:py-16 lg:py-18"
      style={{ backgroundImage: "url(/images/landing/bg-deals.svg)" }}
      ref={regSection.ref}
    >
      <div className="mx-auto max-w-7xl sm:px-4">
        <div className="flex flex-col space-y-7 lg:flex-row lg:space-x-8 lg:items-center">
          <div className="lg:w-2/5 px-4">
            <h4 className="text-3xl font-black mb-3">
              {text("landing.register.title")}
            </h4>
            <p className="text-lg">{text("landing.register.msg")}</p>
          </div>
          <div
            className={`bg-landing-bgSecondary sm:rounded-lg px-6 py-8 md:p-10 lg:w-3/5`}
          >
            <h5 className="text-3xl font-black">
              {registered
                ? text("landing.register.title-form-registered")
                : text("landing.register.title-form")}
            </h5>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`relative w-full ${
                registered || isSubmitting
                  ? "opacity-30 pointer-events-none"
                  : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-6">
                {basicFields.map(({ name, label, element }) => (
                  <div className="relative col-span-1" key={name}>
                    {element(name, register, label)}

                    <p className="pt-3 text-yellow-500">
                      {errors[name] && errors[name].message}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 rounded-lg py-4 bg-landing-orange hover:bg-landing-orangeLight mt-8 uppercase font-bold focus:outline-none focus:ring-2 ring-white ring-opacity-20"
              >
                {text("landing.register.btn")}
              </button>
              {isSubmitting && (
                <div className="absolute left-2/4 top-2/4 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader />
                </div>
              )}
            </form>
            <ToastContainer
              toastClassName="toast"
              closeOnClick
              autoClose={5000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              position="top-right"
              hideProgressBar={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
