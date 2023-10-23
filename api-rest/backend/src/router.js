const express = require('express');

const router = express.Router();

const curriculoController = require('./controllers/curriculoController');
const curriculoMiddleware = require('./middlewares/curriculoMiddlewares');

router.get('/curriculo', curriculoController.getAll);
router.post('/curriculo', curriculoMiddleware.validateFieldTitle, curriculoController.createCurriculo);
router.delete('/curriculo/:id', curriculoController.deleteCurriculo);
router.put('/curriculo/:id',
curriculoMiddleware.validateFieldTitle,
curriculoMiddleware.validateFieldStatus,
  curriculoController.updateCurriculo,
);
module.exports = router;