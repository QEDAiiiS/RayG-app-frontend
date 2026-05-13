import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import useAuthSore from "./useAuthStore.js";

//? ========================== USE CHAT STORE ========================== USE CHAT STORE
const useChateStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  //? ========================== GET USERS FUNCTION ========================== GET USERS FUNCTION
  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  //? ========================== GET MESSAGES FUNCTION ========================== GET MESSAGES FUNCTION
  getMessages: async (userID) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userID}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  //? ========================== SEND MESSAGE FUNCTION ========================== SET SELECTED USER FUNCTION
  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/messages/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (err) {toast.error(err.response.data.message)}
  },

  //? ========================== SET SELECTED USER FUNCTION ========================== SET SELECTED USER FUNCTION
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  //? ========================== SUBSCRIBE TO NEW MESSAGE FUNCTION ========================== SUBSCRIBE TO NEW MESSAGE FUNCTION
  subscribeToMessages: () => {
    const {selectedUser} = get()
    if(!selectedUser) return

    const socket = useAuthSore.getState().socket;

    // * todo: optimize this one later
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
      if(!isMessageSentFromSelectedUser) return
      set({ messages: [...get().messages, newMessage]})
  }) },


  //? ========================== SUBSCRIBE TO NEW MESSAGE FUNCTION ========================== SET SELECTED USER FUNCTION
  unsubscribeFromMessages: () => {
    const socket = useAuthSore.getState().socket;
    socket.off("newMessage");
  }

}));

export default useChateStore;
