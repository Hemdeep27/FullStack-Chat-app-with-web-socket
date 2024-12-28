import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8001" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            set({authUser: null})
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            toast.success('Account created successfully')
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('logout success')
            get().disConnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } 
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success('Login Successful')
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res  = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success('Profile updated Successful')
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }))
    },

    disConnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))