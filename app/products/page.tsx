// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [loadingOrder, setLoadingOrder] = useState(false);
   const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

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

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const getTotal = () =>
    cart.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );

  const handleCheckout = async () => {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  setLoadingOrder(true); // start loader
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }),
    });

    if (!res.ok) throw new Error("Order failed");
    const data = await res.json();
    alert(`Order placed! ID: ${data.id}, Total: €${data.totalAmount}`);
    setCart([]);
    setSidebarOpen(false);
  } catch (err) {
    alert("Failed to place order");
  } finally {
    setLoadingOrder(false); // stop loader
  }
};

  if (error) {
    return <main><p style={{ color: "red" }}>{error}</p></main>;
  }

  return (
    <main>
      <header className="header">
        <button className="btn primary" onClick={() => setSidebarOpen(true)}>
          Cart ({cart.length})
        </button>
      </header>

      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl ?? "/placeholder.png"} alt={p.name} />
            <h3>{p.name}</h3>
            <p>€{p.price}</p>
            <button className="btn primary" onClick={() => addToCart(p)} disabled={loadingOrder}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {sidebarOpen && (
        <div className="cart-sidebar">
          <button className="btn secondary cart-close" onClick={() => setSidebarOpen(false)}>
            Close
          </button>

          <h2>Your Cart</h2>
          {cart.length === 0 && <p>No products in cart.</p>}
          {cart.map((item) => (
            <div key={item.product.id} className="cart-item">
              <p>
                {item.product.name} x {item.quantity} - €
                {Number(item.product.price) * item.quantity}
              </p>
              <button className="btn secondary" onClick={() => removeFromCart(item.product.id)}>
                Remove
              </button>
            </div>
          ))}

         {cart.length > 0 && (
  <>
    <p>Total: €{getTotal().toFixed(2)}</p>
    <button className="btn primary" onClick={handleCheckout} disabled={loadingOrder}>
      {loadingOrder ? "Processing..." : "Checkout"}
    </button>
  </>
)}
        </div>
      )}
    </main>
  );
}
