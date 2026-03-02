const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      price REAL,
      image TEXT
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO products (id, name, description, price, image)
    VALUES
    (1, 'Notebook', 'Gaming notebook', 3500, ''),
    (2, 'Mouse', 'Wireless mouse', 150, ''),
    (3, 'Keyboard', 'Mechanical keyboard', 400, '')
  `);
});

let cart = [];

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { productId, quantity } = req.body;

  if (quantity < 1 || quantity > 10)
    return res.status(400).json({ message: "Quantity must be between 1 and 10" });

  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.json(cart);
});

app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.productId !== id);
  res.json(cart);
});

app.post("/api/order", (req, res) => {
  if (cart.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  cart = [];
  res.json({ message: "Order successfully placed!" });
});

app.listen(3001, () => console.log("Backend running on port 3001"));
