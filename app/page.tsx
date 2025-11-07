import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "2rem", fontFamily: "sans-serif" }}>
      <h1>Benvenuto 👋</h1>
      <p>Progetto Next.js con backend su Render</p>
      <p>
        <Link href="/register">Registrati</Link> | <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
