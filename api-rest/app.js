const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM curriculos');
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.get('/buscar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM curriculos WHERE id = $1', [id]);
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/enviar', async (req, res) => {
  const { nome, email, telefone, formacao, experiencia } = req.body;
  try {
    const nomePessoa = await pool.query('SELECT * FROM curriculos WHERE nome = $1', [nome]);
    if (!nomePessoa.rows[0]) {
      const newCurriculo = await pool.query('INSERT INTO curriculos (nome, email, telefone, formacao, experiencia) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, email, telefone, formacao, experiencia]);
      res.status(200).send(newCurriculo.rows);
    } else {
      res.status(400).send('Nome já existe');
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/atualizar/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateCurriculo = await pool.query('UPDATE curriculos SET nome = $1, email = $2, telefone = $3, formacao = $4, experiencia = $5 WHERE id = $6 RETURNING *', [data.nome, data.email, data.telefone, data.formacao, data.experiencia, id]);
    res.status(200).send(updateCurriculo.rows);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/deletar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCurriculo = await pool.query('DELETE FROM curriculos WHERE id = $1 RETURNING *', [id]);
    res.status(200).send({
      message: 'Currículo excluído com sucesso',
      deletedCurriculo: deletedCurriculo.rows,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));
