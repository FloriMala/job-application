import React, { useState } from "react";
import db from "../firebase";
import "./style/SignUpContainer.css";
import JobSearchImage from "../assets/images/job_search.png";
import Button from "../components/shared/Button";
import { useSnackbar } from "notistack";
import User from "./SignUp/User";
import PersonalInformation from "./SignUp/PersonalInformation.jsx";
import Account from "./SignUp/Account";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from "../components/shared/Modal";
import CVSend from "./CVSend";

const style = {
  border: "none",
  borderRadius: "10px",
  width: "300px",
  height: "40px",
  marginLeft: "10px",
  paddingLeft: "6px",
};

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [sendCVModal, setSendCVModal] = useState(false);

  const closeSendCVModal = () => {
    setSendCVModal(false);
  };
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    type: "Employee",
    currjobtitle: "",
    industry: "",
    yearsofexp: "",
    educationalbg: "",
    desiredjob: "",
    username: "",
    password: "",
    confirmpassword: "",
    cv: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, name) => {
    const value = event.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const postData = async () => {
    console.log("1");
    const collectionRef = collection(db, "users");
    const payload = formData;
    await addDoc(collectionRef, payload);
    enqueueSnackbar("User created successfully!", {
      variant: "success",
    });
    navigate("/");
  };

  const handleSubmit = (e) => {
    setIsLoading(true);

    switch (true) {
      case !formData.email || !formData.username:
        enqueueSnackbar("Please fill Email and Username!", {
          variant: "error",
        });
      /*eslint-disable*/ case !formData.type:
        enqueueSnackbar("Please confirm your role!", {
          variant: "error",
        });
      case !formData.password:
        enqueueSnackbar("Please enter password!", { variant: "error" });
        break;
      case !formData.confirmpassword:
        enqueueSnackbar("Please enter confirm password!", { variant: "error" });
        break;
      case formData.confirmpassword !== formData.password:
        enqueueSnackbar("Please confirm your password appropriately", {
          variant: "error",
        });
      case formData.password.length < 8:
        enqueueSnackbar("Password must have at least 8 characters", {
          variant: "error",
        });
        break;
      case (!formData.currjobtitle ||
        !formData.industry ||
        !formData.yearsofexp ||
        !formData.educationalbg ||
        !formData.desiredjob) &&
        formData.type === "Employee":
        enqueueSnackbar("Please complete Proffesional Information section!", {
          variant: "error",
        });
        break;
      case !formData.cv && formData.type === "Employee":
        enqueueSnackbar("Please upload your CV!", {
          variant: "error",
        });
        break;
      default:
        console.log("adsdsadsa");
        postData();
    }

    setIsLoading(false);

    e.preventDefault();
  };

  return (
    <div>
      <div className='signUp'>
        <div className='signUp_image'>
          <img
            src={JobSearchImage}
            alt='Job search'
            className='signUp_image_job'
          />
        </div>
        <div className='signUp_form'>
          <div className='signUp_head'>Sign up to JobFit</div>
          <div className='signUp_para'>
            Already have an account?{" "}
            <a className='logIn' href='/'>
              Log in.
            </a>
          </div>
          <form className='signUp_form_input'>
            <User style={style} handleChange={handleChange} />

            {formData.type === "Employee" && (
              <PersonalInformation style={style} handleChange={handleChange} />
            )}

            <Account style={style} handleChange={handleChange} />

            {sendCVModal && (
              <Modal>
                <CVSend
                  closeSendCVModal={closeSendCVModal}
                  setFormData={setFormData}
                />
              </Modal>
            )}

            <div className='sign_up_button'>
              {formData.type === "Employee" && (
                <div
                  onClick={() => setSendCVModal(true)}
                  style={{
                    width: "300px",
                    height: "38px",
                    cursor: "pointer",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                >
                  Upload CV
                </div>
              )}
              <Button
                name='Sign up'
                isLoading={isLoading}
                handleClick={handleSubmit}
                style={{
                  width: "300px",
                  height: "38px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#1c2e4a",
                  color: "white",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpContainer;
