
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
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

      // Associações
      Medico.belongsTo(Usuario, {
        foreignKey: 'usuario_id'
      });

      if (process.env.NODE_ENV === "dev") {
        console.log(
          `Conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}' estabelecida`
        );
      }
    } catch (error) {
      console.log(
        `Não foi possível estabelecer a conexão com '${process.env.DB_HOST}/${process.env.DB_DATABASE}'`
      );
    }
  },

  async close() {
    await sequelize.close();
  }
};
