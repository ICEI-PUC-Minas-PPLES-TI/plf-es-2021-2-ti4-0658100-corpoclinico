import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import AppError from "../errors/AppError";


export interface IAtributosUsuario{
  id: number,
  login: string,
  nome: string,
  email: string,
  telefone: string,
  senha: string,
  data_excluido: Date,
  data_expira: Date,
  tipo: 'A' | 'M' | 'V'
}
export interface IAtributosUsuarioCriacao extends Optional<IAtributosUsuario, 'id' | 'data_expira' | 'data_excluido'>{}

class Usuario extends Model<IAtributosUsuario, IAtributosUsuarioCriacao> implements IAtributosUsuario{
  
  id!: number;
  login!: string;
  nome!: string;
  email!: string;
  telefone!: string;
  senha!: string;
  data_excluido!: Date;
  data_expira!: Date;
  tipo!: "A" | "M" | "V";

  static initialize(sequelize: Sequelize){
    Usuario.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          isUnique: (value: string, next: ((err?: AppError)=>void)) => {
            Usuario.findAll({
              where: { login: value },
              attributes: ["id"]
            })
              .then(usuario => {
                if (usuario.length != 0)
                  next(new AppError("Login já utilizado!"));
                next();
              })
              .catch(onError => console.log(onError));
          }
        }
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
                  next(new AppError("Email já cadastrado!"));
                next();
              })
              .catch(onError => console.log(onError));
          }
        }
      },
      telefone: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      senha: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      data_excluido: {
        type: DataTypes.DATE,
        allowNull: true
      },
      data_expira: {
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
      sequelize
    })
  }
}

export default Usuario;
