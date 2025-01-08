import React from "react";
import Button from "../components/Button";
import CloseIcon from "@mui/icons-material/Close";

const CVSend = ({ closeSendCVModal, setFormData }) => {
  function handleFileSelect(input) {
    // Check if any file is selected
    if (input.target.files && input.target.files.length > 0) {
      const selectedFile = input.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        const cvData = reader.result;
        setFormData((prevState) => ({ ...prevState, cv: cvData }));
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    } else {
      console.log("No file selected.");
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "8vh",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "200px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <CloseIcon
          style={{
            color: "black",
            cursor: "pointer",
            marginTop: "6px",
            marginLeft: "6px",
          }}
          onClick={closeSendCVModal}
        />
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label for="avatar">Send in your CV</label>
          <br />
          <input
            type="file"
            name="avatar"
            className="fileInput"
            onChange={(e) => handleFileSelect(e)}
            style={{ width: "177px" }}
          />
          <Button
            name="Submit"
            handleClick={closeSendCVModal}
            isLoading={false}
            style={{
              width: "30%",
              height: "30px",
              marginTop: "16px",
              cursor: "pointer",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#1c2e4a",
              color: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CVSend;