import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  tooltip,
}) => {
  return (
    <div className="mb-4  ">
      <label
        htmlFor={name}
        className="block text-white text-sm font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="shadow appearance-none w-full border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
      />
      {tooltip && <p className="mt-1 text-xs text-gray-500">{tooltip}</p>}
    </div>
  );
};

export default InputField;
