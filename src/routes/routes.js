const express = require('express');

const router = express.Router();

const Frota = require('../controller/usuario');
const Manutencao = require('../controller/publicacao');
const Motoristas = require('../controller/publicacao');
const Operacoes = require('../controller/publicacao');
const User = require('../controller/publicacao');

router.post('/usuario', Usuario.create);
router.post('/login', Usuario.login);
router.get('/usuarios', Usuario.read);
router.get('/usuario/:id', Usuario.readOne);

router.post('/publicacao', Publicacao.create);
router.get('/publicacoes', Publicacao.read);

module.exports = router;