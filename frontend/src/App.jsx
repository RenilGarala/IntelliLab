import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Layout from "./layout/Layout";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./pages/AddProblem";
import ProblemsPage from "./pages/ProblemsPage";
import PlaylistPage from "./pages/PlaylistPage";
import ProblemPage from "./pages/ProblemPage";
import ProfilePage from "./pages/ProfilePage";
import "./loader.css";
import SheetListPage from "./pages/SheetListPage";
import SheetPage from "./pages/SheetPage";
import VerifyPage from "./pages/VerifyPage";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="terminal-loader relative border border-[#333] text-green-500 font-mono text-base px-4 py-6 w-48 shadow-lg rounded overflow-hidden box-border">
          <div className="terminal-header absolute top-0 left-0 right-0 h-6 bg-[#333] rounded-t px-2 box-border flex items-center justify-between">
            <div className="terminal-title text-gray-200 leading-6">Status</div>
            <div className="terminal-controls flex items-center space-x-1 ml-auto">
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-red-600"></div>
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-yellow-400"></div>
              <div className="control w-[0.6em] h-[0.6em] rounded-full bg-green-600"></div>
            </div>
          </div>
          <div className="text inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 mt-6 animate-typeAndDelete">
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/problems"
            element={authUser ? <ProblemsPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/sheet"
            element={authUser ? <ProblemsPage /> : <Navigate to={"/login"} />}
          />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route
            path="/sheets"
            element={authUser ? <SheetListPage /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/sheet/:id"
          element={authUser ? <SheetPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/verify"
          element={!authUser ? <VerifyPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to={"/"} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
