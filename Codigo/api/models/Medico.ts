import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface IAtributosMedico {
  id: number,
  usuario_id: number,
  crm: string,
  celular: string,
  categoria: "E" | "T" | "C",
  rg: string,
  cpf: string,
}
export interface IAtributosMedicoCriacao
  extends Optional<IAtributosMedico, "id"> {}

class Medico extends Model<IAtributosMedico, IAtributosMedicoCriacao>
  implements IAtributosMedico {
  id!: number;
  usuario_id!: number;
  crm!: string;
  celular!: string;
  categoria!: "E" | "T" | "C";
  rg!: string;
  cpf!: string;

  static initialize(sequelize: Sequelize) {
    Medico.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        usuario_id: {
          type: DataTypes.INTEGER().UNSIGNED,
          allowNull: false
        },
        crm: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        celular: {
          type: DataTypes.STRING(14),
          allowNull: true
        },
        categoria: {
          type: DataTypes.ENUM("E", "T", "C"),
          allowNull: false
        },
        rg: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
        cpf: {
          type: DataTypes.STRING(20),
          allowNull: false
        },
      },
      {
        tableName: "medico",
        timestamps: true, // deletedAt precisa disso true
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default Medico;
