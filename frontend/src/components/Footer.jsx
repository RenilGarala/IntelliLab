import React from "react";
import footerLogo from "../assets/Logo3.png";

const Footer = () => {
  return (
    <footer className="w-screen border-t-2 border-neutral-900 text-gray-400 py-7 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-1 md:gap-3 md:pl-2">
          <img src={footerLogo} className="h-15 w-15" />
          <span className="text-white text-2xl md:text-2xl mr-3 md:mr-0 font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.25)]">
            Intelli<span className="text-sky-400">Lab</span>
          </span>
        </div>
        <div className="text-center text md:text-right mb-5 md:mb-0 md:pr-2">
          © {new Date().getFullYear()} IntelliLab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
