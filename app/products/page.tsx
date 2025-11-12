// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Unable to load products");
      }
    }
    fetchProducts();
  }, []);

  if (error) {
    return <main><p style={{ color: "red" }}>{error}</p></main>;
  }

  return (
    <main>
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl ?? "/placeholder.png"} alt={p.name} />
            <h3>{p.name}</h3>
            <p>€{p.price}</p>
            <button className="btn primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}
