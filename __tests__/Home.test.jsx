import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the main heading", () => {
    const heading = screen.getByRole("heading", { name: /welcome to the world of funko pops/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    const subtitle = screen.getByText(/explore our unique collection of iconic characters/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("renders the register and login buttons", () => {
    const registerButton = screen.getByRole("button", { name: /register/i });
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("has correct links for register and login buttons", () => {
    const registerLink = screen.getByText(/register/i).closest("a");
    const loginLink = screen.getByText(/login/i).closest("a");

    expect(registerLink).toHaveAttribute("href", "/register");
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
