import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import { useProblemStore } from "../store/useProblemStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { solvedProblems } = useProblemStore();

  return (
    <div className="min-h-screen bg-base-200 px-4 md:px-10 pt-5 pb-10 flex flex-col items-center w-full">
      {/* Header */}
      <div className="flex items-center w-full max-w-7xl pb-5">
        <Link to="/" className="btn btn-ghost btn-circle mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-200">Profile</h1>
      </div>

      <div className="flex w-full max-w-7xl gap-8">
        <aside className="w-72 bg-black/15 rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden ring ring-sky-500 ring-offset-2 ring-offset-white">
              <img
                src={authUser.image || "https://avatar.iran.liara.run/public/boy"}
                alt={authUser.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-1">{authUser.name}</h2>
          <p className="text-sm text-gray-600 mb-2 break-all">{authUser.email}</p>
          <div className="badge bg-sky-600 px-4 py-4">{authUser.role}</div>
        </aside>

        <main className="flex-1 flex flex-col gap-8">
          <section className="bg-black/15 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Solved Problems</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="stat bg-base-100 shadow rounded-box">
              <div className="stat-title">Easy</div>
              <div className="stat-value text-success">
                {solvedProblems.filter(p => p.difficulty === 'EASY').length}
              </div>
            </div>
            <div className="stat bg-base-100 shadow rounded-box">
              <div className="stat-title">Medium</div>
              <div className="stat-value text-warning">
                {solvedProblems.filter(p => p.difficulty === 'MEDIUM').length}
              </div>
            </div>
            <div className="stat bg-base-100 shadow rounded-box">
              <div className="stat-title">Hard</div>
              <div className="stat-value text-error">
                {solvedProblems.filter(p => p.difficulty === 'HARD').length}
              </div>
            </div>
          </div>
          </section>

          <section className="bg-black/15 rounded-lg shadow-md p-6 ">
            <h2 className="text-xl font-bold mb-4 text-left text-white">Submission Activity</h2>
            <ProfileSubmission />
          </section>

          <section>
            <ProblemSolvedByUser />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
