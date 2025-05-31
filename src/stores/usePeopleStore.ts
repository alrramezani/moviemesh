import { create } from "zustand";
import { personType } from "@/types";

type PeopleStore = {
  selectedPeople: personType[];
  setPeople: (people: personType[]) => void;
  addPerson: (person: personType) => void;
  removePerson: (id: string) => void;
};

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  selectedPeople: [],
  setPeople: (people) => set({ selectedPeople: people }),
  addPerson: (person) => {
    const existing = get().selectedPeople;
    const alreadyAdded = existing.some((p) => p.id === person.id);
    if (!alreadyAdded) {
      set({ selectedPeople: [...existing, person] });
    }
  },
  removePerson: (id) =>
    set({
      selectedPeople: get().selectedPeople.filter(
        (person) => person.id.toString() !== id
      ),
    }),
}));