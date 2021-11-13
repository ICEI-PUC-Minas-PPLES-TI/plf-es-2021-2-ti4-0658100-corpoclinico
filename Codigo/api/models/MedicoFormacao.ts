import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Arquivo from "./Arquivo";
import Medico from "./Medico";

export interface IAtributosMedicoFormacao {
  id: number,
  faculdade_nome: string,
  faculdade_ano_formatura: number,
  medico_id: number,
  arquivo_id: number
}
export interface IAtributosMedicoFormacaoCriacao
  extends Optional<IAtributosMedicoFormacao, "id"> { }

class MedicoFormacao extends Model<IAtributosMedicoFormacao, IAtributosMedicoFormacaoCriacao>
  implements IAtributosMedicoFormacao {

  id!: number;
  faculdade_nome!: string;
  faculdade_ano_formatura!: number;
  medico_id!: number;
  arquivo_id!: number;

  static initialize(sequelize: Sequelize) {
    MedicoFormacao.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        faculdade_nome: {
          type: DataTypes.CHAR(60),
          allowNull: false
        },
        faculdade_ano_formatura: {
          type: DataTypes.INTEGER().UNSIGNED,
          allowNull: false
        },
        medico_id: {
          type: DataTypes.INTEGER().UNSIGNED,
          references: {
            model: Medico,
            key: 'id'
          },
        },
        arquivo_id: {
          type: DataTypes.INTEGER().UNSIGNED,
          references: {
            model: Arquivo,
            key: 'id'
          },
        },
      },
      {
        tableName: "medico_formacao",
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default MedicoFormacao;
