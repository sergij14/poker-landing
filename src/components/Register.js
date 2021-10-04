import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useText } from "../context";

import { Controller, useForm } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createCustomerDoc } from "../firebase";
import i18n from "../i18n";
import Loader from "./Loader";
import { EyedPasswordInput } from "./hocs/EyedPasswordInput";
import { ControlledDateicker } from "./hocs/ControlledDateicker";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const t = useText();
  const DATE_FORMAT = "MM/DD/YYYY";
  const notify = (text) => toast(text);

  const schema = Yup.object().shape({
    first_name: Yup.string().required(
      t(`landing.register.inputs.first_name`) +
        " " +
        t("landing.register.inputs.errors.required")
    ),
    last_name: Yup.string().required(
      t(`landing.register.inputs.last_name`) +
        " " +
        t("landing.register.inputs.errors.required")
    ),
    username: Yup.string().required(
      t(`landing.register.inputs.username`) +
        " " +
        t("landing.register.inputs.errors.required")
    ),
    email: Yup.string()
      .required(
        t(`landing.register.inputs.email`) +
          " " +
          t("landing.register.inputs.errors.required")
      )
      .email(t("landing.register.inputs.errors.pattern")),
    password: Yup.string()
      .required(
        t(`landing.register.inputs.password`) +
          " " +
          t("landing.register.inputs.errors.required")
      )
      .min(6, t("landing.register.inputs.errors.pass-val-chars"))
      .max(30, t("landing.register.inputs.errors.pass-val-chars"))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{6,}$/,
        t("landing.register.inputs.errors.pass-val")
      ),
    confirm_password: Yup.string()
      .required(
        t(`landing.register.inputs.confirm_password`) +
          " " +
          t("landing.register.inputs.errors.required")
      )
      .min(6, t("landing.register.inputs.errors.pass-val-chars"))
      .max(30, t("landing.register.inputs.errors.pass-val-chars"))
      .oneOf(
        [Yup.ref("password"), null],
        t("landing.register.inputs.errors.pass-match")
      ),
    birth_date: Yup.date()
      .required(
        t(`landing.register.inputs.birth_date`) +
          " " +
          t("landing.register.inputs.errors.required")
      )
      .test("age", t("landing.register.inputs.errors.minAge"), (birthdate) => {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return birthdate <= cutoff;
      }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = { ...data };
    const dateObj = new DateObject(formData.birth_date);
    formData.birth_date = dateObj.format(DATE_FORMAT);
    try {
      await createCustomerDoc(
        formData,
        i18n.t("landing.register.inputs.errors.email")
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
      label: t("landing.register.inputs.first_name"),
      type: "text",
    },
    {
      name: "last_name",
      label: t("landing.register.inputs.last_name"),
      type: "text",
    },
    {
      name: "username",
      label: t("landing.register.inputs.username"),
      type: "text",
    },
    {
      name: "email",
      label: t("landing.register.inputs.email"),
      type: "text",
    },
    {
      name: "password",
      label: t("landing.register.inputs.password"),
      type: "password",
    },
    {
      name: "confirm_password",
      label: t("landing.register.inputs.confirm_password"),
      type: "password",
    },
  ];

  return (
    <div
      className="bg-cover pt-18 pb-24"
      style={{ backgroundImage: "url(/images/landing/bg-deals.svg)" }}
    >
      <div className="mx-auto max-w-7xl sm:px-4 mt-28">
        <div className="flex flex-col space-y-7 lg:flex-row lg:space-x-8 lg:items-center">
          <div className="lg:w-2/5 px-4">
            <h4 className="text-3xl font-black my-4">
              {t("landing.register.title")}
            </h4>
            <p className="text-lg">{t("landing.register.msg")}</p>
          </div>
          <div
            className={`bg-landing-bgSecondary sm:rounded-lg px-6 py-8 md:p-10 lg:w-3/5`}
          >
            <h5 className="text-3xl font-black">
              {registered
                ? t("landing.register.title-form-registered")
                : t("landing.register.title-form")}
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
                        className="login-input"
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

              <ControlledDateicker
                control={control}
                name="birth_date"
                format={DATE_FORMAT}
                label={t("landing.register.inputs.birth_date")}
                Controller={Controller}
              />

              <button
                type="submit"
                className="px-6 rounded-lg py-4 bg-landing-orange hover:bg-landing-orangeLight mt-8 uppercase font-bold focus:outline-none focus:ring-2 ring-white ring-opacity-20"
              >
                {t("landing.register.btn")}
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
