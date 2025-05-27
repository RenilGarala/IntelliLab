import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ children }) => {
  const navigate = useNavigate();

  const onLogin = async () => {
    navigate("/login");
  };

  return (
    <button className="btn bg-sky-600 hover:bg-sky-700" onClick={onLogin}>
      {children}
    </button>
  );
};

export default LoginButton;