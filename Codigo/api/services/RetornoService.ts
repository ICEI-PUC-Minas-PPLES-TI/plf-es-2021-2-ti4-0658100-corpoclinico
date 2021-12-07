import AppError from "../errors/AppError";
import Retorno, { IAtributosRetorno, IAtributosRetornoCriacao } from "../models/Retorno";

export default class RetornoService {

  async create(retorno: IAtributosRetornoCriacao) {
    return await Retorno.create(retorno)
    .catch (error => {
      throw new AppError("Retorno não criado!", 500, error);
    })
  }

  async update(retorno: Partial<IAtributosRetorno>) {
    return Retorno.update(retorno, {
      where: { id: retorno.id }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async delete(id: number) {
    const retorno = await Retorno.findByPk(id);
    if (!retorno) {
      throw new AppError("Retorno não encontrada!", 404);
    }
    retorno.update({
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
    return retorno;
  }

  async getById(id: number) {
    return Retorno.findOne({
      where: { id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getBy(field: keyof Retorno, value: any) {
    return Retorno.findOne({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }
  async getAllBy(field: keyof Retorno, value: any) {
    return Retorno.findAll({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getAll() {
    return Retorno.findAll()
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

}
