import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <div className="home-content">
        <h1 className="home-title">🎉 Welcome to the world of Funko Pops!</h1>
        <p className="home-subtitle">
          Explore our unique collection of iconic characters and start collecting today.
        </p>

        <div className="home-buttons">
          <Link href="/register">
            <button className="btn primary">Register</button>
          </Link>
          <Link href="/login">
            <button className="btn primary">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
