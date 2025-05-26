import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProblemStore = create((set, get) => ({
    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemLoading: false,
    isProblemsLoading: false,
  
    getAllProblems: async () => {
      try {
        set({ isProblemsLoading: true });
        const res = await axiosInstance.get("/problems/get-all-problem");
        set({ problems: res.data.problems });
      } catch (error) {
        toast.error("Error getting all problems");
      } finally {
        set({ isProblemsLoading: false });
      }
    },
  
    getProblemById: async (id) => {
      try {
        set({ isProblemLoading: true });
        const res = await axiosInstance.get(`/problems/get-problem/${id}`);
        set({ problem: res.data.problem });
      } catch (error) {
        toast.error("Error getting problem");
      } finally {
        set({ isProblemLoading: false });
      }
    },
  
    getSolvedProblemByUser: async () => {
      try {
        const res = await axiosInstance.get("/problems/get-solved-problem");
        set({ solvedProblems: res.data.problems });
      } catch (error) { 
        toast.error("Error getting solved problems");
      }
    },
  
  }));