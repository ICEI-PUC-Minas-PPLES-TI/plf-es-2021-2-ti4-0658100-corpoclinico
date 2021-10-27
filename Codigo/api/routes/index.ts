
import { Router } from 'express';
const router = Router()
import autenticacaoJwt from './verificarJwtToken';

// Importar controllers
import UsuarioController from '../controllers/UsuarioController';
import MedicoController from '../controllers/MedicoController';
import UnidadeController from '../controllers/UnidadeController';
import EquipeController from '../controllers/EquipeController';
import EspecialidadeController from '../controllers/EspecialidadeController';

import { upload } from '../helpers/files/MulterSettings'; 
import { documentosMedico } from '../helpers/files/DocumentosEnum'; 

// Iniciar controllers
const usuarioController = new UsuarioController();
const medicoController = new MedicoController();
const unidadeController = new UnidadeController();
const equipeController = new EquipeController();
const especialidadeController = new EspecialidadeController();

const multerUploadMedico = upload.fields(documentosMedico);

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get)
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.update)
// Medico
router.post('/medico', multerUploadMedico, medicoController.create)
router.get('/medico/:id', [autenticacaoJwt.verificarToken], medicoController.get)
router.get('/medico', [autenticacaoJwt.verificarToken], medicoController.getAll)
router.delete('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.delete)
router.put('/medico/:id', multerUploadMedico, medicoController.update)
// Equipe
router.post('/equipe', equipeController.create)
router.get('/equipe/:id', equipeController.get )
router.get('/equipe', equipeController.getAll)
router.delete('/equipe/:id', equipeController.delete)
router.put('/equipe/:id',  equipeController.update)
// Especialidade
router.post('/especialidade', especialidadeController.create)
router.get('/especialidade/:id', especialidadeController.get )
router.get('/especialidade', especialidadeController.getAll)
router.delete('/especialidade/:id', especialidadeController.delete)
router.put('/especialidade/:id',  especialidadeController.update)

router.get('/unidade/:id', [autenticacaoJwt.verificarToken], unidadeController.get)
router.get('/unidade', unidadeController.getAll)

export default router;
