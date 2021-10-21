import Equipe, { IAtributosEquipe, IAtributosEquipeCriacao } from "../models/Equipe";
import EquipeService from "../services/EquipeService";
import { equipeCreateValidationScheme, equipeUpdateValidationScheme } from "../validations/EquipeValidations";

import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import EspecialidadeService from "../services/EspecialidadeService";
import AppError from "../errors/AppError";

class EquipeController {
  private Service!: EquipeService;
  private EspecialidadeService!: EspecialidadeService

  constructor(){
    this.Service = new EquipeService();
    this.EspecialidadeService = new EspecialidadeService();
  }

  public create: CreateRequestHandler<IAtributosEquipeCriacao> = async (request, response) => {
      
    const scheme = equipeCreateValidationScheme;

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { nome, especialidade_id } = request.body;

    // vê se a especialidade existe
    const especialidade = await this.EspecialidadeService.getById(especialidade_id);
    if (!especialidade){
      throw new AppError("Erro na validação de um ou mais campos", 422, "especialidade_id não existe no banco")
    }

    await this.Service.create({ nome, especialidade_id })
    .then((equipe) => {
      return response.status(201).json({
        id: equipe.id
      });
    })
  }

  // URI de exemplo: http://localhost:3000/api/equipe/1
  public delete: DeleteRequestHandler = async (request, response) => {
    await this.Service.delete(Number(request.params.id))
    .then(dado => {
      response.status(204).json({});
    })
  }

  // URI de exemplo: http://localhost:3000/api/equipe/1
  public update: UpddateRequestHandler<IAtributosEquipeCriacao> = async (request, response) => {
    
    const scheme = equipeUpdateValidationScheme

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { nome, especialidade_id } = request.body;
    const id = Number(request.params.id)

    // vê se a especialidade existe
    if (especialidade_id){
      const especialidade = await this.EspecialidadeService.getById(especialidade_id);
      if (!especialidade){
        throw new AppError("Erro na validação de um ou mais campos", 422, "especialidade_id não existe no banco");
      }
    }
    

    const equipe = await this.Service.getById(id)
    if (!equipe) {
      throw new AppError('Unidade não encontrada', 404);
    } else {
      await this.Service.update({ id: equipe.get().id, nome, especialidade_id });
      response.status(200).json({});
    }
  }

  // URI de exemplo: http://localhost:3000/api/equipe/1
  public get: GetRequestHandler<IAtributosEquipe> = async (request, response) => {

    const equipe = await this.Service.getById(Number(request.params.id))
    if (!equipe) {
      throw new AppError('Equipe não encontrada', 404);
    } else {
      response.status(200).json(equipe);
    }
  }

  // URI de exemplo: http://localhost:3000/api/equipe?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosEquipe> = async (request, response) => {
    const atributos = [
        "id",
        "nome",
    ];

    await this.Service.getAll(
      {...request.query},
      atributos,
    )
    .then(({equipes, count, paginas, offset}) => {
      response.status(200).json({
        dados: equipes,
        quantidade: equipes.length,
        total: count,
        paginas: paginas,
        offset: offset
      });
    })
  }
}

export default EquipeController;
