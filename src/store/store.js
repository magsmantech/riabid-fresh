import create from "zustand";

export const [userProvider] = create((set, get) => ({
  currentUser: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
  },
  setCurrentUser: (user) => {
    set(() => ({
      currentUser: user,
    }));
  },
}));
