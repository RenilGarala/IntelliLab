import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import ProblemsTable from "../components/ProblemsTable";
import { Loader } from "lucide-react";
import "../loader.css";

const ProblemsPage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
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
    <div className="min-h-screen">
      {problems.length > 0 ? (
        <ProblemsTable problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 px-4 py-2 rounded-md ">
          No problems found
        </p>
      )}
    </div>
  );
};

export default ProblemsPage;
