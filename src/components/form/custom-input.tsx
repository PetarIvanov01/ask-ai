type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  handleOnChange?: (value: string) => void;
  error?: string | string[];
};
export default function CustomInput(props: Props) {
  const { label, handleOnChange, placeholder, error } = props;
  return (
    <div className="">
      <label className="block text-light-gray mb-2">{label}</label>
      <input
        {...props}
        onChange={(e) => {
          if (typeof handleOnChange === "function") {
            handleOnChange(e.target.value);
          }
        }}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary bg-dark-gray-4 text-light-gray"
        placeholder={placeholder}
      />
      <p className="text-red-400 text-sm h-1">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    </div>
  );
}
