
import { Router } from 'express';
const router = Router()
import autenticacaoJwt from './verificarJwtToken';

// Importar controllers
import UsuarioController from '../controllers/UsuarioController';

// Iniciar controllers
const usuarioController = new UsuarioController();

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get )
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.update)

export default router;
