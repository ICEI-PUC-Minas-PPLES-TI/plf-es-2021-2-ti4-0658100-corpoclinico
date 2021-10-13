import { Model, DataTypes, Sequelize, Optional } from "sequelize";


export interface IAtributosUnidade{
  id: number,
  nome: string,
  cep: string,
  cidade: string,
  logradouro: string,
  bairro: string,
  numero: number,
}
export interface IAtributosUnidadeCriacao extends Optional<IAtributosUnidade, 'id'>{}

class Unidade extends Model<IAtributosUnidade, IAtributosUnidadeCriacao> implements IAtributosUnidade{

  id!: number;
  nome!: string;
  cep!: string;
  cidade!: string;
  logradouro!: string;
  bairro!: string;
  numero!: number;

  static initialize(sequelize: Sequelize){
    Unidade.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      cep: {
        type: DataTypes.STRING(8),
        allowNull: true
      },
      cidade: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      logradouro: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      bairro: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      numero: {
        type: DataTypes.SMALLINT(),
        allowNull: true
      }
    },
    {
      tableName: "unidade",
      timestamps: false,
      sequelize
    })
  }
}

export default Unidade;
