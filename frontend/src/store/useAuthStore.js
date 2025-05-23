import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("Check Auth Response = ", res.data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } 
    catch (error) {
      set({ authUser: null });
      toast.error("Error checking auth");
    } 
    finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } 
    catch (error) {
      set({ authUser: null });
      toast.error("Error signing up");
    } 
    finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        console.log("checking");
        
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } 
    catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } 
    finally {
      set({ isLoggingIn: false });
    }
  },
}));
