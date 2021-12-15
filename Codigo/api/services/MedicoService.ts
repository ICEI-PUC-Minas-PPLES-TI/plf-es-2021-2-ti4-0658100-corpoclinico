import { Includeable, Model, where } from "sequelize/types";
import { Op, Sequelize } from "sequelize";
import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Candidatura from "../models/Candidatura";
import Medico, {
  IAtributosMedico,
  IAtributosMedicoCriacao
} from "../models/Medico";
import Usuario from "../models/Usuario";
import { IGetAllMedicoFilter } from "../types/Requests";
import Retorno from "../models/Retorno";

export default class MedicoService {
  async create(medico: IAtributosMedicoCriacao) {
    try {
      return await Medico.create(medico);
    } catch (erro) {
      throw new AppError("Usuário não criado!", 500, erro);
    }
  }

  async update(medico: Partial<IAtributosMedico>) {
    const alterado = await Medico.findByPk(medico.id);
    if (!alterado)
      throw new AppError("Médico não encontrado!", 404);
    await alterado.update(medico);
    return alterado;
  }

  // * Não é soft-delete nem hard-delete, apenas volta o status para 0.
  async delete(id: number, force?: boolean) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new AppError("Médico não encontrado!", 404);
    }
    try {
      if (force){
        await medico.destroy({
          force
        })
      }
      else {
        await medico.update({
          ativo: 0,
        });
      }
    } catch (error) {
      throw new AppError("Erro interno no servidor!", 500, error);
    }

    return medico;
  }

  async getById(id: number, include?: Includeable | Includeable[]) {
    return await Medico.findOne({
      where: { id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getBy(field: keyof Medico, value: any) {
    return await Medico.findOne({
      where: {
        [field]: value
      }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getAll(sortPaginate: ISortPaginateQuery, atributos: string[], filtros: IGetAllMedicoFilter) {

    // Caso não seja passada uma dt_fim, será o dia de hoje
    // Caso não seja passada uma dt_inicio, será 01/01/1970
    const todayDate = new Date().toISOString().slice(0, 10);
    const pastDate = new Date("1970-01-01").toISOString().slice(0, 10);
    const dataFim: any = filtros.dt_fim ? filtros.dt_fim : todayDate;
    const dataInicio: any = filtros.dt_inicio ? filtros.dt_inicio : pastDate;

    const whereRetoro = (filtros.idAvalidor && filtros.status) ? {
      avaliador_id: filtros.idAvalidor,
      status: filtros.status
    } : filtros.idAvalidor ? {
      avaliador_id: filtros.idAvalidor
    } : filtros.status ? {
      status: filtros.status
    } : undefined

    return await Medico.findAndCountAll({
      order: [
        [{ model: Candidatura, as: "candidatura" }, { model: Retorno, as: 'retornos',}, 'id', "DESC"]
      ],
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["email", "nome"],
          where: {
            nome: {
              [Op.like]: `%${filtros.nome ? filtros.nome : ""}%` /* Se não passar nome será todos */
            }
          }
        },
        {
          model: Candidatura,
          as: "candidatura",
          attributes: [
            "cnpj",
            "faturamento",
            "equipe_id",
            "unidade_id",
            "data_criado"
          ],
          include: [{
            model: Retorno, as: 'retornos',
            required: (filtros.status || filtros.idAvalidor) ? true : false,
            where: whereRetoro
          }],
          where: {
            data_criado: {
              [Op.between]: [dataInicio, dataFim]
            }
          },
          required: (filtros.status || filtros.idAvalidor) ? true : false,

        }
      ],

    })
      .then(async dados => {
        const count: number = dados.count as any;
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          { ...sortPaginate },
          atributos,
          count
        );
        return {
          medicos: dados.rows,
          count: dados.count,
          paginas,
          offset: SortPaginateOptions.offset
        };
      })
      .catch (erro => {
        throw new AppError("Erro interno no servidor!", 500, erro);
      })
  }
}
