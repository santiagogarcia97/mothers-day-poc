import React from "react";

const Button = ({ children, style, onClick, disabled }: { children: React.ReactNode, style?: React.CSSProperties, onClick?: () => void, disabled?: boolean }) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className=" bg-pink-400 hover:bg-pink-700 hover:disabled:bg-pink-400 disabled:opacity-60 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
