import Especialidade, { IAtributosEspecialidade, IAtributosEspecialidadeCriacao } from "../models/Especialidade";
import EspecialidadeService from "../services/EspecialidadeService";
import { especialidadeCreateValidationScheme, especialidadeUpdateValidationScheme } from "../validations/EspecialidadeValidations";

import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

class EspecialidadeController {
  private Service!: EspecialidadeService;

  constructor(){
    this.Service = new EspecialidadeService();
  }

  public create: CreateRequestHandler<IAtributosEspecialidadeCriacao> = async (request, response) => {
      
    const scheme = especialidadeCreateValidationScheme;

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        criado: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { identificacao } = request.body;

    this.Service.create({ identificacao })
    .then((especialidade) => {
      return response.status(201).json({
        criado: true,
        id: especialidade.id
      });
    })
    .catch((erro) => {
      return response.status(500).json({
        criado: false,
        erros: erro.message
      });
    });
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public delete: DeleteRequestHandler = async (request, response) => {
    this.Service.delete(Number(request.params.id))
    .then(dado => {
      response.status(204).json({
        deletado: true,
        dado
      });
    })
    .catch(function(error) {
      response.status(500).json({
        deletado: false,
        errors: error
      });
    });
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public update: UpddateRequestHandler<IAtributosEspecialidadeCriacao> = async (request, response) => {
    
    const scheme = especialidadeUpdateValidationScheme

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (err: any) {
      return response.status(422).json({
        atualizado: false,
        nome: err.name, // => 'ValidationError'
        erros: err.errors
      });
    }

    const { identificacao } = request.body;
    const id = Number(request.params.id)

    const especialidade = await this.Service.getById(id)
    if (!especialidade) {
      response.status(404).json({
        atualizado: false,
        nome: "Especialidade não encontrada",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await this.Service.update({ identificacao });
      response.status(200).json({
        atualizado: true,
        id: especialidade.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public get: GetRequestHandler<IAtributosEspecialidade> = async (request, response) => {

    const especialidade = await this.Service.getById(Number(request.params.id))
    response.status( !especialidade ? 404 : 200 ).json(especialidade)
  }

  // URI de exemplo: http://localhost:3000/api/especialidade?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosEspecialidade> = async (request, response) => {
    const atributos = [
        "id",
        "nome",
    ];

    this.Service.getAll(
      {...request.query},
      atributos,
    )
    .then(({especialidades, count, paginas, offset}) => {
      response.status(200).json({
        dados: especialidades,
        quantidade: especialidades.length,
        total: count,
        paginas: paginas,
        offset: offset
      });
    })
    .catch(error => {
      response.status(500).json({
        titulo: "Erro interno do servidor!",
        error
      });
    });
  }
}

export default EspecialidadeController;
