import { renderHook, waitFor } from "@testing-library/react";
import usePersons from "@/hooks/usePersons";
import { personType } from "@/types";
import QueryWrapper from "@/utils/queryWrapper";

const mockPerson: personType = {
  id: 1,
  name: "John Doe",
  popularity: 99.9,
  known_for_department: "Acting",
  profile_path: "/some_path.jpg",
  gender: 2,
  adult: false,
  known_for: [],
  also_known_as: [],
  biography: null,
  birthday: "",
  deathday: null,
  homepage: null,
  imdb_id: "",
  place_of_birth: "",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockPerson),
  })
) as jest.Mock;

describe("usePersons", () => {
  it("fetches person data and returns successfully", async () => {
    const { result } = renderHook(() => usePersons(["1", "2"]), {
      wrapper: QueryWrapper,
    });
    await waitFor(() => {
      expect(result.current.data[0]).toBeDefined();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result.current.data.length).toBe(2);
  });
});
