import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Modal from "./Modal";
import Calendar from "./Calendar";

const Applicant = ({ user }) => {
  const [applicant, setApplicant] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchApplicant = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const profile = docSnap.data();
    setApplicant(profile);
  };

  useEffect(() => {
    fetchApplicant(user);
  }, []);

  function openCV() {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='" +
        encodeURI(applicant.cv) +
        "'></iframe>"
    );
  }

  return (
    <div style={{ marginTop: "8px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          {applicant?.firstname && (
            <Typography>
              {applicant.firstname} {applicant.lastname} - {applicant.email}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <center>
                Phone Number
                <br />
                <strong>{applicant?.phonenumber}</strong>
              </center>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <center>
                Current Job <br />
                <strong>{applicant?.currjobtitle}</strong>
              </center>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <center>
                Desired job <br />
                <strong>{applicant?.desiredjob}</strong>
              </center>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <center>
                Years of experience <br />
                <strong>{applicant?.yearsofexp}</strong>
              </center>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <center>
                Educational Background <br />
                <strong>{applicant?.educationalbg}</strong>
              </center>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <center>
                Industry <br />
                <strong>{applicant?.industry}</strong>
              </center>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={openCV}
              sx={{ cursor: "pointer", color: "blue", textDecoration: "none" }}
            >
              <center>
                Open CV <br />
              </center>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "2px",
              marginTop: "14px",
              marginRight: "40px",
            }}
            onClick={() => setShowModal(true)}
          >
            <div>
              <div>
                <strong>
                  Selected Date: {selectedDate ? selectedDate : "__-__-__"}
                </strong>
              </div>

              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Click to choose a time
              </div>
            </div>
          </div>
        </AccordionDetails>
        {showModal && (
          <Modal>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Calendar
                onClose={closeModal}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </Modal>
        )}
      </Accordion>
    </div>
  );
};

export default Applicant;
