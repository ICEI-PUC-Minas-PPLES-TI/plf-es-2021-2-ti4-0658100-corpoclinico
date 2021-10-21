import Especialidade, { IAtributosEspecialidade, IAtributosEspecialidadeCriacao } from "../models/Especialidade";
import EspecialidadeService from "../services/EspecialidadeService";
import { especialidadeCreateValidationScheme, especialidadeUpdateValidationScheme } from "../validations/EspecialidadeValidations";

import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import AppError from "../errors/AppError";

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
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { identificacao } = request.body;

    await this.Service.create({ identificacao })
    .then((especialidade) => {
      return response.status(201).json({
        id: especialidade.id
      });
    })
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public delete: DeleteRequestHandler = async (request, response) => {
    await this.Service.delete(Number(request.params.id))
    .then(dado => {
      response.status(204).json({
        deletado: true,
        dado
      });
    })
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public update: UpddateRequestHandler<IAtributosEspecialidadeCriacao> = async (request, response) => {
    
    const scheme = especialidadeUpdateValidationScheme

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { identificacao } = request.body;
    const id = Number(request.params.id)

    const especialidade = await this.Service.getById(id)
    if (!especialidade) {
      throw new AppError("Especialidade não encontrada", 404)
    } else {
      await this.Service.update({ identificacao });
      response.status(200).json({});
    }
  }

  // URI de exemplo: http://localhost:3000/api/especialidade/1
  public get: GetRequestHandler<IAtributosEspecialidade> = async (request, response) => {

    const especialidade = await this.Service.getById(Number(request.params.id))
    if (!especialidade)
      throw new AppError("Especialidade não encontrada", 404)
    response.status(200).json(especialidade)
  }

  // URI de exemplo: http://localhost:3000/api/especialidade?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosEspecialidade> = async (request, response) => {
    const atributos = [
        "id",
        "nome",
    ];

    await this.Service.getAll(
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
  }
}

export default EspecialidadeController;
