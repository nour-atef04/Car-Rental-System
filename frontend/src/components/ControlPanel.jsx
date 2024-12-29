import React from "react";
import NavBar from "./NavBar";
import ReservationsPanel from "./ReservationsPanel";
import Footer from "./Footer";
import RegisterEmployeePanel from "./RegisterEmployeePanel";

const ControlPanel = () => {
  return (
    <>
      <NavBar />
      <RegisterEmployeePanel/>
      <ReservationsPanel />
      <Footer />
    </>
  );
};

export default ControlPanel;
