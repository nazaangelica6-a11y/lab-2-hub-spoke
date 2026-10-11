const express = require('express');

const app = express();
const PORT = 5003;

const orders = [
  { id: 101, userId: 1, productId: 1, quantity: 2, total: 1999.98 },
  { id: 102, userId: 2, productId: 3, quantity: 1, total: 399.99 },
  { id: 103, userId: 3, productId: 2, quantity: 3, total: 2099.97 },
  { id: 104, userId: 4, productId: 4, quantity: 1, total: 149.99 },
  { id: 105, userId: 5, productId: 5, quantity: 2, total: 159.98 }
];

app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/ping', (req, res) => {
  res.json({ service: 'order-service', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Order Service running on http://localhost:${PORT}`);
});