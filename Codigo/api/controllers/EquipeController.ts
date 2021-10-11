import Equipe, { IAtributosEquipe, IAtributosEquipeCriacao } from "../models/Equipe";
import EquipeService from "../services/EquipeService";
import { equipeCreateValidationScheme, equipeUpdateValidationScheme } from "../validations/EquipeValidations";

import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

interface IAtributosEquipeCriacaoRequest{
    nome: string,
    especialidade: string
}

class EquipeController {
  private Service!: EquipeService;

  constructor(){
    this.Service = new EquipeService();
  }

  public create: CreateRequestHandler<IAtributosEquipeCriacaoRequest> = async (request, response) => {
      
    const scheme = equipeCreateValidationScheme;

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

    const { nome, especialidade: identificacao } = request.body;

    this.Service.create({ nome, especialidade: { identificacao } })
    .then((equipe) => {
      return response.status(201).json({
        criado: true,
        id: equipe.id
      });
    })
    .catch((erro) => {
      return response.status(500).json({
        criado: false,
        erros: erro.message
      });
    });
  }

  // URI de exemplo: http://localhost:3000/api/equipe/1
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

  // URI de exemplo: http://localhost:3000/api/equipe/1
  public update: UpddateRequestHandler<IAtributosEquipeCriacaoRequest> = async (request, response) => {
    
    const scheme = equipeUpdateValidationScheme

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

    const { nome, especialidade: identificacao } = request.body;
    const id = Number(request.params.id)

    const equipe = await this.Service.getById(id)
    if (!equipe) {
      response.status(404).json({
        atualizado: false,
        nome: "Equipe não encontrada",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await this.Service.update({ ...equipe.get(), nome, especialidade: { identificacao } });
      response.status(200).json({
        atualizado: true,
        id: equipe.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/equipe/1
  public get: GetRequestHandler<IAtributosEquipe> = async (request, response) => {

    const equipe = await this.Service.getById(Number(request.params.id))
    if (!equipe) {
      response.status(404).json(equipe);
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

    this.Service.getAll(
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
    .catch(error => {
      response.status(500).json({
        titulo: "Erro interno do servidor!",
        error
      });
    });
  }
}

export default EquipeController;
