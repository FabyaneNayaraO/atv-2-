const database = require('./database');

const getAll = async () => {
  const [curriculo] = await database.execute('SELECT * FROM curriculo');
  return curriculo;
};

const createCurriculo = async (curriculo) => {
  const { nome } = curriculo;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO curriculo(nome, email, formacao, experiencia, criacao) VALUES (?, ?, ?, ?, ?)';

  const [createdCurriculo] = await database.execute(query, [nome, '', '', '',  dateUTC]);
  return {insertId: createdCurriculo.insertId};
};

const deleteCurriculo = async (id) => {
  const [removedCurriculo] = await database.execute('DELETE FROM curriculo WHERE id = ?', [id]);
  return removedCurriculo;
};

const updateCurriculo = async (id, curriculo) => {
  const { nome, email, formacao, experiencia } = curriculo;
  
  const query = 'UPDATE curriculo SET nome = ?, email = ?, formacao = ?, experiencia = ? WHERE id = ?';

  const [updatedCurriculo] = await database.execute(query, [nome, email, formacao, experiencia, id]);
  return updatedCurriculo;
};

module.exports = {
  getAll,
  createCurriculo,
  deleteCurriculo,
  updateCurriculo,
};