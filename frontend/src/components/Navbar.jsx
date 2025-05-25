import React from "react";
import {
  User,
  Code,
  LogOut,
  Home,
  CodeIcon,
  BookOpen,
  LogIn,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import logo from "../assets/Logo3.png";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { authUser , isLoggingIn} = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full py-5 ">
      <div className="flex w-full justify-between items-center mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            className="h-12 w-12 bg-primary/20 text-primary border-none rounded-full"
          />
          <span className="text-white text-2xl md:text-2xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]">
            IntelliLab<span className="text-sky-400">.in</span>
          </span>
        </Link>

        <div className="mx-10">
          <ul className="flex gap-1">
            <li>
              <Link
                to="/"
                className="flex justify-center items-center gap-1 px-4 py-2 rounded-2xl hover:bg-primary/20 hover:text-white text-base font-semibold"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex justify-center items-center gap-1 px-4 py-2 rounded-2xl hover:bg-primary/20 hover:text-white text-base font-semibold"
              >
                <CodeIcon className="w-5 h-5 mr-2" />
                Problem
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex justify-center items-center gap-1 px-4 py-2 rounded-2xl hover:bg-primary/20 hover:text-white text-base font-semibold"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Playlist
              </Link>
            </li>
          </ul>
        </div>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-8">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row "
            >
              <div className="w-10 rounded-full ">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
            >
              <li>
                <p className="text-base font-semibold">{authUser?.name}</p>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              {authUser === false || isLoggingIn === false? (
                <li>
                  <LoginButton className="hover:bg-primary hover:text-white">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign Up
                  </LoginButton>
                </li>
              ) : (
                <li>
                  <LogoutButton className="hover:bg-primary hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
