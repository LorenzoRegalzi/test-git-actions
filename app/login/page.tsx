"use client"
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  async function handleLogin(e:any) {
    e.preventDefault();
    setMessage("Loading...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setToken(data.token);
      setMessage("✅ Login riuscito!");
    } catch (err) {
      setMessage("❌ " + "err.message");
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <button type="submit">Accedi</button>
      </form>
      {message && <p>{message}</p>}
      {token && (
        <div style={{ marginTop: 20 }}>
          <strong>Token JWT:</strong>
          <pre style={{ overflowX: "auto", background: "#eee", padding: 10 }}>{token}</pre>
        </div>
      )}
    </main>
  );
}
