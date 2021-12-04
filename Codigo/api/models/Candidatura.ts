import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Medico from "./Medico";

export interface IAtributosCandidatura {
  id: number,
  medico_id: number,
  unidade_id: number,
  equipe_id: number,
  cnpj: string,
  faturamento: 'PJ' | 'C',
  data_criado: Date,
}
export interface IAtributosCandidaturaCriacao
  extends Optional<IAtributosCandidatura, "id" | "data_criado"> {}

class Candidatura extends Model<IAtributosCandidatura, IAtributosCandidaturaCriacao>
  implements IAtributosCandidatura {

  id!: number;
  medico_id!: number;
  unidade_id!: number;
  equipe_id!: number;
  cnpj!: string;
  faturamento!: "PJ" | "C";
  data_criado!: Date;
  
  static initialize(sequelize: Sequelize) {
    Candidatura.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        cnpj: {
          type: DataTypes.CHAR(14),
        },
        faturamento: {
          type: DataTypes.ENUM('PF', 'C'),
          allowNull: false,
        },
        equipe_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        medico_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
              model: Medico,
              key: 'id'
          },
        },
        unidade_id: {
          type: DataTypes.INTEGER.UNSIGNED,/*
          references: {
              model: ,
              key: 'id'
          },*/
        },
        data_criado: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
      },
      {
        tableName: "candidatura",
        timestamps: false, // deletedAt precisa disso true
        deletedAt: false,
        createdAt: "data_criado",
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default Candidatura;