import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import db from "../firebase";
import JobCard from "../components/JobCard";
import Modal from "../components/Modal";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import "./../components/style/Modal.css";
import Applicants from "../components/Applicants";

const SearchContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userType } = useContext(AppContext);
  const [jobToUpdate, setJobToUpdate] = useState("");
  const [searchForm, setSearchForm] = useState({
    search: "",
    jobstatus: "Any",
    jobtype: "Any",
  });
  const [searchResult, setSearchResult] = useState([]);

  console.log(userType);
  
  const [editJobForm, setEditJobForm] = useState({
    position: "",
    company: "",
    joblocation: "",
    jobstatus: "",
    jobtype: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);

  const [applicants, setApplicants] = useState([]);

  const { displayNavbar } = useContext(AppContext);
  const userId = localStorage.getItem("userId");

  const handleChange = (event, name) => {
    const value = event.target.value;
    setSearchForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (searchForm.search || searchForm.jobstatus || searchForm.jobtype) {
      fetchData({ applyFilter: true });
    }
  };

  useEffect(
    () => {
      if (
        !searchForm.search &&
        searchForm.jobstatus === "Any" &&
        searchForm.jobtype === "Any"
      ) {
        fetchData({ applyFilter: false });
      }
    },
    /*eslint-disable*/ [
      searchForm.search,
      searchForm.jobstatus,
      searchForm.jobtype,
      userType,
    ]
  );

  const handleQueryWithFilter = () => {
    const userId = localStorage.getItem("userId");

    let queryWithFilter = collection(db, "Jobs");
    const filters = [];

    if (searchForm.search) {
      filters.push(where("company", "==", searchForm.search));
    }

    if (searchForm.jobstatus && searchForm.jobstatus !== "Any") {
      filters.push(where("jobstatus", "==", searchForm.jobstatus));
    }

    if (searchForm.jobtype && searchForm.jobtype !== "Any") {
      filters.push(where("jobtype", "==", searchForm.jobtype));
    }
    if (userType === "Employer") {
      filters.push(where("userId", "==", userId));
    }

    if (filters.length > 0) {
      queryWithFilter = query(queryWithFilter, ...filters);
    }
    return queryWithFilter;
  };

  const fetchData = async ({ applyFilter }) => {
    const queryForEmployeeWithoutFilter = query(collection(db, "Jobs"));

    const queryWithFilter = handleQueryWithFilter();

    const queryWithoutFilter = query(
      collection(db, "Jobs"),
      where("userId", "==", userId)
    );

    const queryForFilter =
      userType === "Employee"
        ? applyFilter
          ? queryWithFilter
          : queryForEmployeeWithoutFilter
        : applyFilter
        ? queryWithFilter
        : queryWithoutFilter;

    const result = await getDocs(queryForFilter);
    const finalResult = result.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setSearchResult(finalResult);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, "Jobs", jobToUpdate));
    fetchData({ applyFilter: false });
    setShowModal(false);
  };

  const handleEdit = async (jobId) => {
    setJobToUpdate(jobId);
    const docRef = doc(db, "Jobs", jobId);
    const docSnap = await getDoc(docRef);
    const job = docSnap.data();

    const { position, company, joblocation, jobstatus, jobtype } = job;

    setEditJobForm({
      position: position,
      company: company,
      joblocation: joblocation,
      jobstatus: jobstatus,
      jobtype: jobtype,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditSubmit = () => {
    const docRef = doc(db, "Jobs", jobToUpdate);
    updateDoc(docRef, { ...editJobForm })
      .then(() => {
        setShowModal(false);
        enqueueSnackbar("Job updated successfully", { variant: "success" });
        fetchData({ applyFilter: false });
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      });
  };

  const handleJobUpdate = (event, name) => {
    const value = event.target.value;
    setEditJobForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleApply = async (jobId) => {
    const docRef = doc(db, "Jobs", jobId);

    await updateDoc(docRef, {
      apply: arrayUnion(userId),
    });
    fetchData({ applyFilter: false });
  };

  const handleApplicants = async (jobId) => {
    const docRef = doc(db, "Jobs", jobId);
    const docSnap = await getDoc(docRef);
    const applicants = docSnap.data().apply;

    setShowApplicants(true);
    setApplicants(applicants);
  };

  const closeApplicants = () => {
    setShowApplicants(false);
  };

  return (
    <div
      style={
        displayNavbar
          ? {
              width: "calc(100% - 172px)",
              marginLeft: "166px",
              marginTop: "16px",
              backgroundColor: "#344966",
              borderRadius: "10px",
              height: "calc(100vh - 90px)",
            }
          : {
              width: "99%",
              marginTop: "16px",
              marginLeft: "8px",
              backgroundColor: "#344966",
              borderRadius: "10px",
              height: "calc(100vh - 90px)",
            }
      }
    >
      <div
        style={{
          height: "calc(100vh - 90px)",
        }}
      >
        <div>
          <Form
            showCLoseModal={false}
            title="All Jobs"
            fields={[
              { name: "Search", type: "TextInput" },
              {
                name: "Job Status",
                type: "Select",
                options: ["Any", "Open", "Closed"],
              },
              {
                name: "Job Type",
                type: "Select",
                options: ["Any", "Full - Time", "Part - Time"],
              },
            ]}
            buttonName="Apply Filter"
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            state={searchForm}
          />
        </div>
        <div style={{ fontSize: "25px", color: "white", padding: "10px" }}>
          Search Result
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexFlow: "row wrap",
            justifyContent: "center",
            padding: "4px 10px 10px 10px",
            overflowY: "scroll",
            height: "calc(100vh - 330px)",
          }}
          className="jobContainer"
        >
          {searchResult.length ? (
            searchResult.map((result, index) => {
              return (
                <JobCard
                  item={result}
                  handleApplicants={handleApplicants}
                  handleEdit={handleEdit}
                  userType={userType}
                  handleApply={handleApply}
                  appliers={result.apply}
                  key={index}
                />
              );
            })
          ) : (
            <h1 style={{ color: "white" }}>
              Sorry, no results match your search
            </h1>
          )}
        </div>
      </div>
      {showModal && (
        <Modal>
          <Form
            showCloseModal={true}
            title="Edit Job"
            fields={[
              { name: "Position", type: "TextInput" },
              { name: "Company", type: "TextInput" },
              { name: "Job Location", type: "TextInput" },
              {
                name: "Job Status",
                type: "Select",
                options: ["Open", "Closed"],
              },
              {
                name: "Job Type",
                type: "Select",
                options: ["Full - Time", "Part - Time"],
              },
            ]}
            handleSubmit={handleEditSubmit}
            handleChange={handleJobUpdate}
            handleDelete={handleDelete}
            state={editJobForm}
            closeModal={closeModal}
            showDeleteButton={true}
          />
        </Modal>
      )}

      {showApplicants && (
        <Modal showBackground={true}>
          <Applicants
            closeApplicants={closeApplicants}
            applicants={applicants}
          />
        </Modal>
      )}
    </div>
  );
};

export default SearchContainer;
