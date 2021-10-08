import { Model, where } from "sequelize/types";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";

export default class MedicoService {
  async create(medico: IAtributosMedicoCriacao) {
    return Medico.create(medico);
  }
  async update(medico: Partial<IAtributosMedico>) {
    return Medico.update(medico, {
      where: { id: medico.id }
    });
  }
  async delete(id: number) {
    return Medico.destroy({
      where: { id }
    })
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
