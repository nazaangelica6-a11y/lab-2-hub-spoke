const express = require('express');

const app = express();
const PORT = 5002;

const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Tablet', price: 399.99 },
  { id: 4, name: 'Headphones', price: 149.99 },
  { id: 5, name: 'Keyboard', price: 79.99 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/ping', (req, res) => {
  res.json({ service: 'product-service', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Product Service running on http://localhost:${PORT}`);
});