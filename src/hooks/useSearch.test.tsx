import { renderHook } from "@testing-library/react";
import useSearch  from "./useSearch";
import QueryWrapper from "@/utils/queryWrapper";
import { faker } from "@faker-js/faker";

const fakeResults = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
}));
describe("useSearch", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: fakeResults }),
    }) as jest.Mock;

    process.env.NEXT_PUBLIC_API_URL = "https://example.com/";
    process.env.NEXT_PUBLIC_API_ACCESS_TOKEN = "test-token";
  });

  it("should not fetch by default (enabled: false)", async () => {
    renderHook(() => useSearch("key"), {
      wrapper: QueryWrapper,
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should fetch correctly when refetch is called", async () => {
    const { result } = renderHook(() => useSearch("key"), {
      wrapper: QueryWrapper,
    });
    const { data } = await result.current.refetch();
    expect(data).toEqual(fakeResults.slice(0, 10));
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/search/person?query=key",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });
});
