export default function ProductsPage() {
  const products = [
    { id: 1, name: "Product 1", price: "19.99", image: "/placeholder.png" },
    { id: 2, name: "Product 2", price: "29.99", image: "/placeholder.png" },
    { id: 3, name: "Product 3", price: "39.99", image: "/placeholder.png" },
  ];

  return (
    <main>
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>€{p.price}</p>
            <button className="primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}
