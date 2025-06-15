"use client";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "react-feather"; 

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-sm bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1 shadow-sm"
    >
      <LogOut size={14} />
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
};

export default LogoutButton;
