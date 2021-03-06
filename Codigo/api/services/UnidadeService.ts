import AppError from "../errors/AppError";
import Unidade, { IAtributosUnidade, IAtributosUnidadeCriacao } from "../models/Unidade";

export default class UnidadeService {

  async create(unidade: IAtributosUnidadeCriacao) {
    return await Unidade.create(unidade)
    .catch (error => {
      throw new AppError("Usuário não criado!", 500, error);
    })
  }

  async update(unidade: Partial<IAtributosUnidade>) {
    return await Unidade.update(unidade, {
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
    await unidade.update({
      ativo: false,
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
    return unidade;
  }

  async getById(id: number) {
    return await Unidade.findOne({
      where: { id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getBy(field: keyof Unidade, value: any) {
    return await Unidade.findOne({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getAll() {
    return await Unidade.findAll()
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

}
