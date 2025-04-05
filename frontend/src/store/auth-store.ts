import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SignInInput, SignUpInput } from "@geekyharsh/realtalk";
import { API } from "../lib/axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://api.realtalk.theharsh.xyz";


export async function handleApiRequest<T>(
  apiCall: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  successMessage: string,
  customMessages?: {
    loading?: string;
    success?: string;
    error?: string;
  },
): Promise<T> {
  setLoading(true);

  const toastPromise = toast.promise(
    apiCall()
      .then((res) => res)
      .catch((error: AxiosError<{ message: string }>) => {
        const errMsg =
          error.response?.data?.message ||
          customMessages?.error ||
          "Something went wrong";
        throw new Error(errMsg);
      })
      .finally(() => {
        setLoading(false);
      }),
    {
      loading: customMessages?.loading || "Loading...",
      success: customMessages?.success || successMessage,
      error: (err) => err.message || "Error occurred",
    },
  );

  return toastPromise;
}

export interface UpdateInput {
  profilePic: string | ArrayBuffer | null | undefined;
}

interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isSigningIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: SignUpInput) => Promise<void>;
  signin: (data: SignInInput) => Promise<void>;
  signout: () => Promise<void>;
  updateProfile: (data: UpdateInput) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await API.get("/auth/me");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    const response = await handleApiRequest(
      () => API.post("/auth/signup", data),
      (loading) => set({ isSigningUp: loading }),
      "Account created successfully",
    );
    set({ authUser: response.data });
    get().connectSocket();
  },

  signin: async (data) => {
    const response = await handleApiRequest(
      () => API.post("/auth/signin", data),
      (loading) => set({ isSigningIn: loading }),
      "Signed in successfully",
    );
    set({ authUser: response.data });
    await useAuthStore.getState().checkAuth();
    get().connectSocket();
  },

  signout: async () => {
    await handleApiRequest(
      () => API.post("/auth/signout"),
      () => {},
      "Signed out successfully",
    );
    set({ authUser: null });
    get().disconnectSocket();
  },

  updateProfile: async (data) => {
    const response = await handleApiRequest(
      () => API.put("/auth/update-profile", data),
      (loading) => set({ isUpdatingProfile: loading }),
      "Profile updated successfully",
      {
        loading: "Updating profile...",
        error: "Failed to update profile",
      },
    );
    set({ authUser: response.data });
    await useAuthStore.getState().checkAuth();
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser.result._id },
    });

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.connect();
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));
