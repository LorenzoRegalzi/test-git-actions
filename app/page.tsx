import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <div className="home-content">
        <h1 className="home-title">🎉 Benvenuto nel mondo dei Funko Pops!</h1>
        <p className="home-subtitle">
          Esplora la nostra collezione unica di personaggi iconici e inizia a collezionare oggi stesso.
        </p>

        <div className="home-buttons">
          <Link href="/register">
            <button className="btn primary">Registrati</button>
          </Link>
          <Link href="/login">
            <button className="btn primary">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
