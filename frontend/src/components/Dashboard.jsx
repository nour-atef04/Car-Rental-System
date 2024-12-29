import React from "react";
import NavBar from "./NavBar";
import DashboardBackground from "./DashboardBackground";
import CarGrid from "./CarGrid";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <DashboardBackground />
      <CarGrid />
      <Footer />
    </>
  );
};

export default Dashboard;
