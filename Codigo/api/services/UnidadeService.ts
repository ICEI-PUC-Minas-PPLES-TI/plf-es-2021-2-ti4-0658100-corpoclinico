import AppError from "../errors/AppError";
import Unidade, { IAtributosUnidade, IAtributosUnidadeCriacao } from "../models/Unidade";

export default class UnidadeService {

  async create(unidade: IAtributosUnidadeCriacao) {
    return Unidade.create(unidade)
    .catch (error => {
      throw new AppError("Usuário não criado!", 500, error);
    })
  }

  async update(unidade: Partial<IAtributosUnidade>) {
    return Unidade.update(unidade, {
      where: { id: unidade.id }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async delete(id: number) {
    const unidade = await Unidade.findByPk(id);
    if (!unidade) {
      throw new AppError("Unidade não encontrada!", 404);
    }
    unidade.update({
      ativo: false,
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
    return unidade;
  }

  async getById(id: number) {
    return Unidade.findOne({
      where: { id }
    })
  }

  async getBy(field: keyof Unidade, value: any) {
    return Unidade.findOne({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getAll() {
    return Unidade.findAll({
        attributes: ['id', 'nome']
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

}
