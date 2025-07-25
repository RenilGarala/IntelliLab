import {
  ArrowRight,
  Award,
  ChartLine,
  Code,
  Lightbulb,
  Star,
  Target,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigation = useNavigate();
  const navigateToProblem = () => {
    navigation("/problems");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-14 sm:pt-28 px-8 lg:px-36 md:px-20 sm:px-16 ">
      <section className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center mb-44 gap-16">
        {/* Background Bubble */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-[300px] h-[300px] rounded-full bg-blue-500 opacity-30 blur-3xl bubble-animation"></div>
        </div>

        {/* Left Section */}
        <div className="flex-1 max-w-xl">
          <p className="flex items-center gap-2 px-4 py-2 text-sm text-base-content bg-black/0 transition-all rounded-full mb-4 w-fit backdrop-blur border border-gray-700">
            <ChartLine className="w-4 h-4"/> Trusted by 5M+ developers
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-base-content leading-tight">
            Master Coding Interviews with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
              IntelliLab
            </span>
          </h1>

          <p className="text-base-content text-base sm:text-lg md:text-xl leading-relaxed mb-6">
            The most effective platform to prepare for technical interviews.
            Practice with real company questions and join our thriving developer
            community.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              type="button"
              onClick={navigateToProblem}
              className="px-6 py-2 bg-gradient-to-r from-sky-400 to-blue-700 text-white rounded-full font-semibold hover:scale-105 transition"
            >
              Start Practicing{" "}
              <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-white/30 text-white rounded-full font-semibold hover:scale-105 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group rounded-2xl p-6 bg-gradient-to-br from-[#1b1b1b] to-[#171717] border-2 border-neutral-800 hover:border-blue-500 transition shadow duration-400 ease-in-out transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <Code className="text-blue-500" />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">1500+</p>
              <p className="text-gray-400 text-sm">Problems</p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl p-6 bg-gradient-to-br from-[#1b1b1b] to-[#171717] border-2 border-neutral-800 hover:border-blue-500 transition shadow duration-400 ease-in-out transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <User className="text-blue-500" />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">5M+</p>
              <p className="text-gray-400 text-sm">Users</p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl p-6 bg-gradient-to-br from-[#1b1b1b] to-[#171717] border-2 border-neutral-800 hover:border-blue-500 transition shadow duration-400 ease-in-out transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <Award className="text-blue-500" />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">300+</p>
              <p className="text-gray-400 text-sm">Contests</p>
            </div>

            {/* Card 4 */}
            <div className="group rounded-2xl p-6 bg-gradient-to-br from-[#1b1b1b] to-[#171717] border-2 border-neutral-800 hover:border-blue-500 transition shadow duration-400 ease-in-out transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <ChartLine className="text-blue-500" />
              </div>
              <p className="mt-4 text-3xl font-bold text-white">95%</p>
              <p className="text-gray-400 text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mb-20">
        <h2 className="text-center text-4xl font-bold text-base-content mb-4">
          Why Developers Choose IntelliLab
        </h2>
        <p className="text-center flex flex-col items-center text-gray-400 mb-10">
          Everything you need to ace your technical interviews in one place
          <div className="w-20 py-1 mt-5 bg-gradient-to-r from-sky-500 to-blue-700 text-white rounded-full font-semibold hover:scale-105 transition"></div>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20 rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <Code className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Coding</h3>
            <p className="text-gray-400">
              Write, run, and test code directly in our browser IDE with
              real-time feedback.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20 rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <Lightbulb className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Company Questions</h3>
            <p className="text-gray-400">
              Practice with actual interview questions from top tech companies
              like FAANG.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20 rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <Target className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Detailed Solutions</h3>
            <p className="text-gray-400">
              Access comprehensive explanations and optimal solutions for every
              problem.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20  rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <ChartLine className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Monitor your improvement with detailed statistics and personalized
              reports.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20  rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <Code className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Community Support</h3>
            <p className="text-gray-400">
              Join discussions, get help, and learn from our community of
              developers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1b1b1b] to-[#171717] border border-neutral-800 duration-300 hover:border-sky-600 hover:shadow-lg hover:shadow-sky-500/20 rounded-xl p-8 flex flex-col items-start gap-2 text-base-content shadow backdrop-blur-sm">
            <div className=" bg-neutral-800 rounded-xl p-3 mb-3">
              <Lightbulb className="mx-auto text-sky-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Content</h3>
            <p className="text-gray-400">
              Unlock exclusive problems, video solutions, and interview
              strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full p-10 py-14 m-10 rounded-2xl bg-gradient-to-r from-sky-950 via-[#17203d] to-sky-950 border border-[#354965] shadow-xl backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-sky-500/10 opacity-50 blur-2xl pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-4 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Ready to Launch with IntelliLab?
          </h2>
          <p className="text-sky-100 text-lg">
            Join thousands of developers mastering tech skills with IntelliLab’s
            smart learning tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-5">
            <button
              onClick={navigateToProblem}
              className="px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-800 text-white font-medium rounded-lg shadow duration-300 hover:scale-103 transition"
            >
              Get Started for Free
            </button>
            <button className="px-6 py-3 border border-sky-500 text-white font-medium rounded-lg hover:bg-sky-500/10 duration-300 hover:scale-103 transition flex items-center gap-2">
              Explore Premium{" "}
              <span className="text-yellow-400">
                <Star className="w-4 h-4" />{" "}
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
