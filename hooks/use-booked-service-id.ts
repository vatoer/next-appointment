import { create } from "zustand";

type BookedServiceIdState = {
  id: Date | null;
  setId: (dt: Date | null) => void;
};

export const useBookedServiceId = create<BookedServiceIdState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
}));
