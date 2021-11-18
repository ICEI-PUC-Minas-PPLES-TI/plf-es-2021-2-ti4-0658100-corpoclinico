import { IAtributosRetorno , IAtributosRetornoCriacao } from "../models/Retorno";
import AppError from "../errors/AppError";

import { GetAllSimpleRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import RetornoService from "../services/RetornoService";
import { retornoUpdateScheme } from "../validations/RetornoValidations";

class RetornoController {

  private Service!: RetornoService;

  constructor(){
    this.Service = new RetornoService();
  }

  public update: UpddateRequestHandler<IAtributosRetornoCriacao> = async (request, response) => {
    const id = Number(request.params.id);
    const scheme = retornoUpdateScheme;

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const retorno = await this.Service.getById(id);
    if (!retorno)
        throw new AppError("Retorno não encontrado", 404);

    const { status, comentario } = request.body;

    await this.Service.update({ status, comentario });
    response.status(201).json({});
  }

  // URI de exemplo: http://localhost:3000/api/retorno/1
  public get: GetRequestHandler<IAtributosRetorno> = async (request, response) => {
    const retorno = await this.Service.getById(Number(request.params.id));
    if (!retorno) {
      throw new AppError('Retorno não encontrada', 404);
    } else {
      response.status(200).json(retorno);
    }
  }

  // URI de exemplo: {{server}}/api/retorno
  public getAll: GetAllSimpleRequestHandler<IAtributosRetorno> = async (request, response) => {
    const usuarioLogadoId = Number(request.headers.authorization);
    const retornos = await this.Service.getAllBy("avaliador_id", usuarioLogadoId)
    response.status(200).json(retornos);
  }
}

export default RetornoController;
