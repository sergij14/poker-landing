import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context";
import { useForm } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createCustomerDoc } from "../firebase";
import Loader from "./Loader";
import { EyedPasswordInput } from "./hocs/EyedPasswordInput";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const regBtnRef = useRef();
  const { text, regSection, lang } = useAppContext();

  const notify = (text) => toast(text);

  const schema = Yup.object().shape({
    first_name: Yup.string().required(
      text(`landing.register.inputs.first_name`) +
        " " +
        text("landing.register.inputs.errors.required")
    ),
    last_name: Yup.string().required(
      text(`landing.register.inputs.last_name`) +
        " " +
        text("landing.register.inputs.errors.required")
    ),
    username: Yup.string().required(
      text(`landing.register.inputs.username`) +
        " " +
        text("landing.register.inputs.errors.required")
    ),
    email: Yup.string()
      .required(
        text(`landing.register.inputs.email`) +
          " " +
          text("landing.register.inputs.errors.required")
      )
      .email(text("landing.register.inputs.errors.pattern")),
    password: Yup.string()
      .required(
        text(`landing.register.inputs.password`) +
          " " +
          text("landing.register.inputs.errors.required")
      )
      .min(6, text("landing.register.inputs.errors.pass-val-chars"))
      .max(30, text("landing.register.inputs.errors.pass-val-chars"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{6,}$/,
        text("landing.register.inputs.errors.pass-val")
      ),
    confirm_password: Yup.string()
      .required(
        text(`landing.register.inputs.confirm_password`) +
          " " +
          text("landing.register.inputs.errors.required")
      )
      .min(6, text("landing.register.inputs.errors.pass-val-chars"))
      .max(30, text("landing.register.inputs.errors.pass-val-chars"))
      .oneOf(
        [Yup.ref("password"), null],
        text("landing.register.inputs.errors.pass-match")
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    Object.keys(errors).length && regBtnRef.current?.click();
  }, [lang]); //eslint-disable-line

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = { ...data };
    const dateObj = new DateObject(formData.birth_date);
    formData.birth_date = dateObj.format(DATE_FORMAT);
    try {
      await createCustomerDoc(
        formData,
        text("landing.register.inputs.errors.email")
      );
      setRegistered(true);
      setIsSubmitting(false);
    } catch (err) {
      notify(err.message);
      setIsSubmitting(false);
    }
  };

  const basicFields = [
    {
      name: "first_name",
      label: text("landing.register.inputs.first_name"),
      type: "text",
    },
    {
      name: "last_name",
      label: text("landing.register.inputs.last_name"),
      type: "text",
    },
    {
      name: "username",
      label: text("landing.register.inputs.username"),
      type: "text",
    },
    {
      name: "email",
      label: text("landing.register.inputs.email"),
      type: "text",
    },
    {
      name: "password",
      label: text("landing.register.inputs.password"),
      type: "password",
    },
    {
      name: "confirm_password",
      label: text("landing.register.inputs.confirm_password"),
      type: "password",
    },
  ];

  return (
    <div
      ref={regSection.ref}
      className="bg-cover py-12 sm:py-14 md:py-16 lg:py-18"
      style={{ backgroundImage: "url(/images/landing/bg-deals.svg)" }}
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
                {basicFields.map(({ name, type, label }) => (
                  <div className="relative col-span-1" key={name}>
                    {name === "password" || name === "confirm_password" ? (
                      <EyedPasswordInput
                        label={label}
                        register={register}
                        name={name}
                      />
                    ) : (
                      <input
                        className="input"
                        type={type}
                        {...register(name)}
                        placeholder={label}
                        autoComplete="new-password"
                      />
                    )}

                    <p className="pt-3 text-yellow-500">
                      {errors[name] && errors[name].message}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                ref={regBtnRef}
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
