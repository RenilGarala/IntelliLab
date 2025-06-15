import React, { useState } from "react";
import myImage from "../assets/Logo3.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const { isVerifying, verifyOtp } = useAuthStore();
  const navigate = useNavigate();

  const activationToken = localStorage.getItem("activationToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return alert("Please enter a valid 6-digit OTP.");
    }

    await verifyOtp({ otp, activationToken }, navigate);
  };

  return (
    <div className="h-screen grid">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img src={myImage} alt="logo" className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Verify User</h1>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">OTP</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input input-bordered w-80"
                  placeholder="000000"
                />
              </div>
            </div>

            <button type="submit" className="btn bg-sky-600 w-full text-white">
              {isVerifying ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link text-sky-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
