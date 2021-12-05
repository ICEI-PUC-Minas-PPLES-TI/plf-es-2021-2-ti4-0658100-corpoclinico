
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import Equipe from '../models/Equipe';
import Especialidade from '../models/Especialidade';
import Arquivo from '../models/Arquivo';
import Medico from '../models/Medico';

// Importar modelos aqui
import Usuario from "../models/Usuario";
import Candidatura from '../models/Candidatura';
import Unidade from "../models/Unidade";
import Retorno from '../models/Retorno';
import MedicoFormacao from '../models/MedicoFormacao';
import MedicoEspecialidade from '../models/MedicoEspecialidade';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE ?? "corpoclinico",
  process.env.DB_USER ?? "ccc",
  process.env.DB_PASS ?? "ccc",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

export default {
  async connect() {
    try {
      await sequelize.authenticate();

      // Iniciar modelos aqui
      Usuario.initialize(sequelize);
      Medico.initialize(sequelize);
      Unidade.initialize(sequelize);
      Especialidade.initialize(sequelize);
      Equipe.initialize(sequelize);
      Arquivo.initialize(sequelize);
      Candidatura.initialize(sequelize);
      Retorno.initialize(sequelize);
      MedicoFormacao.initialize(sequelize);
      MedicoEspecialidade.initialize(sequelize);

      // Associações
      Equipe.belongsTo(Especialidade, { foreignKey: 'especialidade_id'})
      Especialidade.hasOne(Equipe, { foreignKey: 'id' })

      Usuario.hasOne(Medico, {
        as: 'medico',
        foreignKey: 'usuario_id'
      })
      
      Medico.belongsTo(Usuario, {
        as: 'usuario',
        foreignKey: 'usuario_id'
      });
      Medico.hasMany(Arquivo, {
        as: 'arquivos',
        foreignKey: 'medico_id'
      });

      Medico.hasOne(Candidatura, {
        as: 'candidatura',
        foreignKey: 'medico_id'
      });
      Candidatura.belongsTo(Medico, {
        foreignKey: 'medico_id'
      })
      Candidatura.hasMany(Retorno, {
        foreignKey: 'candidatura_id', as: 'retornos'
      })

      Retorno.belongsTo(Usuario, {
        as: 'avaliador',
        foreignKey: 'avaliador_id'
      });
      Retorno.belongsTo(Candidatura, {
        as: 'candidatura',
        foreignKey: 'candidatura_id'
      })

      Medico.hasMany(MedicoFormacao, {
        as: 'formacoes',
        foreignKey: 'medico_id'
      })
      MedicoFormacao.belongsTo(Medico, {
        foreignKey: 'medico_id'
      })
      MedicoFormacao.hasMany(Arquivo, {
        foreignKey: 'id',
        onDelete: 'cascade', hooks:true
      });

      Candidatura.belongsTo(Equipe, {
        as: 'equipe',
        foreignKey: 'equipe_id'
      })

      Candidatura.belongsTo(Unidade, {
        as: 'unidade',
        foreignKey: 'unidade_id'
      })

      Medico.hasMany(MedicoEspecialidade, {
        as: 'especialidades',
        foreignKey: 'medico_id'
      });
      MedicoEspecialidade.belongsTo(Medico, {
        as: 'medico',
        foreignKey: 'medico_id'
      });
      MedicoEspecialidade.hasOne(Arquivo, {
        as: 'arquivo',
        foreignKey: 'id',
      });
      MedicoEspecialidade.belongsTo(Especialidade, {
        as: 'especialidade',
        foreignKey: 'especialidade_id',
      })

      if (process.env.NODE_ENV === "dev") {
        console.log(
          `Conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}' estabelecida`
        );
      }
    } catch (error) {
      console.log( error,
        `Não foi possível estabelecer a conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}'`
      );
    }
  },

  async close() {
    await sequelize.close();
  }
};
