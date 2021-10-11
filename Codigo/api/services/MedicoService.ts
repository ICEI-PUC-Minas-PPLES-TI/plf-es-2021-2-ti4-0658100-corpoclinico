import { Model, where } from "sequelize/types";
import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/sortPaginate";
import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import Usuario from "../models/Usuario";

export default class MedicoService {

  async create(medico: IAtributosMedicoCriacao) {
    try {
      return Medico.create(medico);
    } catch (erro) {
      throw new AppError("Usuário não criado!" + erro, 500);
    }
  }

  async update(medico: Partial<IAtributosMedico>) {
    return Medico.update(medico, {
      where: { id: medico.id }
    });
  }

  // * Não é soft-delete nem hard-delete, apenas volta o status para 0.
  async delete(id: number) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new AppError("Médico não encontrado!", 404);
    }
    medico.update({
      ativo: 0,
    });
    return medico;
  }

  async getById(id: number) {
    return Medico.findOne({
      where: { id }
    })
  }

  async getBy(field: keyof Medico, value: any) {
    return Medico.findOne({
      where: {
        [field]: value
      }
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
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

}
