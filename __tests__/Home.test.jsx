import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the main heading", () => {
    const heading = screen.getByRole("heading", { name: /benvenuto nel mondo dei funko pops/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    const subtitle = screen.getByText(/esplora la nostra collezione unica/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("renders the register and login buttons", () => {
    const registerButton = screen.getByRole("button", { name: /registrati/i });
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("has correct links for register and login buttons", () => {
    // Controlla l'attributo href dei Link
    const registerLink = screen.getByText(/registrati/i).closest("a");
    const loginLink = screen.getByText(/login/i).closest("a");

    expect(registerLink).toHaveAttribute("href", "/register");
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
