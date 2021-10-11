import Unidade, { IAtributosUnidade , IAtributosUnidadeCriacao } from "../models/Unidade";
import AppError from "../errors/AppError";

import { SortPaginate } from "../helpers/SortPaginate";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, GetAllSimpleRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

class UnidadeController {
  // URI de exemplo: http://localhost:3000/api/unidade/1
  public get: GetRequestHandler<IAtributosUnidade> = async (request, response) => {
    const unidade = await Unidade.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!unidade) {
      response.status(404).json(unidade);
    } else {
      response.status(200).json(unidade);
    }
  }

  // URI de exemplo: {{server}}/api/unidade
  public getAll: GetAllSimpleRequestHandler<IAtributosUnidade> = async (request, response) => {
    Unidade.findAll()
      .then(unidades => {
        response.status(200).json(unidades);
      })
      .catch(error => {
        throw new AppError("Erro interno do servidor!: " + JSON.stringify(error), 500)
      });
  }
}

export default UnidadeController;
