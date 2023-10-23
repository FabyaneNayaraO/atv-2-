const tasksCurriculo = require('../models/curriculoModels');

const getAll = async (_request, response) => {
  const curriculo = await tasksCurriculo.getAll();
  return response.status(200).json(curriculo);
};

const createCurriculo = async (request, response) => {
  const createdCurriculo = await tasksCurriculo.createCurriculo(request.body);
  return response.status(201).json(createdCurriculo);
};

const deleteCurriculo = async (request, response) => {
  const { id } = request.params;

  await tasksCurriculo.deleteCurriculo(id);
  return response.status(204).json();
};

const updateCurriculo = async (request, response) => {
  const { id } = request.params;

  await tasksCurriculo.updateCurriculo(id, request.body);
  return response.status(204).json();
};

module.exports = {
  getAll,
  createCurriculo,
  deleteCurriculo,
  updateCurriculo,
};