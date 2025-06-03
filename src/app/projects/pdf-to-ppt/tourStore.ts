import { create } from "zustand";

interface TourState {
  tourSkipped: boolean;
  setTourSkipped: (skipped: boolean) => void;
  hydrate: () => void;
  showTour: boolean;
  setShowTour: (show: boolean) => void;
}

export const useTourStore = create<TourState>((set) => ({
  tourSkipped: false,
  setTourSkipped: (skipped) => {
    set({ tourSkipped: skipped, showTour: skipped ? false : undefined });
    localStorage.setItem("pptTourSkipped", skipped ? "true" : "false");
  },
  hydrate: () => {
    const skipped = localStorage.getItem("pptTourSkipped") === "true";
    set({ tourSkipped: skipped });
  },
  showTour: false,
  setShowTour: (show) => set({ showTour: show, tourSkipped: show ? false : undefined }),
}));
