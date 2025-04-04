import { create } from "zustand";
import { API } from "../lib/axios.js";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SignInInput, SignUpInput } from "@repo/validators";

export interface UpdateInput {
  profilePic: string | ArrayBuffer | null | undefined
}

interface AuthState {
    authUser: any;
    isSigningUp: boolean;
    isSigningIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;

    checkAuth: () => Promise<void>; 
    signup: (data: SignUpInput) => Promise<void>; 
    signin: (data: SignInInput) => Promise<void>; 
    signout: () => Promise<void>; 
    updateProfile: (data: UpdateInput) => Promise<void>; 
  }

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
          const res = await API.get("/auth/me");
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await API.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },
    
      signin: async (data) => {
        set({ isSigningIn: true });
        try {
          const res = await API.post("/auth/signin", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "Signin failed");
        } finally {
          set({ isSigningIn: false });
        }
      },
    
      signout: async () => {
        try {
          await API.post("/auth/signout");
          set({ authUser: null });
          toast.success("Signed out successfully");
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "Signout failed");
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await API.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "Error in updating profile");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

}))