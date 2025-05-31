import { render } from "@testing-library/react";
import Skeleton from ".";
describe(Skeleton, () => {
  it("Skeleton displays correct amout and type of skeleton", () => {
    const { getAllByTestId } = render(<Skeleton type="userSearch" count={5} />);
    const lengthOfItems = getAllByTestId("userSearch").length;
    expect(lengthOfItems).toBeGreaterThan(0);
    expect(lengthOfItems).toEqual(5);
  });
});
