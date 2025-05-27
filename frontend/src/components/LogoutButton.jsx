import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ children }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <button className="btn bg-sky-600 hover:bg-sky-700" onClick={onLogout}>
      {children}
    </button>
  );
};

export default LogoutButton;