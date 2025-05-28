import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set, get) => ({
    isExecuting: false,
    isSubmiting: false,
    submission: null,

    submitCode: async ( source_code, language_id, stdin, expected_outputs, problemId)=>{
        try {
            set({isSubmiting:true});
            const res = await axiosInstance.post("/execute-code" , { source_code, language_id, stdin, expected_outputs, problemId });
            set({submission:res.data.submission});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(res.data.message || "Error executing code");
        }
        finally{
            set({isSubmiting:false});
        }
    },

    runcode: async ( source_code, language_id, stdin, expected_outputs, problemId)=>{
        try {
            set({isExecuting:true});
            const res = await axiosInstance.post("/execute-code/run-code" , { source_code, language_id, stdin, expected_outputs, problemId });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(res.data.message || "Error executing code");
        }
        finally{
            set({isExecuting:false});
        }
    }
}));