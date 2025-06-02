import React, { useEffect, useState } from "react";
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
  const { authUser, isLoggingIn } = useAuthStore();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <nav className="sticky top-0 z-50 w-full py-4 px-2">
      <div className="mx-auto max-w-4xl bg-black/10 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                className="h-10 w-10 bg-primary/20 text-primary rounded-full"
              />
              <span className="text-white text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]">
                Intelli<span className="text-sky-400">Lab</span>
              </span>
            </Link>
            <div className="md:hidden flex gap-3">
              <label className="swap swap-rotate">
                <input type="checkbox" onChange={handleToggle} />
                <svg
                  className="swap-on h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-off h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 rounded-full">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      className="object-cover"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                >
                  <li>
                    <p className="text-sm font-semibold">{authUser?.name}</p>
                    <hr className="border-gray-200/10" />
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="hover:bg-sky-600 hover:text-white text-sm font-semibold"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </li>
                  {authUser?.role === "ADMIN" && (
                    <li>
                      <Link
                        to="/add-problem"
                        className="hover:bg-sky-600 hover:text-white text-sm font-semibold"
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Add Problem
                      </Link>
                    </li>
                  )}
                  {authUser === false ? (
                    <li>
                      <LoginButton className="hover:text-white">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign Up
                      </LoginButton>
                    </li>
                  ) : (
                    <li>
                      <LogoutButton className="hover:text-white">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </LogoutButton>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <ul className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/20 hover:text-white text-sm md:text-base font-semibold"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/problems"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/20 hover:text-white text-sm md:text-base font-semibold"
              >
                <CodeIcon className="w-4 h-4" />
                Problem
              </Link>
            </li>
            <li>
              <Link
                to="/playlist"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/20 hover:text-white text-sm md:text-base font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                Playlist
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex md:gap-3.5 items-center">
            <label className="swap swap-rotate" onChange={handleToggle}>
              <input type="checkbox" />
              <svg
                className="swap-on h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    className="object-cover"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
              >
                <li>
                  <p className="text-sm font-semibold">{authUser?.name}</p>
                  <hr className="border-gray-200/10" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-sky-600 hover:text-white text-sm font-semibold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="hover:bg-sky-600 hover:text-white text-sm font-semibold"
                    >
                      <Code className="w-4 h-4 mr-1" />
                      Add Problem
                    </Link>
                  </li>
                )}
                {authUser === false || isLoggingIn === false ? (
                  <li>
                    <LoginButton className="hover:text-white">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign Up
                    </LoginButton>
                  </li>
                ) : (
                  <li>
                    <LogoutButton className="hover:text-white">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </LogoutButton>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
