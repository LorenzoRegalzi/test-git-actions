import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "../app/products/page";
import "@testing-library/jest-dom";

const pushMock = jest.fn();

// Mock del router di Next.js
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock di localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => "fake-user-id");
  Storage.prototype.setItem = jest.fn();
});

// Mock globale di fetch
global.fetch = jest.fn((url) => {
  if (url.includes("/api/products")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: "1", name: "Prodotto 1", price: "10" },
          { id: "2", name: "Prodotto 2", price: "20" },
        ]),
    });
  } else if (url.includes("/api/orders")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: "order1", totalAmount: 30 }),
    });
  }
  return Promise.resolve({ ok: false });
});

describe("Products Page", () => {
  beforeEach(() => {
    render(<ProductsPage />);
    pushMock.mockClear();
    global.fetch.mockClear();
  });

  it("renders products from API", async () => {
    await waitFor(() => {
      expect(screen.getByText("Prodotto 1")).toBeInTheDocument();
      expect(screen.getByText("Prodotto 2")).toBeInTheDocument();
    });
  });

});
