import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/CSS/CustomButton.css";

const CustomButton = ({ text, type, buttonClass }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (type) {
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      default:
    }
  };

  return (
    <button onClick={handleClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default CustomButton;
