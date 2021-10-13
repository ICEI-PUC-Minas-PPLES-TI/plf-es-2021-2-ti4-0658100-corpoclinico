
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import Equipe from '../models/Equipe';
import Especialidade from '../models/Especialidade';
import Arquivo from '../models/Arquivo';
import Medico from '../models/Medico';

// Importar modelos aqui
import Usuario from "../models/Usuario";

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
      Especialidade.initialize(sequelize);
      Equipe.initialize(sequelize);
      Arquivo.initialize(sequelize);

      // Associações
      Equipe.belongsTo(Especialidade, { foreignKey: 'especialidade_id'})
      Especialidade.hasOne(Equipe, { foreignKey: 'id' })
      
      Medico.belongsTo(Usuario, {
        foreignKey: 'usuario_id'
      });
      Medico.hasMany(Arquivo, {
        foreignKey: 'medico_id'
      });

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
