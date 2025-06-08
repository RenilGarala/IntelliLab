import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useSheetStore = create((set, get) => ({
  allSheets: [],
  sheet: null,
  isLoading: false,
  errorMessage: null,

  getSheets: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/sheet");
      set({ allSheets: res.data.sheets });
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      set({ allSheets: [] });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  getSheetById: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/sheet/${id}`);
      set({ sheet: res.data.sheet });
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      set({ sheet: null });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  createSheet: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(`/sheet/create-sheet`, data);
      set((state) => ({
        allSheets: [...state.allSheets, res.data.data],
      }));
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  updateSheet: async (id, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.patch(`/sheet/update-sheet/${id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  addProblemInSheet: async (id, problemIds) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post(`/sheet/${id}/add-problem`, {
        problemIds,
      });

      if (get().sheet?.id === id) {
        await get().getSheetById(id);
      }

      toast.success(res.data.message);
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  removeProblemFromSheet: async (id, problemIds) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/sheet/${id}/remove-problem`, {
        data: { problemIds },
      });

      if (get().sheet?.id === id) {
        await get().getSheetById(id);
      }

      toast.success(res.data.message);
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSheet: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/sheet/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      set({ errorMessage: error?.message || "Something went wrong" });
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLoading: false });
    }
  },
}));
