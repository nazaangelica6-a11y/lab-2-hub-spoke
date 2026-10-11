const express = require('express');

const app = express();
const PORT = 5001;

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  { id: 4, name: 'Diana', email: 'diana@example.com' },
  { id: 5, name: 'Eve', email: 'eve@example.com' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/ping', (req, res) => {
  res.json({ service: 'user-service', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});