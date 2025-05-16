import React from "react";

interface ButtonProps {
  name: string;
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({ name, value, onClick }) => {
  return (
    <div className="mb-4 ">
      <button
        name={name}
        value={value}
        onClick={(event) => onClick(event)}
        className="w-20 h-8 text-sm bg-blue-400 flex items-center justify-center 
        text-white rounded-3xl p-2 hover:bg-blue-500 
        focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-opacity-50"
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
