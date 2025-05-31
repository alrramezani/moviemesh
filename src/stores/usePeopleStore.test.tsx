import { renderHook, act } from "@testing-library/react";
import { usePeopleStore } from "@/stores/usePeopleStore"; // Adjust the path accordingly
import { personType } from "@/types";

const mockPerson: personType = {
  adult: false,
  also_known_as: [],
  biography: "Test bio",
  birthday: "2000-01-01",
  deathday: null,
  gender: 1,
  homepage: null,
  id: 123,
  imdb_id: "nm123",
  known_for_department: "Acting",
  name: "Test Person",
  place_of_birth: "Test City",
  popularity: 10,
  profile_path: "/test.jpg",
};

describe("usePeopleStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    const { result } = renderHook(() => usePeopleStore());
    act(() => result.current.setPeople([]));
  });

  it("should initialize with an empty array", () => {
    const { result } = renderHook(() => usePeopleStore());
    expect(result.current.selectedPeople).toEqual([]);
  });

  it("should add a person", () => {
    const { result } = renderHook(() => usePeopleStore());

    act(() => {
      result.current.addPerson(mockPerson);
    });

    expect(result.current.selectedPeople).toHaveLength(1);
    expect(result.current.selectedPeople[0].id).toBe(mockPerson.id);
  });

  it("should not add the same person twice", () => {
    const { result } = renderHook(() => usePeopleStore());

    act(() => {
      result.current.addPerson(mockPerson);
      result.current.addPerson(mockPerson);
    });

    expect(result.current.selectedPeople).toHaveLength(1);
  });

  it("should remove a person by id", () => {
    const { result } = renderHook(() => usePeopleStore());

    act(() => {
      result.current.addPerson(mockPerson);
      result.current.removePerson("123");
    });

    expect(result.current.selectedPeople).toHaveLength(0);
  });

  it("should set people directly", () => {
    const { result } = renderHook(() => usePeopleStore());

    act(() => {
      result.current.setPeople([mockPerson]);
    });

    expect(result.current.selectedPeople).toEqual([mockPerson]);
  });
});