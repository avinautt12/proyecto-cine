require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// ---------------------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------------------

// Listar todos los directores
app.get('/api/directores', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT IDDirector, Director FROM Directores ORDER BY Director ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener directores', detalle: err.message });
  }
});

// Listar todas las categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT Identificador, Categoria FROM Categorias ORDER BY Categoria ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías', detalle: err.message });
  }
});

// Listar todas las películas con director y categoría (para la sala de cines)
app.get('/api/peliculas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.Identificador,
        p.Titulo,
        p.Duracion,
        p.Sinopsis,
        p.IDDirector,
        d.Director,
        p.IDCategoria,
        c.Categoria
      FROM Peliculas p
      INNER JOIN Directores d ON p.IDDirector = d.IDDirector
      INNER JOIN Categorias c ON p.IDCategoria = c.Identificador
      ORDER BY p.Titulo ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas', detalle: err.message });
  }
});

// Obtener el detalle de una película (para la pantalla de detalle)
app.get('/api/peliculas/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.Identificador,
        p.Titulo,
        p.Duracion,
        p.Sinopsis,
        p.IDDirector,
        d.Director,
        p.IDCategoria,
        c.Categoria
      FROM Peliculas p
      INNER JOIN Directores d ON p.IDDirector = d.IDDirector
      INNER JOIN Categorias c ON p.IDCategoria = c.Identificador
      WHERE p.Identificador = ?
    `, [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la película', detalle: err.message });
  }
});

// Películas filtradas por director
app.get('/api/directores/:id/peliculas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.Identificador,
        p.Titulo,
        p.Duracion,
        p.Sinopsis,
        p.IDDirector,
        d.Director,
        p.IDCategoria,
        c.Categoria
      FROM Peliculas p
      INNER JOIN Directores d ON p.IDDirector = d.IDDirector
      INNER JOIN Categorias c ON p.IDCategoria = c.Identificador
      WHERE p.IDDirector = ?
      ORDER BY p.Titulo ASC
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas del director', detalle: err.message });
  }
});

// Películas filtradas por categoría
app.get('/api/categorias/:id/peliculas', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.Identificador,
        p.Titulo,
        p.Duracion,
        p.Sinopsis,
        p.IDDirector,
        d.Director,
        p.IDCategoria,
        c.Categoria
      FROM Peliculas p
      INNER JOIN Directores d ON p.IDDirector = d.IDDirector
      INNER JOIN Categorias c ON p.IDCategoria = c.Identificador
      WHERE p.IDCategoria = ?
      ORDER BY p.Titulo ASC
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas de la categoría', detalle: err.message });
  }
});

// ---------------------------------------------------------------------------
// Arranque del servidor
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🎬 API de Cine corriendo en http://localhost:${PORT}`);
});

module.exports = app;
