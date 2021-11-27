import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Especialidade from "./Especialidade";
import Usuario from "./Usuario";

export interface IAtributosEquipe {
  id: number,
  nome: string,
  especialidade_id: number,
  //usuario_id: number
}
export interface IAtributosEquipeCriacao
  extends Optional<IAtributosEquipe, "id"> {}

class Equipe extends Model<IAtributosEquipe, IAtributosEquipeCriacao>
  implements IAtributosEquipe {

  nome!: string;
  especialidade_id!: number;
  id!: number;
  //usuario_id!: number;

  static initialize(sequelize: Sequelize) {
    Equipe.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
            type: DataTypes.CHAR(50)
        },
        especialidade_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Especialidade,
                key: 'id'
            },
        },
        /*usuario_id: {
          type: DataTypes.INTEGER().UNSIGNED,
          references: {
            model: Usuario,
            key: 'id'
          }
        }*/
      },
      {
        tableName: "equipe",
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default Equipe;