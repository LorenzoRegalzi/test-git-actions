export default function ProductsPage() {
  const products = [
    { id: 1, name: "Prodotto 1", price: "19.99", image: "/placeholder.png" },
    { id: 2, name: "Prodotto 2", price: "29.99", image: "/placeholder.png" },
    { id: 3, name: "Prodotto 3", price: "39.99", image: "/placeholder.png" },
  ];

  return (
    <main>
      <h1>I nostri prodotti</h1>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price} €</p>
            <button className="primary">Aggiungi al carrello</button>
          </div>
        ))}
      </div>
    </main>
  );
}
