import { Model, DataTypes, Sequelize, Optional } from "sequelize";


export interface IAtributosVideo{
  id: number,
  link: string,
  prioridade: number,
  ativo: boolean
}
export interface IAtributosVideoCriacao extends Optional<IAtributosVideo, 'id' | 'ativo'>{}

class Video extends Model<IAtributosVideo, IAtributosVideoCriacao> implements IAtributosVideo{
  

  id!: number;
  link!: string;
  prioridade!: number;
  ativo!: boolean;

  static initialize(sequelize: Sequelize){
    Video.init({
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      link: {
          type: DataTypes.CHAR(250),
          allowNull: false
      },
      prioridade: {
          type: DataTypes.TINYINT,
          allowNull: false
      },
      ativo: {
        type: DataTypes.TINYINT({length: 1}),
        defaultValue: true,
        allowNull: false,
      }
    },
    {
      tableName: "video",
      timestamps: false,
      sequelize
    })
  }
}

export default Video;
