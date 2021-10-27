import { IAtributosUnidade , IAtributosUnidadeCriacao } from "../models/Unidade";
import AppError from "../errors/AppError";

import { CreateRequestHandler, DeleteRequestHandler, GetAllSimpleRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import UnidadeService from "../services/UnidadeService";
import { unidadeCreateValidationScheme } from "../validations/UnidadeValidations";

class UnidadeController {

  private Service!: UnidadeService;

  constructor(){
    this.Service = new UnidadeService();
  }

  public create: CreateRequestHandler<IAtributosUnidadeCriacao> = async (request, response) => {
    const scheme = unidadeCreateValidationScheme;

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { bairro, cep, cidade, logradouro, nome, numero } = request.body;

    const unidade = await this.Service.create({ bairro, cep: cep?.replace(/\D/g, ''), cidade, logradouro, nome, numero })
    response.status(201).json({
      id: unidade.id,
      criado: true
    })
  }

  public update: UpddateRequestHandler<IAtributosUnidadeCriacao> = async (request, response) => {
    const scheme = unidadeCreateValidationScheme;

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    } 

    const { bairro, cep, cidade, logradouro, nome, numero } = request.body;

    await this.Service.update({ bairro, cep: cep?.replace(/\D/g, ''), cidade, logradouro, nome, numero, id: Number(request.params.id) });
    response.status(201).json({
      atualizado: true,
      id: 0
    });
  }

  public delete: DeleteRequestHandler = async (request,response) => {
    await this.Service.delete(Number(request.params.id));
    response.status(200).json({
      deletado: true,
      dado: Number(request.params.id)
    });
  }

  // URI de exemplo: http://localhost:3000/api/unidade/1
  public get: GetRequestHandler<IAtributosUnidade> = async (request, response) => {
    const unidade = await this.Service.getById(Number(request.params.id));
    if (!unidade) {
      throw new AppError('Unidade não encontrada', 404);
    } else {
      response.status(200).json(unidade);
    }
  }

  // URI de exemplo: {{server}}/api/unidade
  public getAll: GetAllSimpleRequestHandler<IAtributosUnidade> = async (request, response) => {
    const unidades = await this.Service.getAll()
    response.status(200).json(unidades);
  }
}

export default UnidadeController;
