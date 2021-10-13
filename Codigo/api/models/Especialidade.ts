import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import AppError from "../errors/AppError";

export interface IAtributosEspecialidade {
  id: number,
  identificacao: string
}
export interface IAtributosEspecialidadeCriacao extends Optional<IAtributosEspecialidade, "id"> {}

class Especialidade extends Model<IAtributosEspecialidade, IAtributosEspecialidadeCriacao>
  implements IAtributosEspecialidade {

  identificacao!: string;
  id!: number;

  static initialize(sequelize: Sequelize) {
    Especialidade.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        identificacao: {
            type: DataTypes.CHAR(60) 
        },
      },
      {
        tableName: "especialidade",
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default Especialidade;