import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /benvenuto/i })).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Home />);
    expect(
      screen.getByText(/progetto next\.js con backend su render/i)
    ).toBeInTheDocument();
  });

  it("renders links to login and register pages", () => {
    render(<Home />);
    const registerLink = screen.getByRole("link", { name: /registrati/i });
    const loginLink = screen.getByRole("link", { name: /login/i });

    expect(registerLink).toHaveAttribute("href", "/register");
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
