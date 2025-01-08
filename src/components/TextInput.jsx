import React from "react";

const TextInput = ({ type, name, placeholder, value, onChange, style }) => {
  return (
    <div>
      <input
        autoComplete="off"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
      ></input>
    </div>
  );
};

export default TextInput;
