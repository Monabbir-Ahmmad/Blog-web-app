import React from "react";

const Button = ({ children, format, active, ...rest }) => {
  return (
    <button className={active ? "btnActive" : ""} title={format} {...rest}>
      {children}
    </button>
  );
};

export default Button;
