import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import {
  Home,
  PlusCircle,
  UserPlus,
  LogIn,
  LogOut,
  FileText,
} from "react-feather";

function Navbar() {
  const { typeOfSession } = useSelector((state) => state.auth);

  const linkClasses =
    "flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-100 text-gray-700 hover:text-blue-700 transition duration-200";

  return (
    <nav className="p-4 flex flex-wrap justify-between items-center border-b border-gray-200 bg-white shadow-sm">
      {/* Logo */}
      <NavLink to="/posts" className="text-2xl font-bold text-info mx-2 ">
        EchoBoard
      </NavLink>

      {/* Navigation Links */}
      <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
        <NavLink to="/posts" className={linkClasses}>
          <FileText size={18} />
          Posts
        </NavLink>

        {typeOfSession === "loggedIn" && (
          <NavLink to="/create-post" className={linkClasses}>
            <PlusCircle size={18} />
            Create Post
          </NavLink>
        )}

        {typeOfSession === "anonyms" && (
          <NavLink to="/signup" className={linkClasses}>
            <UserPlus size={18} />
            Sign Up
          </NavLink>
        )}

        {(typeOfSession === "anonyms" || typeOfSession === "registered") && (
          <NavLink to="/login" className={linkClasses}>
            <LogIn size={18} />
            Login
          </NavLink>
        )}

        {typeOfSession === "loggedIn" && (
          <div className={linkClasses}>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
