import React, { useState, useEffect } from "react";
import Form from "../components/shared/Form";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { AppContext } from "../AppContext";
const ProfileContainer = () => {
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    currjobtitle: "",
    industry: "",
    yearsofexp: "",
    educationalbg: "",
    desiredjob: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const { displayNavbar, setUsername, userType } = useContext(AppContext);
  const handleChange = (event, name) => {
    const value = event.target.value;
    setProfileForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const profile = docSnap.data();

    const {
      firstname,
      lastname,
      email,
      phonenumber,
      currjobtitle,
      industry,
      yearsofexp,
      educationalbg,
      desiredjob,
    } = profile;
    if (
      firstname &&
      lastname &&
      email &&
      phonenumber &&
      currjobtitle &&
      industry &&
      yearsofexp &&
      educationalbg &&
      desiredjob
    ) {
      setProfileForm({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        currjobtitle: currjobtitle,
        industry: industry,
        yearsofexp: yearsofexp,
        educationalbg: educationalbg,
        desiredjob: desiredjob,
      });
    } else if (firstname && lastname && email) {
      setProfileForm({
        firstname: firstname,
        lastname: lastname,
        email: email,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (profileForm.firstname && profileForm.lastname && profileForm.email) {
      const userId = localStorage.getItem("userId");

      const docRef = doc(db, "users", userId);
      updateDoc(docRef, { ...profileForm })
        .then(() => {
          console.log(profileForm);
          setUsername(profileForm.firstname);
          enqueueSnackbar("Profile updated successfully", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        });
    } else {
      enqueueSnackbar("Please fill all the fields!", { variant: "error" });
    }
  };

  return (
    <div
      style={
        displayNavbar
          ? {
              width: "calc(100% - 172px)",
              marginLeft: "166px",
              marginTop: "16px",
            }
          : { width: "99%", marginTop: "16px", marginLeft: "8px" }
      }
    >
      <Form
        title='Profile'
        fields={
          userType === "Employee"
            ? [
                { name: "First Name", type: "TextInput" },
                { name: "Last Name", type: "TextInput" },
                { name: "E-mail", type: "TextInput" },
                { name: "Phone Number", type: "TextInput" },
                { name: "Curr Job Title", type: "TextInput" },
                { name: "Industry", type: "TextInput" },
                { name: "Years of Exp", type: "TextInput" },
                { name: "Educational Bg", type: "TextInput" },
                { name: "Desired Job", type: "TextInput" },
              ]
            : [
                { name: "First Name", type: "TextInput" },
                { name: "Last Name", type: "TextInput" },
                { name: "E-mail", type: "TextInput" },
              ]
        }
        showCV={userType === "Employee" ? true : false}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={profileForm}
        setProfileForm={setProfileForm}
      />
    </div>
  );
};

export default ProfileContainer;
