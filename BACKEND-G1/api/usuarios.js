const express = require('express');
const ruta = express.Router();
const db = require('../db/models/index.js');

ruta.get('/', async (req, res) => {
  const usuarios = await db.User.findAll({});
    res.json(usuarios);
});

ruta.post('/newUser', async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, estado, fecha_registro, tipo } = req.body;

    // Consultar el último id registrado
    const lastUser = await db.User.findOne({
      order: [['id', 'DESC']], // Ordenar por id descendente para obtener el último registrado
    });

    let nextId = 1; // Valor predeterminado si no hay usuarios registrados aún

    if (lastUser) {
      nextId = lastUser.id + 1;
    }

    // Crear el nuevo usuario con el id generado
    const newUser = await db.User.create({
      id: nextId, // Asignar el id generado
      nombre,
      apellido,
      correo,
      contraseña,
      estado,
      fecha_registro,
      tipo,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario', details: error.message });
  }
});


ruta.get('/:id', async (req, res) => {
  const usuarioId = req.params.id;

  const usuario = await db.User.findByPk(usuarioId, { include: 'ordenes' });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

ruta.put('/:id', async (req, res) => {
  const usuarioId = req.params.id;
  const { nombre, apellido, correo } = req.body;
  const usuario = await db.User.findByPk(usuarioId);
  if (usuario) {
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    await usuario.save();
    res.json({ message: 'Usuario actualizado correctamente', usuario });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

ruta.put('/update-password/:id', async (req, res) => {
  const usuarioId = req.params.id;
  const { nuevaContraseña } = req.body;
  const usuario = await db.User.findByPk(usuarioId);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  usuario.contraseña = nuevaContraseña;
  await usuario.save();
  res.json({ message: 'Contraseña actualizada correctamente' });
});

ruta.put('/:id/upEstado', async (req, res) => {
  const usuarioId = req.params.id;
  const usuario = await db.User.findByPk(usuarioId);
  if (usuario) {
    usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
    await usuario.save();
    res.json({ message: 'Estado del usuario actualizado correctamente', estado: usuario.estado });
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

module.exports = ruta;
