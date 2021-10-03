import DatePicker from "react-multi-date-picker";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg";

export const ControlledDateicker = ({
  name,
  control,
  Controller,
  label,
  format,
}) => {
  const CustomDateInput = ({
    openCalendar,
    value,
    handleValueChange,
    onBlur,
  }) => (
    <div className="relative">
      <input
        readOnly="readOnly"
        className="login-input mt-6"
        onFocus={openCalendar}
        value={value && `${value} - ${format}`}
        onBlur={onBlur}
        placeholder={`${label} - ${format}`}
        onChange={handleValueChange}
      />
      <div className="absolute right-0 top-0 m-4 cursor-pointer z-20 opacity-70 hover:opacity-100">
        <CalendarIcon
          onClick={openCalendar}
          fill="#a1a1a1"
          width="20"
          height="20"
        />
      </div>
    </div>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, name, value },
        fieldState: { invalid, isDirty },
        formState: { errors },
      }) => (
        <>
          <DatePicker
            onChange={(date) => {
              onChange(date?.isValid ? date : "");
            }}
            format={format}
            render={<CustomDateInput onBlur={onBlur} />}
            containerClassName="w-full"
          />

          <p className="pt-3 text-yellow-500">
            {errors[name] && errors[name].message}
          </p>
        </>
      )}
    />
  );
};
