import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import AppError from "../errors/AppError";


export interface IAtributosArquivo {
  id: number,
  medico_id: number,
  nome_arquivo: string,
  tipo: 'FOTO' | 'RG' | 'CPF' | 'TITULO' | 'CENDER' | 'CRM' | 'CERTQ' | 'TVIGI' | 'RQE' | 'VACINA' | 'FORM' | 'TSAIR'
}
export interface IAtributosArquivoCriacao extends Optional<IAtributosArquivo, 'id' | 'tipo'> { }

class Arquivo extends Model<IAtributosArquivo, IAtributosArquivoCriacao> implements IAtributosArquivo {

  id!: number;
  medico_id!: number;
  nome_arquivo!: string;
  tipo!: 'FOTO' | 'RG' | 'CPF' | 'TITULO' | 'CENDER' | 'CRM' | 'CERTQ' | 'TVIGI' | 'RQE' | 'VACINA' | 'FORM' | 'TSAIR';

  static initialize(sequelize: Sequelize) {
    Arquivo.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      medico_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false
      },
      nome_arquivo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isUnique: async (value: string, next: ((err?: AppError) => void)) => {
            await Arquivo.findAll({
              where: { nome_arquivo: value },
              attributes: ["id"]
            })
              .then(usuario => {
                if (usuario.length != 0)
                  next(new AppError(" Falha ao cadastrar arquivo (Duplicado)!", 422));
                next();
              })
              .catch(error=>{
                throw new AppError("Erro interno no Servidor!", 500, error);
              });
          }
        }
      },
      tipo: {
        type: DataTypes.ENUM("FOTO", "RG", "CPF", "TITULO", "CENDER", "CRM", "CERTQ", "TVIGI", "RQE", "VACINA", "FORM", "TSAIR"),
        allowNull: false
      }
    },
      {
        tableName: "arquivos",
        timestamps: true, // deletedAt precisa disso true
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      })
  }
}

export default Arquivo;
