import React, { useCallback } from "react";
import Button from "./Button.jsx";

const JobCard = ({
  item,
  handleEdit,
  handleApplicants,
  handleApply,
  userType,
  appliers,
}) => {
  const userId = localStorage.getItem("userId");

  const applyCheck = useCallback(() => {
    const userApplied = appliers.includes(userId);

    return (
      <Button
        name={userApplied ? "Applied" : "Apply"}
        style={{
          minWidth: "100px",
          height: "30px",
          backgroundColor: userApplied ? "#848484" : "#008080",
          cursor: "pointer",
          border: "none",
          borderRadius: "10px",
          color: "white",
        }}
        handleClick={() =>
          !userApplied ? handleApply(item.id) : console.log("")
        }
      />
    );
  },[item.id, appliers, handleApply, userId]);

  const buttonConfig = useCallback(() => {
    if (userType === "Employee") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          {applyCheck()}
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <Button
            name="Edit"
            style={{
              minWidth: "70px",
              height: "30px",
              backgroundColor: "#008080",
              cursor: "pointer",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
            handleClick={() => handleEdit(item.id)}
          />
          <Button
            name="Applicants"
            style={{
              minWidth: "85px",
              height: "30px",
              backgroundColor: "#848484",
              cursor: "pointer",
              border: "none",
              borderRadius: "10px",
              color: "white",
            }}
            handleClick={() => handleApplicants(item.id)}
          />
        </div>
      );
    }
  },[applyCheck, item.id, handleApplicants, handleEdit, userType]);

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "8px",
            backgroundColor: "#344966",
            fontWeight: "bold",
            fontSize: "34px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div>{item.company.charAt(0).toUpperCase()}</div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {item.position}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {item.company}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.joblocation}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.date}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.jobtype}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {item.jobstatus}
        </div>
      </div>
      {buttonConfig()}
    </div>
  );
};

export default JobCard;
