
const { Router } = require('express')
const router = Router()
const autenticacaoJwt = require('./verificarJwtToken.js');

// Importar controllers
const UsuarioController  = require('../controllers/UsuarioController.js');

// Iniciar controllers
const usuarioController = new UsuarioController();

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get)
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.update)

module.exports = router
