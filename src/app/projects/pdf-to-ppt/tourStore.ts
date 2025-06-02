import { create } from "zustand";

interface TourState {
  tourSkipped: boolean;
  setTourSkipped: (skipped: boolean) => void;
  hydrate: () => void;
}

export const useTourStore = create<TourState>((set) => ({
  tourSkipped: false,
  setTourSkipped: (skipped) => {
    set({ tourSkipped: skipped });
    localStorage.setItem("pptTourSkipped", skipped ? "true" : "false");
  },
  hydrate: () => {
    const skipped = localStorage.getItem("pptTourSkipped") === "true";
    set({ tourSkipped: skipped });
  },
}));
