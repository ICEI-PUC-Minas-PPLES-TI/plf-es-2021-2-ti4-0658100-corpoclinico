import { Includeable, Model, where } from "sequelize/types";
import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import Usuario from "../models/Usuario";

export default class MedicoService {

  async create(medico: IAtributosMedicoCriacao) {
    try {
      return Medico.create(medico);
    } catch (erro) {
      throw new AppError("Usuário não criado!", 500, erro);
    }
  }

  async update(medico: Partial<IAtributosMedico>) {
    return Medico.update(medico, {
      where: { id: medico.id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  // * Não é soft-delete nem hard-delete, apenas volta o status para 0.
  async delete(id: number, force?: boolean) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new AppError("Médico não encontrado!", 404);
    }
    try {
      if (force){
        medico.destroy({
          force
        })
      }
      else {
        medico.update({
          ativo: 0,
        });
      }
    } catch (error) {
      throw new AppError("Erro interno no servidor!", 500, error);
    }
    
    return medico;
  }

  async getById(id: number, include?: Includeable | Includeable[]) {
    return Medico.findOne({
      where: { id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getBy(field: keyof Medico, value: any) {
    return Medico.findOne({
      where: {
        [field]: value
      }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getAll(sortPaginate: ISortPaginateQuery, atributos: string[],) {
    return Medico.findAndCountAll()
      .then(async (dados) => {
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          { ...sortPaginate },
          atributos,
          dados.count
        );
        return {
          medicos: await Medico.findAll({
            attributes: atributos,
            ...SortPaginateOptions,
            include: [
              {
                model: Usuario,
                attributes: ['email', 'nome']
              }
            ]
          }),
          count: dados.count,
          paginas,
          offset: SortPaginateOptions.offset
        }
      })
      .catch (erro => {
        throw new AppError("Erro interno no servidor!", 500, erro);
      })
  }

}
