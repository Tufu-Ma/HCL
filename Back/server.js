// Back/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gamesRoutes = require('./routes/games');

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:4200' }));
app.use(express.json());

// health
app.get('/', (_, res) => res.send('API running'));

// routes
app.use('/api/games', gamesRoutes);

// error handler แบบง่าย
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
