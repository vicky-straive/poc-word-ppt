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
    if (skipped) localStorage.setItem("pptShowTour", "false");
  },
  hydrate: () => {
    const skipped = localStorage.getItem("pptTourSkipped") === "true";
    const showTour = localStorage.getItem("pptShowTour") === "true";
    set({ tourSkipped: skipped, showTour });
  },
  showTour: false,
  setShowTour: (show) => {
    set({ showTour: show, tourSkipped: show ? false : undefined });
    localStorage.setItem("pptShowTour", show ? "true" : "false");
    if (show) localStorage.setItem("pptTourSkipped", "false");
  },
}));
