import usePeopleStore from "@/stores/usePeopleStore";
import { act } from "@testing-library/react";
import { personType } from "@/types";
const mockPerson = {
    id: "1",
    name: "John Doe",
    age: 30,
} as unknown as personType;

describe("usePeopleStore Zustand store", () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    const { setPeopleData, setPeopleLoading } = usePeopleStore.getState();
    setPeopleData([]);
    setPeopleLoading(false);
  });

  it("should have initial state", () => {
    const state = usePeopleStore.getState();
    expect(state.peopleData).toEqual([]);
    expect(state.peopleLoading).toBe(false);
  });

  it("should update peopleData correctly", () => {
    act(() => {
      usePeopleStore.getState().setPeopleData([mockPerson]);
    });

    const state = usePeopleStore.getState();
    expect(state.peopleData).toEqual([mockPerson]);
  });

  it("should update peopleLoading correctly", () => {
    act(() => {
      usePeopleStore.getState().setPeopleLoading(true);
    });

    const state = usePeopleStore.getState();
    expect(state.peopleLoading).toBe(true);
  });
});