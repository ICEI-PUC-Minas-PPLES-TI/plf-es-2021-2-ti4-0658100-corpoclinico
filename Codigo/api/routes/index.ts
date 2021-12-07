
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

// Iniciar controllers
const usuarioController = new UsuarioController();
const medicoController = new MedicoController();
const unidadeController = new UnidadeController();
const equipeController = new EquipeController();
const especialidadeController = new EspecialidadeController();
const arquivoController = new ArquivoController();
const retornoController = new RetornoController();

const multerUploadMedico = upload.fields(documentosMedico);

// Adicionar rotas
// Usuario
router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', [autenticacaoJwt.verificarToken], usuarioController.get)
router.get('/usuario', [autenticacaoJwt.verificarToken], usuarioController.getAll)
router.delete('/usuario/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], usuarioController.delete)
router.put('/usuario/:id',  usuarioController.update)
// Medico
router.post('/medico', multerUploadMedico, medicoController.create);
router.get('/medico/this', [autenticacaoJwt.verificarToken], medicoController.getThis);
router.get('/medico/:id', [autenticacaoJwt.verificarToken], medicoController.get)
router.get('/medico', [autenticacaoJwt.verificarToken], medicoController.getAll)
router.get('/me', [autenticacaoJwt.verificarToken], medicoController.getMe)
router.delete('/medico/:id', [autenticacaoJwt.verificarToken, autenticacaoJwt.isAdmin], medicoController.delete)
router.put('/medico/marcarAssistidos', [autenticacaoJwt.verificarToken, autenticacaoJwt.isMedico], medicoController.updateThisVideosAssitidos);
router.put('/medico/:id', [autenticacaoJwt.verificarToken], multerUploadMedico, medicoController.update)
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
// Unidade
router.get('/unidade/:id', [autenticacaoJwt.verificarToken], unidadeController.get)
router.put('/unidade/:id', unidadeController.update)
router.delete('/unidade/:id', unidadeController.delete)
router.get('/unidade', unidadeController.getAll)
router.post('/unidade', unidadeController.create)
// Arquivo
router.get('/arquivo/:id', arquivoController.download)
router.delete('/arquivo/:id', arquivoController.delete)
//Retorno
router.get('/retorno', [autenticacaoJwt.verificarToken], retornoController.getAll)
router.put('/retorno/:id', retornoController.update)

export default router;
