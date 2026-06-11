const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const {
  DB_HOST = 'decimas-db',
  DB_USER = 'root',
  DB_PASSWORD = 'admin123',
  DB_NAME = 'decimas_db',
  DB_PORT = '3306',
  PORT = '3001',
} = process.env;

let pool;

async function initDb() {
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
  });
}

function handleError(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend de décimas en ejecución.' });
});

app.get('/api/decimas', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, titulo, autor, contenido, fecha_creacion FROM decimas ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});

app.post('/api/decimas', async (req, res) => {
  const { titulo, autor, contenido } = req.body;
  if (!titulo || !autor || !contenido) {
    return res.status(400).json({ error: 'titulo, autor y contenido son requeridos' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO decimas (titulo, autor, contenido) VALUES (?, ?, ?)',
      [titulo, autor, contenido]
    );
    const [rows] = await pool.query('SELECT * FROM decimas WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    handleError(res, err);
  }
});

app.delete('/api/decimas/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM decimas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Décima no encontrada' });
    }
    res.json({ message: 'Décima eliminada' });
  } catch (err) {
    handleError(res, err);
  }
});

app.listen(Number(PORT), async () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  await initDb();
  console.log('Conexión a base de datos establecida');
});
