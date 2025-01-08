import React from "react";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
const Navbar = () => {

  const {displayNavbar,setDisplayNavbar} = useContext(AppContext)
  return (
    <>
      <Horizontal
        setDisplayNavbar={setDisplayNavbar}
        displayNavbar={displayNavbar}
      />
      {displayNavbar && <Vertical />}
    </>
  );
};

export default Navbar;
