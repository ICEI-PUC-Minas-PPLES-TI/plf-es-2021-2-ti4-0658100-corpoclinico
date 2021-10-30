import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import AppError from "../errors/AppError";

export interface IAtributosMedico {
  id: number,
  usuario_id: number,
  crm: string,
  regiao: string,
  dt_inscricao_crm: Date,
  celular: string,
  cartao_sus: string | null,
  categoria: "E" | "T" | "C" | null,
  rg: string | null,
  rg_orgao_emissor: string | null,
  rg_data_emissao: Date | null,
  dt_nascimento: Date | null,
  cpf: string | null,
  titulo_eleitoral: string | null,
  zona: string | null,
  secao: string | null,
  logradouro: string,
  numero: number,
  complemento: string | null,
  bairro: string,
  cidade: string,
  estado: string,
  cep: string,
  sociedade_cientifica: string | null,
  escolaridade_max: 'BACHA' | 'ESPE' | 'MESTRE' | 'DOUTOR',
  ativo: number,
}
export interface IAtributosMedicoCriacao
  extends Optional<IAtributosMedico, "id" | "cartao_sus" | "categoria" | "rg" | "rg_orgao_emissor" | "rg_data_emissao" | "dt_nascimento" | "cpf" | "titulo_eleitoral" | "zona" | "secao" | "complemento" | "sociedade_cientifica" | "ativo"> { }

class Medico extends Model<IAtributosMedico, IAtributosMedicoCriacao>
  implements IAtributosMedico {

  id!: number;
  usuario_id!: number;
  crm!: string;
  regiao!: string;
  dt_inscricao_crm!: Date;
  celular!: string;
  cartao_sus!: string | null;
  categoria!: "E" | "T" | "C" | null;
  rg!: string | null;
  rg_orgao_emissor!: string | null;
  rg_data_emissao!: Date | null;
  dt_nascimento!: Date | null;
  cpf!: string | null;
  titulo_eleitoral!: string | null;
  zona!: string | null;
  secao!: string | null;
  logradouro!: string;
  numero!: number;
  complemento!: string | null;
  bairro!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
  sociedade_cientifica!: string | null;
  escolaridade_max!: 'BACHA' | 'ESPE' | 'MESTRE' | 'DOUTOR';
  ativo!: number;

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
          allowNull: false,
          validate: {
            isUnique: (value: string, next: ((err?: AppError) => void)) => {
              Medico.findAll({
                where: { crm: value },
                attributes: ["id"]
              })
                .then(medico => {
                  if (medico.length != 0)
                    next(new AppError("'crm' já cadastrado!", 422));
                  next();
                })
                .catch(error => {
                  throw new AppError("Erro interno no servidor")
                });
            }
          }
        },
        regiao: {
          type: DataTypes.STRING(2),
          allowNull: false
        },
        dt_inscricao_crm: {
          type: DataTypes.DATE,
          allowNull: false
        },
        celular: {
          type: DataTypes.STRING(14),
          allowNull: false
        },
        cartao_sus: {
          type: DataTypes.STRING(25),
          allowNull: true,
          validate: {
            isUnique: (value: string, next: ((err?: AppError) => void)) => {
              Medico.findAll({
                where: { cartao_sus: value },
                attributes: ["id"]
              })
              .then(medico => {
                if (medico.length != 0 && value != null)
                  next(new AppError("'cartao_sus' já cadastrado!", 422));
                next();
              })
              .catch(error => {
                next( new AppError("Erro interno no servidor") );
              });
            }
          }
        },
        categoria: {
          type: DataTypes.ENUM("E", "T", "C"),
          allowNull: true
        },
        rg: {
          type: DataTypes.STRING(20),
          allowNull: true,
          validate: {
            isUnique: (value: string, next: ((err?: AppError) => void)) => {
              Medico.findAll({
                where: { rg: value },
                attributes: ["id"]
              })
              .then(medico => {
                if (medico.length != 0 && value != null)
                  next(new AppError("'rg' já cadastrado!", 422));
                next();
              })
              .catch(error => {
                next( new AppError("Erro interno no servidor") )
              });
            }
          }
        },
        rg_orgao_emissor: {
          type: DataTypes.STRING(30),
          allowNull: true
        },
        rg_data_emissao: {
          type: DataTypes.DATE,
          allowNull: true
        },
        dt_nascimento: {
          type: DataTypes.DATE,
          allowNull: true
        },
        cpf: {
          type: DataTypes.STRING(20),
          allowNull: true,
          validate: {
            isUnique: (value: string, next: ((err?: AppError) => void)) => {
              Medico.findAll({
                where: { cpf: value },
                attributes: ["id"]
              })
                .then(medico => {
                  if (medico.length != 0 && value != null)
                    next(new AppError("'cpf' já cadastrado!", 422));
                  next();
                })
                .catch(error => {
                  next( new AppError("Erro interno no servidor") )
                });
            }
          }
        },
        titulo_eleitoral: {
          type: DataTypes.STRING(12),
          allowNull: true,
          validate: {
            isUnique: (value: string, next: ((err?: AppError) => void)) => {
              Medico.findAll({
                where: { titulo_eleitoral: value },
                attributes: ["id"]
              })
                .then(medico => {
                  if (medico.length != 0 && value != null)
                    next(new AppError("'titulo_eleitoral' já cadastrado!", 422));
                  next();
                })
                .catch(error => {
                  next( new AppError("Erro interno no servidor") )
                });
            }
          }
        },
        zona: {
          type: DataTypes.STRING(3),
          allowNull: true
        },
        secao: {
          type: DataTypes.STRING(4),
          allowNull: true
        },
        logradouro: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        numero: {
          type: DataTypes.INTEGER().UNSIGNED,
          allowNull: false
        },
        complemento: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        bairro: {
          type: DataTypes.STRING(45),
          allowNull: false
        },
        cidade: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        estado: {
          type: DataTypes.STRING(2),
          allowNull: false
        },
        cep: {
          type: DataTypes.STRING(8),
          allowNull: false
        },
        sociedade_cientifica: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        escolaridade_max: {
          type: DataTypes.ENUM("BACHA", "ESPE", "MESTRE", "DOUTOR"),
          allowNull: false
        },
        ativo: {
          type: DataTypes.INTEGER().UNSIGNED,
          allowNull: false,
          defaultValue: 1,
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
