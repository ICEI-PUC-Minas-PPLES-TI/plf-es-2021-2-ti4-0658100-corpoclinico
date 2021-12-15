import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import MedicoEspecialidade, { IAtributosMedicoEspecialidade, IAtributosMedicoEspecialidadeCriacao } from "../models/MedicoEspecialidade";

export default class MedicoEspecialidadeService {

  async create(medicoEspecialidade: IAtributosMedicoEspecialidadeCriacao) {
    const medicoEspecialidadeCriada = await MedicoEspecialidade.create(medicoEspecialidade)
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
    return medicoEspecialidadeCriada;
  }

  async update(medicoEspecialidade: Partial<IAtributosMedicoEspecialidade>) {
    return await MedicoEspecialidade.update(medicoEspecialidade, {
      where: { id: medicoEspecialidade.id }
    })
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

  async delete(id: number) {
    const medicoEspecialidade = await this.getById(id);
    if (!medicoEspecialidade) {
      throw new AppError("Usuário não encontrado!", 404);
    }
    return MedicoEspecialidade.destroy({
      where: { id }
    })
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

  async getById(id: number, paranoid?: boolean) {
    return await MedicoEspecialidade.findOne({
      where: { id },
      paranoid
    })
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

  async getBy(field: keyof IAtributosMedicoEspecialidade, value: any, attributes?: Array<keyof IAtributosMedicoEspecialidade>) {
    return await MedicoEspecialidade.findOne({
      where: {
        [field]: value
      },
      attributes
    })
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

  async getAll(sortPaginate: ISortPaginateQuery) {
    const atributos = Object.keys(
      MedicoEspecialidade.rawAttributes
    ) /* Todos os atributos de usuário */

    return await MedicoEspecialidade.findAndCountAll()
      .then(async (dados) => {
        const count: number = (dados.count) as any;
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          { ...sortPaginate },
          atributos,
          count
        );
        return {
          dados: await MedicoEspecialidade.findAll({
            attributes: atributos,
            ...SortPaginateOptions,
          }),
          paginas,
          offset: SortPaginateOptions.offset,
          total: dados.count
        }
      })
      .catch((err) => {
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

}
