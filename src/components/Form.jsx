import React from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import CloseIcon from "@mui/icons-material/Close";
import CVSend from "../pages/CVSend";
import { useState } from "react";
import Modal from "./Modal";

const style = {
  border: "none",
  borderRadius: "10px",
  height: "40px",
  outline: "none",
  paddingLeft: "6px",
  display: "inline-block",
  width: "100%",
};

const Form = ({
  setProfileForm,
  showCloseModal,
  showCV,
  title,
  fields,
  handleSubmit,
  state,
  handleChange,
  closeModal,
  showDeleteButton,
  handleDelete,
  buttonName,
}) => {
  const [sendCVModal, setSendCVModal] = useState(false);
  const closeSendCVModal = () => {
    setSendCVModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#344966",
        padding: "10px",
        marginRight: "6px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "25px", color: "white" }}>{title}</div>
        {showCloseModal ? (
          <CloseIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={closeModal}
          />
        ) : null}
      </div>
      <form
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginRight: "8px",
        }}
      >
        {fields.map((field, index) => {
          const fieldName = field.name.toLowerCase().replace(/[\s-]+/g, "");
          if (field.type === "TextInput") {
            return (
              <TextInput
                type='text'
                name={field.name}
                value={state[fieldName]}
                placeholder={field.name}
                onChange={(event) => handleChange(event, fieldName)}
                style={{ ...style }}
                key={index}
              />
            );
          } else {
            return (
              <select
                style={{ ...style }}
                name={field.name}
                id={field.name}
                onChange={(event) => handleChange(event, fieldName)}
              >
                {field.options.map((option) => {
                  return <option value={option}>{option}</option>;
                })}
              </select>
            );
          }
        })}

        {showCV && (
          <div
            onClick={() => setSendCVModal(true)}
            style={{
              width: "300px",
              height: "38px",
              cursor: "pointer",
              marginTop: "10px",
              marginLeft: "14px",
              color: "white",
              textDecoration: "underline",
            }}
          >
            Upload CV
          </div>
        )}

        {sendCVModal && (
          <Modal>
            <CVSend
              closeSendCVModal={closeSendCVModal}
              setFormData={setProfileForm}
            />
          </Modal>
        )}
        <Button
          name={buttonName ? buttonName : "Submit"}
          isLoading={false}
          handleClick={handleSubmit}
          style={{
            width: "100%",
            height: "38px",
            cursor: "pointer",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#1c2e4a",
            color: "white",
          }}
        />

        {showDeleteButton && (
          <Button
            name='Delete'
            isLoading={false}
            handleClick={handleDelete}
            style={{
              width: "100%",
              height: "38px",
              cursor: "pointer",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#D10000",
              color: "white",
            }}
          />
        )}
      </form>
    </div>
  );
};

export default Form;
