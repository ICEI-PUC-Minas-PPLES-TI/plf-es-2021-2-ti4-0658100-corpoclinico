
import { Router } from 'express';
const router = Router()
import autenticacaoJwt from './verificarJwtToken';

// Importar controllers
import UsuarioController from '../controllers/UsuarioController';
import MedicoController from '../controllers/MedicoController';

// Iniciar controllers
const usuarioController = new UsuarioController();
const medicoController = new MedicoController();

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get )
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.update)
// Medico
router.post('/medico', medicoController.create)
router.get('/medico/:id', [autenticacaoJwt.verificarToken], medicoController.get )
router.get('/medico', [autenticacaoJwt.verificarToken], medicoController.getAll)
router.delete('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.delete)
router.put('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.update)

export default router;
