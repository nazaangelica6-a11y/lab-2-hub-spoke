const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const SERVICES = {
  users: 'http://localhost:5001',
  products: 'http://localhost:5002',
  orders: 'http://localhost:5003'
};

// Dashboard - Get data from all services
app.get('/api/dashboard', async (req, res) => {
  try {
    const [users, products, orders] = await Promise.all([
      axios.get(`${SERVICES.users}/users`),
      axios.get(`${SERVICES.products}/products`),
      axios.get(`${SERVICES.orders}/orders`)
    ]);

    res.json({
      users: users.data,
      products: products.data,
      orders: orders.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch data from services'
    });
  }
});

// Check status of all services
app.get('/api/status', async (req, res) => {
  const results = {};

  for (const [name, url] of Object.entries(SERVICES)) {
    try {
      const response = await axios.get(`${url}/ping`);
      results[name] = response.data;
    } catch (error) {
      results[name] = {
        status: 'down'
      };
    }
  }

  res.json(results);
});

// Individual service endpoints
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.users}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'User service unavailable' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.products}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Product service unavailable' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get(`${SERVICES.orders}/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Order service unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});