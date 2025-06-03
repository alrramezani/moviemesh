"use client";
import { create } from "zustand";
import { personType } from "@/types";

type PeopleStore = {
  peopleData: personType[];
  peopleLoading: boolean;
  setPeopleData: (data: personType[]) => void;
  setPeopleLoading: (loading: boolean) => void;
};

const usePeopleStore = create<PeopleStore>((set) => ({
  peopleData: [],
  peopleLoading: false,
  setPeopleData: (data) => set({ peopleData: data }),
  setPeopleLoading: (loading) => set({ peopleLoading: loading }),
}));

export default usePeopleStore;
