import { Op, Sequelize } from "sequelize";
import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Candidatura from "../models/Candidatura";
import Medico, {
  IAtributosMedico,
  IAtributosMedicoCriacao
} from "../models/Medico";
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
  async delete(id: number, force?: boolean) {
    const medico = await Medico.findByPk(id);
    if (!medico) {
      throw new AppError("Médico não encontrado!", 404);
    }
    if (force) {
      medico.destroy({
        force
      });
    }
    medico.update({
      ativo: 0
    });
    return medico;
  }

  async getById(id: number) {
    return Medico.findOne({
      where: { id }
    });
  }

  async getBy(field: keyof Medico, value: any) {
    return Medico.findOne({
      where: {
        [field]: value
      }
    });
  }

  async getAll(sortPaginate: ISortPaginateQuery, atributos: string[], filtros: Map<String, String>) {

    const todayDate = new Date().toISOString().slice(0, 10);
    const pastDate = new Date("1970-01-01").toISOString().slice(0, 10);
    console.log(filtros.get("dt_fim") + " " + filtros.get("dt_inicio"))
    const dataFim: any = filtros.get("dt_fim") ? filtros.get("dt_fim") : todayDate;
    const dataInicio: any = filtros.get("dt_inicio") ? filtros.get("dt_inicio") : pastDate;

    console.log(dataFim + " " + dataInicio)

    return Medico.findAndCountAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["email", "nome"],
          where: {
            nome: {
              [Op.like]: `%${filtros.get("nome") ? filtros.get("nome") : ""}%`
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
          where: {
            data_criado: {
              [Op.between]: [dataInicio, dataFim]
            }
          }
        }
      ]
    })
      .then(async dados => {
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
                as: "usuario",
                attributes: ["email", "nome"],
                where: {
                  nome: {
                    [Op.like]: `%${filtros.get("nome") ? filtros.get("nome") : ""}%`
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
                where: {
                  data_criado: {
                    [Op.between]: [dataInicio, dataFim]
                  }
                }
              }
            ],
          }),
          count: dados.count,
          paginas,
          offset: SortPaginateOptions.offset
        };
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
}
