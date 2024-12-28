import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("my-chat-theme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("my-chat-theme", theme)
        set({ theme: theme })
    }
}))