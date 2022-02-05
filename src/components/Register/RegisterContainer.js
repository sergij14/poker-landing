import { useAppContext } from "../../context";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createCustomerDoc } from "../../firebase";
import { RegularInput } from "../hocs/RegularInput";
import { EyedPasswordInput } from "../hocs/EyedPasswordInput";
import Register from "./Register";

const RegisterContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const { text } = useAppContext();

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await createCustomerDoc(
        data,
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
      element: (name, register, label) => (
        <RegularInput label={label} register={register} name={name} />
      ),
    },
    {
      name: "last_name",
      label: text("landing.register.inputs.last_name"),

      element: (name, register, label) => (
        <RegularInput label={label} register={register} name={name} />
      ),
    },
    {
      name: "username",
      label: text("landing.register.inputs.username"),
      element: (name, register, label) => (
        <RegularInput label={label} register={register} name={name} />
      ),
    },
    {
      name: "email",
      label: text("landing.register.inputs.email"),
      element: (name, register, label) => (
        <RegularInput label={label} register={register} name={name} />
      ),
    },
    {
      name: "password",
      label: text("landing.register.inputs.password"),
      element: (name, register, label) => (
        <EyedPasswordInput label={label} register={register} name={name} />
      ),
    },
    {
      name: "confirm_password",
      label: text("landing.register.inputs.confirm_password"),
      element: (name, register, label) => (
        <EyedPasswordInput label={label} register={register} name={name} />
      ),
    },
  ];
  const props = {
    text,
    registered,
    handleSubmit,
    isSubmitting,
    onSubmit,
    basicFields,
    errors,
    register,
  };
  return <Register {...props} />;
};

export default RegisterContainer;
