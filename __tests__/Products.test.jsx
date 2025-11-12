import { render, screen, act } from "@testing-library/react";
import ProductsPage from "../app/products/page";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe("Products Page", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<ProductsPage />);
    });
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders error message if something goes wrong", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("API error"));
    await act(async () => {
      render(<ProductsPage />);
    });
    const errorMessage = await screen.findByText(/unable to load products/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
