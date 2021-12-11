
import { Router } from 'express';
const router = Router()
import autenticacaoJwt from './verificarJwtToken';

// Importar controllers
import UsuarioController from '../controllers/UsuarioController';
import MedicoController from '../controllers/MedicoController';
import UnidadeController from '../controllers/UnidadeController';
import EquipeController from '../controllers/EquipeController';
import EspecialidadeController from '../controllers/EspecialidadeController';
import ArquivoController from '../controllers/ArquivoController';
import RetornoController from '../controllers/RetornoController';

import { upload } from '../helpers/files/MulterSettings';
import { documentosMedico } from '../helpers/files/DocumentosEnum';
import VideoController from '../controllers/VideoController';

// Iniciar controllers
const usuarioController = new UsuarioController();
const medicoController = new MedicoController();
const unidadeController = new UnidadeController();
const equipeController = new EquipeController();
const especialidadeController = new EspecialidadeController();
const arquivoController = new ArquivoController();
const videoController = new VideoController();
const retornoController = new RetornoController();

const multerUploadMedico = upload.fields(documentosMedico);

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.get)
router.get('/usuario', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin],  usuarioController.update)
// Medico
router.post('/medico', multerUploadMedico, medicoController.create);
router.get('/medico/this', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], medicoController.getThis);
router.get('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.get)
router.get('/medico', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.getAll)
router.get('/me', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], medicoController.getMe)
router.delete('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.delete)
router.put('/medico/marcarAssistidos', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], medicoController.updateThisVideosAssitidos);
router.put('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], multerUploadMedico, medicoController.update)
// Equipe
router.post('/equipe', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], equipeController.create)
router.get('/equipe/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], equipeController.get )
router.get('/equipe', equipeController.getAll)
router.delete('/equipe/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], equipeController.delete)
router.put('/equipe/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin],  equipeController.update)
// Especialidade
router.post('/especialidade', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], especialidadeController.create)
router.get('/especialidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], especialidadeController.get )
router.get('/especialidade', especialidadeController.getAll)
router.delete('/especialidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], especialidadeController.delete)
router.put('/especialidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin],  especialidadeController.update)
// Unidade
router.get('/unidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], unidadeController.get)
router.put('/unidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], unidadeController.update)
router.delete('/unidade/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], unidadeController.delete)
router.get('/unidade', unidadeController.getAll)
router.post('/unidade', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], unidadeController.create)
// Arquivo
router.get('/arquivo/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdminOrMedico], arquivoController.download)
router.delete('/arquivo/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], arquivoController.delete)
//Retorno
router.get('/retorno', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], retornoController.getAll)
router.put('/retorno/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], retornoController.update)
router.post('/retorno/review', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], retornoController.requestReview)
//Video
router.get('/video/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], videoController.get);
router.get('/video', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdminOrMedico], videoController.getAll);
router.post('/video', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], videoController.create);
router.put('/video/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], videoController.update);
router.delete('/video/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], videoController.delete);

export default router;
