import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Code, Hand, Lightbulb, Target } from "lucide-react";

const HomePage = () => {
  const { authUser } = useAuthStore();
  return (
    <section className=" min-h-screen flex flex-col items-center pt-32 ">
      <div className="absolute top-16 left-0 w-1/4 h-1/4 bg-sky-500 opacity-30 blur-3xl rounded-full bottom-9"></div>

      {authUser ? (
        <p className="flex items-center gap-2 px-4 py-2 -mt-10 mb-10 text-sm font-semibold bg-primary/20 rounded-2xl cursor-default">
          {" "}
          Hey! <Hand className="w-4 h-4" /> {authUser?.name}
        </p>
      ) : (
        <div></div>
      )}

      <h1 className="text-5xl font-extrabold z-10 text-center mb-5">
        Welcome to <span className="text-sky-500">IntelliLab</span>
      </h1>

      <p className="mt-4 text-center max-w-3xl text-lg text-gray-500 dark:text-gray-400 leading-loose z-10">
        IntelliLab provides focused coding challenges to help you sharpen your
        problem-solving abilities and improve your coding mindset.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-5xl z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
          <Lightbulb className="mx-auto text-sky-500 mb-3" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">
            Learn by Solving
          </h3>
          <p className="text-gray-400">
            Solve handpicked challenges that develop your logical thinking and
            real-world coding ability.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
          <Code className="mx-auto text-sky-500 mb-3" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">
            Real Coding Practice
          </h3>
          <p className="text-gray-400">
            Work on actual code problems in a real-time environment that mimics
            technical interviews.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
          <Target className="mx-auto text-sky-500 mb-3" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">
            Stay Interview-Ready
          </h3>
          <p className="text-gray-400">
            Consistent practice ensures you're always ready for your next coding
            interview.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
