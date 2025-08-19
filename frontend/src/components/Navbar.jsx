import React, { useEffect, useState } from "react";
import {
  User,
  Code,
  LogOut,
  Home,
  CodeIcon,
  BookOpen,
  LogIn,
  List,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import logo from "../assets/Logo3.png";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const { authUser, isLoggingIn } = useAuthStore();

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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 rounded-box w-52 space-y-3"
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
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-white text-sm md:text-base font-semibold"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/problems"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-white text-sm md:text-base font-semibold"
              >
                <CodeIcon className="w-4 h-4" />
                Problem
              </Link>
            </li>
            <li>
              <Link
                to="/playlist"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-white text-sm md:text-base font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                Playlist
              </Link>
            </li>
            <li>
              <Link
                to="/sheets"
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-800 hover:text-white text-sm md:text-base font-semibold"
              >
                <List className="w-4 h-4" />
                Sheet
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex md:gap-3.5 items-center">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-900 rounded-box w-52 space-y-3"
              >
                {authUser && (
                  <li>
                  <p className="text-sm font-semibold">{authUser?.name}</p>
                  <hr className="border-gray-200/10" />
                </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-neutral-800 hover:text-white text-sm font-semibold"
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
