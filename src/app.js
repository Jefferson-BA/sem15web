const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

module.exports = app;
