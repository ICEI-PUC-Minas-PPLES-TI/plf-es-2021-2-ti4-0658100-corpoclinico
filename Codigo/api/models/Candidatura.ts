import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Equipe from "./Equipe";
import Especialidade from "./Especialidade";
import Medico from "./Medico";

export interface IAtributosCandidatura {
  id: number,
  medico_id: number,
  unidade_id: number,
  equipe_id: number,
  cnpj: string,
  faturamento: 'PJ' | 'C'
}
export interface IAtributosCandidaturaCriacao
  extends Optional<IAtributosCandidatura, "id"> {}

class Candidatura extends Model<IAtributosCandidatura, IAtributosCandidaturaCriacao>
  implements IAtributosCandidatura {

  id!: number;
  medico_id!: number;
  unidade_id!: number;
  equipe_id!: number;
  cnpj!: string;
  faturamento!: "PJ" | "C";
  
  static initialize(sequelize: Sequelize) {
    Candidatura.init(
      {
        id: {
          type: DataTypes.INTEGER().UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        cnpj: {
          type: DataTypes.CHAR(14),
        },
        faturamento: {
          type: DataTypes.ENUM('PF', 'C')
        },
        equipe_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Equipe,
                key: 'id'
            },
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
        }
      },
      {
        tableName: "candidatura",
        deletedAt: false,
        createdAt: false,
        updatedAt: false,
        sequelize
      }
    );
  }
}

export default Candidatura;