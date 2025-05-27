import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10 px-4 md:px-8 w-full">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="btn btn-circle btn-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-sky-500">Profile</h1>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 ring ring-sky-500 ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        authUser.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt={authUser.name}
                    />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{authUser.name}</h2>
                <div className="badge bg-sky-600 mt-2">{authUser.role}</div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-sky-500">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title">Email</div>
                <div className="stat-value text-lg break-all">
                  {authUser.email}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-sky-500">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title">User ID</div>
                <div className="stat-value text-sm break-all">
                  {authUser.id}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-sky-500">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title">Role</div>
                <div className="stat-value text-lg">{authUser.role}</div>
                <div className="stat-desc">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>

              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-sky-500">
                  <Image className="w-8 h-8" />
                </div>
                <div className="stat-title">Profile Image</div>
                <div className="stat-value text-lg">
                  {authUser.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="stat-desc">
                  {authUser.image
                    ? "Image available"
                    : "Upload a profile picture"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProfileSubmission />
        <ProblemSolvedByUser />
      </div>
    </div>
  );
};

export default ProfilePage;
