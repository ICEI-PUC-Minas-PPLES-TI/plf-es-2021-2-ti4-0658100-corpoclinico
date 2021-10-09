
import { Router } from 'express';
const router = Router()
import autenticacaoJwt from './verificarJwtToken';
import multer from 'multer';

const upload = multer({dest: './api/uploads/'});

// Importar controllers
import UsuarioController from '../controllers/UsuarioController';
import MedicoController from '../controllers/MedicoController';
import EquipeController from '../controllers/EquipeController';

// Iniciar controllers
const usuarioController = new UsuarioController();
const medicoController = new MedicoController();
const equipeController = new EquipeController();

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get )
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.update)
// Medico
router.post('/medico', upload.single('file'), medicoController.create)
router.get('/medico/:id', [autenticacaoJwt.verificarToken], medicoController.get )
router.get('/medico', [autenticacaoJwt.verificarToken], medicoController.getAll)
router.delete('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.delete)
router.put('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.update)
// Equipe
router.post('/equipe', equipeController.create)
router.get('/equipe/:id', equipeController.get )
router.get('/equipe', equipeController.getAll)
router.delete('/equipe/:id', equipeController.delete)
router.put('/equipe/:id',  equipeController.update)


export default router;
