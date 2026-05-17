import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// const BASE_URL = "http://localhost:5001"
// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001" 
// const BASE_URL = "rayg-app-backend-production.up.railway.app"
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : 
import.meta.env.VITE_API_URL
 

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpadatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  //? =========================== CHECK FUNCTION =========================== CHECK FUNCTION
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("Error in checkAuth", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  //? =========================== SIGNUP FUNCTION =========================== SIGNUP FUNCTION
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //? =========================== LOGOUT FUNCTION =========================== LOGOUT FUNCTION
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disConnectSocket()

    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  //? =========================== LOGIN FUNCTION =========================== LOGIN FUNCTION
  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //? =========================== UPDATE PROFILE FUNCTION =========================== LOGIN FUNCTION
  updatProfile: async (data) => {
    set({ isUpadatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Updated profile successfulle");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("error in updating profile", err);
    } finally {
      set({ isUpadatingProfile: false });
    }
  },


  //? =========================== CONNECT SOCKET FUNCTION =========================== CONNECT SOCKET FUNCTION
  connectSocket: () => {
    const {authUser, socket} = get()
    if(!authUser || socket?.connected) return

    const newSocket = io(BASE_URL, {
      query: {userId : authUser._id},
      withCredentials: true,
    })

    newSocket.connect()
    
    set({ socket: newSocket })
    
    newSocket.on("getOnlineUsers", (userIds)=>{set({onlineUsers : userIds})})
  },


  //? =========================== DISCONNECT SOCKET FUNCTION =========================== DISCONNECT SOCKET FUNCTION
  disConnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect()
  },
}));

export default useAuthStore;
  

