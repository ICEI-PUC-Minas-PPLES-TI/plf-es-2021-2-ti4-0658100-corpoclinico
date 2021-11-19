import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Arquivo from "./Arquivo";
import Especialidade from "./Especialidade";
import Medico from "./Medico";

export interface IAtributosMedicoEspecialidade {
  id: number,
  medico_id: number,
  especialidade_id: number,
  arquivo_id: number,
  rqe: string,
  instituicao: string,
  ano_formatura: number
}
export interface IAtributosMedicoEspecialidadeCriacao extends Optional<IAtributosMedicoEspecialidade, 'id'> { }

class MedicoEspecialidade extends Model<IAtributosMedicoEspecialidade, IAtributosMedicoEspecialidadeCriacao> implements IAtributosMedicoEspecialidade {

  id!: number;
  medico_id!: number;
  especialidade_id!: number;
  arquivo_id!: number;
  rqe!: string;
  instituicao!: string;
  ano_formatura!: number;

  static initialize(sequelize: Sequelize) {
    MedicoEspecialidade.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      medico_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        references: {
          model: Medico,
          key: 'id'
        },
      },
      especialidade_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        references: {
          model: Especialidade,
          key: 'id'
        },
      },
      arquivo_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        references: {
          model: Arquivo,
          key: 'id'
        },
      },
      rqe: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      instituicao: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      ano_formatura: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
    },
      {
        hooks: {
          beforeDestroy: async (medicoEspecialidade, options) => {
            await Arquivo.destroy({
              where: {
                id: medicoEspecialidade.arquivo_id,
              }
            });
          },
        },
        tableName: "medico_especialidade",
        timestamps: true, // deletedAt precisa disso true
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      })
  }
}

export default MedicoEspecialidade;
