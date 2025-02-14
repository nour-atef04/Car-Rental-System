import React, { useState } from "react";
import NavBar from "./NavBar";
import DashboardBackground from "./DashboardBackground";
import CarGrid from "./CarGrid";
import Footer from "./Footer";
import RentSlider from "./RentSlider";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxRent, setMaxRent] = useState(500); // default max rent value

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleRentChange = (value) => {
    setMaxRent(value);
  };

  return (
    <>
      <NavBar />
      <DashboardBackground
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <RentSlider onRentChange={handleRentChange} />
      <CarGrid searchQuery={searchQuery} maxRent={maxRent} />
      <Footer />
    </>
  );
};

export default Dashboard;
