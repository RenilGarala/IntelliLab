import React, { useEffect } from "react";
// import { useProblemStore } from "../store/useProblemStore";
// import ProblemsTable from "../components/ProblemTable";
// import { Loader } from "lucide-react";

const HomePage = () => {
  // const { getAllProblems ,problems , isProblemsLoading} = useProblemStore();

  // useEffect(() => {
  //   getAllProblems();
  // }, [getAllProblems]);

  // if (isProblemsLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <section className="min-h-screen flex flex-col items-center mt-14 px-4">
      <div className="absolute top-16 left-0 w-1/4 h-1/4 bg-sky-500 opacity-30 blur-3xl rounded-full bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-sky-500">IntelliLab</span>
      </h1>
      <p className="mt-4 text-center max-w-3xl text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
        IntelliLab provides focused coding challenges to help you sharpen your
        problem-solving abilities and improve your coding mindset.
      </p>

      {/* {problems.length > 0 ? (
        <ProblemsTable problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )} */}
    </section>
  );
};

export default HomePage;
