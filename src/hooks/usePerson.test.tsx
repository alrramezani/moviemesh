import { renderHook } from "@testing-library/react";
import usePerson from "./usePerson";
import QueryWrapper from "@/utils/queryWrapper";

const fakeResult = Array.from({ length: 20 }, () => ({
  adult: false,
  also_known_as: [
    "布拉德·皮特",
    "布萊德·彼特",
    "בראד פיט",
    "برد پیت",
    "براد پیت",
    "Брэд Питт",
    "Уильям Брэдли Питт",
  ],
  biography:
    "William Bradley Pitt (born December 18, 1963) is an American actor and film producer. He has received various accolades, including two Academy Awards, two British Academy Film Awards, two Golden Globe Awards, and a Primetime Emmy Award. One of the most influential celebrities, Pitt appeared on Forbes' annual Celebrity 100 list from 2006 to 2008 and the Time 100 list in 2007. His films as a leading actor have grossed over $6.9 billion worldwide.\n\nPitt first gained recognition as a cowboy hitchhiker in the Ridley Scott road film Thelma & Louise (1991). Pitt emerged as a star, taking on leading man roles in films such as the drama A River Runs Through It (1992), the western Legends of the Fall (1994), the horror film Interview with the Vampire (1994), the crime thriller Seven (1995), and the cult film Fight Club (1999). Pitt found greater commercial success starring in Steven Soderbergh's heist film Ocean's Eleven (2001) and reprised his role in its sequels. He cemented his leading man status by starring in blockbusters such as the historical epic Troy (2004), the romantic crime film Mr. & Mrs. Smith (2005), the horror film World War Z (2013), and the action film Bullet Train (2022).\n\nPitt won the Academy Award for Best Supporting Actor for playing a stunt performer in Quentin Tarantino's Once Upon a Time in Hollywood (2019). He was Oscar-nominated for his roles in the science fiction drama 12 Monkeys (1995), the fantasy romance The Curious Case of Benjamin Button (2008) and the sports drama Moneyball (2011). He also starred in acclaimed films such as Babel (2006), The Assassination of Jesse James by the Coward Robert Ford (2007), Burn After Reading (2008), Inglourious Basterds (2009), The Tree of Life (2011), and The Big Short (2015).\n\nIn 2001, Pitt co-founded the production company Plan B Entertainment. As a producer, he won the Academy Award for Best Picture for 12 Years a Slave (2013). He was nominated for Moneyball (2011) and The Big Short (2015). Pitt was named People's Sexiest Man Alive in 1995 and 2000.\n\nDescription above from the Wikipedia article Brad Pitt, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
  birthday: "1963-12-18",
  deathday: null,
  gender: 2,
  homepage: null,
  id: 287,
  imdb_id: "nm0000093",
  known_for_department: "Acting",
  name: "Brad Pitt",
  place_of_birth: "Shawnee, Oklahoma, USA",
  popularity: 13.503,
  profile_path: "/cckcYc2v0yh1tc9QjRelptcOBko.jpg",
}));
describe("useSearch", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: fakeResult }),
    }) as jest.Mock;

    process.env.NEXT_PUBLIC_API_URL = "https://example.com/";
    process.env.NEXT_PUBLIC_API_ACCESS_TOKEN = "test-token";
  });

  it("should not fetch by default (enabled: false)", async () => {
    renderHook(() => usePerson(287), {
      wrapper: QueryWrapper,
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should fetch correctly when refetch is called", async () => {
    const { result } = renderHook(() => usePerson(287), {
      wrapper: QueryWrapper,
    });
    const { data } = await result.current.refetch();
    expect(data).toEqual(fakeResult);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/person/287",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });
});
