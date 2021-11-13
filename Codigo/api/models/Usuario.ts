import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import AppError from "../errors/AppError";


export interface IAtributosUsuario {
  id: number,
  nome: string,
  email: string,
  senha: string,
  data_excluido: Date,
  tipo: 'A' | 'M' | 'V'
}
export interface IAtributosUsuarioCriacao extends Optional<IAtributosUsuario, 'id' | 'data_excluido'> { }

class Usuario extends Model<IAtributosUsuario, IAtributosUsuarioCriacao> implements IAtributosUsuario {

  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  data_excluido!: Date;
  tipo!: "A" | "M" | "V";

  static initialize(sequelize: Sequelize) {
    Usuario.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isUnique: (value: string, next: ((err?: AppError) => void)) => {
            Usuario.findAll({
              where: { email: value },
              attributes: ["id"]
            })
            .then(usuario => {
              if (usuario.length != 0)
                next (new AppError("Email já cadastrado!", 422));
              next();
            })
            .catch(error=>{
              next (new AppError("Erro interno no servidor", 500, error))
            })
          }
        }
      },
      senha: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      data_excluido: {
        type: DataTypes.DATE,
        allowNull: true
      },
      tipo: {
        type: DataTypes.ENUM("A", "M", "V"),
        allowNull: false,
        defaultValue: "V"
      }
    },
      {
        tableName: "usuario",
        timestamps: true, // deletedAt precisa disso true
        paranoid: true, // deletedAt precisa disso true
        deletedAt: "data_excluido",
        createdAt: false,
        updatedAt: false,
        sequelize,
        defaultScope: {
          attributes: {
            exclude: ['senha'],
          }
        },
      })
  }
}

export default Usuario;
