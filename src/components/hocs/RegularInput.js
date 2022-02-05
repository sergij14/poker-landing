export const RegularInput = ({ type, name, label, register }) => {
  return (
    <input
      className="input"
      type="text"
      {...register(name)}
      placeholder={label}
      autoComplete="new-password"
    />
  );
};
