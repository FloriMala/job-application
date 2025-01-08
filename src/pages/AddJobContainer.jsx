import React, { useState } from "react";
import Form from "../components/shared/Form";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { AppContext } from "../AppContext";
const AddJobContainer = () => {
  const userId = localStorage.getItem("userId");
  const { enqueueSnackbar } = useSnackbar();

  const { displayNavbar } = useContext(AppContext);

  const [addJobForm, setAddJobForm] = useState({
    position: "",
    company: "",
    joblocation: "",
    jobstatus: "Open",
    jobtype: "Full - Time",
    userId: userId,
    apply: [],
  });

  const handleChange = (event, name) => {
    const value = event.target.value;
    setAddJobForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const addJob = async () => {
    if (
      addJobForm.position &&
      addJobForm.jobtype &&
      addJobForm.company &&
      addJobForm.jobstatus &&
      addJobForm.joblocation
    ) {
      const date = new Date().toDateString();
      const collectionRef = collection(db, "Jobs");
      const payload = { ...addJobForm, date };
      await addDoc(collectionRef, payload)
        .then(() => {
          enqueueSnackbar("Job added successfully", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        });
      setAddJobForm({
        position: "",
        company: "",
        joblocation: "",
        jobstatus: "Open",
        jobtype: "Full - Time",
        userId: userId,
        date: "",
        apply: [],
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
        title='Add Job'
        fields={[
          { name: "Position", type: "TextInput" },
          { name: "Company", type: "TextInput" },
          { name: "Job Location", type: "TextInput" },
          { name: "Job Status", options: ["Open", "Closed"] },
          {
            name: "Job Type",
            options: ["Full - Time", "Part - Time"],
          },
        ]}
        handleSubmit={addJob}
        handleChange={handleChange}
        state={addJobForm}
      />
    </div>
  );
};

export default AddJobContainer;