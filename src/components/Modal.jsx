import React from "react";
import "./style/Modal.css";

const Modal = ({ children, showBackground = false }) => {
  return (
    <div className='modal'>
      <div
        className='modal-content'
        style={showBackground ? { backgroundColor: "rgba(52, 73, 102)" } : null}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
