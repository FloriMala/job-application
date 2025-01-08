import React, { useContext } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

const Vertical = () => {
  const { userType } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleClick = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div
      className="mainDiv"
      style={{
        backgroundColor: "#344966",
        width: "110px",
        borderRadius: "10px",
        margin: "5px",
        padding: "20px",
        position: "fixed",
        top: "80px",
        height: "calc(100vh - 130px)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "26px",
            padding: "10px",
            alignContent: "center",
            flexWrap: "wrap",
            color: "white",
            fontSize: "18px",
          }}
        >
          {userType !== "Employee" && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/addjob")}
            >
              Add Jobs
            </div>
          )}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigate("/jobs")}
          >
            All Jobs
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigate("/profile")}
          >
            Profile
          </div>
        </div>

        <Button
          name="Log Out"
          isLoading=""
          handleClick={handleClick}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "15px",
            height: "50px",
            width: "80%",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Vertical;
