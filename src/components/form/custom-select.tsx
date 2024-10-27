type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label: string;
  options: { value: string }[];
  handleOnChange?: (value: string) => void;
  error?: string | string[];
};

export default function CustomSelect(props: Props) {
  const { label, options, error, handleOnChange } = props;
  return (
    <div>
      <label className="block text-light-gray mb-2">{label}</label>
      <select
        {...props}
        onChange={(e) => {
          if (typeof handleOnChange === "function") {
            handleOnChange(e.target.value);
          }
        }}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary bg-dark-gray-4 text-light-gray"
      >
        {options.map((e) => (
          <option key={e.value} value={e.value.toLowerCase()}>
            {e.value}
          </option>
        ))}
      </select>

      <p className="text-red-400 text-sm h-1">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    </div>
  );
}
