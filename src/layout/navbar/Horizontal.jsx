import React, {  useEffect } from "react";
import JobSearch from "../../assets/images/job_search.png";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import db from "../../firebase.js";
import { getDoc, doc } from "firebase/firestore";

const Horizontal = () => {
  const {
    displayNavbar,
    setDisplayNavbar,
    username,
    setUsername,
    setUserType,
  } = useContext(AppContext);

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const finalResult = docSnap.data();
      setUsername(finalResult.firstname);
      setUserType(finalResult.type);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ position: "sticky", top: "0px", zIndex: "2" }}>
      <div
        style={{
          backgroundColor: "#344966",
          margin: "0px 5px 5px 5px",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          height: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            width: "100px",
          }}
        >
          <img
            src={JobSearch}
            alt="test1"
            style={{
              width: "70%",
              objectFit: "contain",
              marginTop: "8px",
            }}
          />
          <IconButton
            onClick={() => {
              setDisplayNavbar(!displayNavbar);
            }}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "20px",
            minWidth: "100px",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
          ></div>
          <div>
            {
              <p>
                <strong>{username}</strong>
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horizontal;
