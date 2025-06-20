import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isVerifying: false,
  isVerified: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
      set({ isLoggingIn: true });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data, navigate) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      localStorage.setItem("activationToken", res.data.activationToken);
      toast.success(res.data.message);
      set({ isSigninUp: false });
      navigate("/verify");
    } catch (error) {
      set({ authUser: null });
      toast.error(error?.response?.data?.message || "Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true
      });
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },  

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", null, {
        withCredentials: true,
      });
      set({ authUser: null });
      set({ isLoggingIn: false });
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Error logging out");
    }
  },

  verifyOtp: async ({ otp, activationToken },navigate ) => {
    set({ isVerifying: true });
    try {
      const res = await axiosInstance.post("/auth/verify", {
        otp,
        activationToken,
      });
      set({ isVerified: true });
      toast.success(res.data.message || "User verified successfully");
      navigate("/login");
    } catch (error) {
      set({ isVerified: false });
      toast.error(
        error?.response?.data?.message || "OTP verification failed"
      );
    } finally {
      set({ isVerifying: false });
    }
  },
}));
