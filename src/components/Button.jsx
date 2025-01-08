import React from "react";
import Spinner from "./../../assets/gif/Spinner-2.gif";
const Button = ({
  name = "Name",
  isLoading = false,
  handleClick,
  style = {},
}) => {
  return (
    <button type='button' style={style} onClick={handleClick}>
      {isLoading ? (
        <>
          <img
            style={{ width: "25px", height: "25xp" }}
            src={Spinner}
            alt='Spinner'
          />
        </>
      ) : (
        name
      )}
    </button>
  );
};

export default Button;
