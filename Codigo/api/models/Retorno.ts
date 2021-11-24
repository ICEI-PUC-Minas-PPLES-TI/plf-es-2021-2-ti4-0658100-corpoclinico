import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface IAtributosRetorno{
  id: number,
  avaliador_id: number,
  candidatura_id: number,
  comentario: string,
  status: 'P' | 'R' | 'A',
}
export interface IAtributosRetornoCriacao extends Optional<IAtributosRetorno, 'id' | 'comentario'>{}

class Retorno extends Model<IAtributosRetorno, IAtributosRetornoCriacao> implements IAtributosRetorno{

    id!: number
    avaliador_id!: number
    candidatura_id!: number
    comentario!: string
    status!: 'P' | 'R' | 'A'

  static initialize(sequelize: Sequelize){
    Retorno.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      avaliador_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false
      },
      candidatura_id: {
        type: DataTypes.STRING(8),
        allowNull: false
      },
      comentario: {
        type: DataTypes.TEXT(),
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('P', 'R', 'A'),
        allowNull: true
      },
    },
    {
      tableName: "retorno",
      timestamps: false,
      sequelize
    })
  }
}

export default Retorno;
