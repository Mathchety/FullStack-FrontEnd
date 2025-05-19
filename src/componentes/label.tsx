import React from "react";

interface LabelProps {
  name: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Label: React.FC<LabelProps> = ({ name, value, onClick }) => {
  return (
    <div className="mb-4 ">
      <button
        name={name}
        value={value}
        onClick={(event) => onClick(event)}
        className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-200"
      >
        {value}
      </button>
    </div>
  );
};

export default Label;
