import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/CustomButton.css";

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
      case "search":
        navigate("/search");
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
