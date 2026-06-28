const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, role });

    res.status(201).json({ success: true, message: 'Usuario registrado correctamente', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: 'JWT_SECRET no está definido en .env' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // ✅ incluye username en el payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    const { id, username, role } = req.user;
    res.json({ success: true, data: { id, username, role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
