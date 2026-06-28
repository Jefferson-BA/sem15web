const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // habilita CORS para tu frontend
app.use(express.json());

// Rutas principales
app.use('/api/products', productsRouter);
app.use('/api/auth', authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
