import React, { useState } from "react";
import NavBar from "./NavBar";
import ReservationsPanel from "./ReservationsPanel";
import Footer from "./Footer";
import RegisterEmployeePanel from "./RegisterEmployeePanel";
import CarStatusReport from "./CarStatusReport";
import PaymentsPanel from "./PaymentsPanel";
import MarkVehicleModal from "./MarkVehicleModal";
import AddCar from "./AddCar";
import "./CSS/MarkVehicleModal.css";

const ControlPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NavBar />
      <ReservationsPanel />
      <hr className="container" />
      <CarStatusReport />
      <div>
        <button className="mt-2 submit-button" onClick={openModal}>
          Update Vehicle Status
        </button>
        {isModalOpen && <MarkVehicleModal onClose={closeModal} />}
      </div>
      <hr className="container" />
      <PaymentsPanel />
      <hr className="container" />
      <RegisterEmployeePanel />
      <hr className="container" />
      <AddCar />
      <Footer />
    </>
  );
};

export default ControlPanel;
