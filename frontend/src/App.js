import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
    api.get("/cart").then(res => setCart(res.data));
  }, []);

  const addToCart = (id) => {
    api.post("/cart", { productId: id, quantity: 1 })
      .then(res => setCart(res.data));
  };

  const updateQuantity = (id, quantity) => {
    api.post("/cart", { productId: id, quantity })
      .then(res => setCart(res.data));
  };

  const removeItem = (id) => {
    api.delete(`/cart/${id}`)
      .then(res => setCart(res.data));
  };

  const checkout = () => {
    api.post("/order").then(() => {
      alert("Order completed successfully!");
      setCart([]);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <strong>R$ {product.price}</strong>
          <br />
          <button onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}

      <h1>Cart</h1>

      {cart.map(item => (
        <div key={item.productId} style={{ margin: 10 }}>
          Product ID: {item.productId}
          <br />
          Quantity:
          <input
            type="number"
            min="1"
            max="10"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.productId, parseInt(e.target.value))
            }
          />
          <button onClick={() => removeItem(item.productId)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={checkout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default App;