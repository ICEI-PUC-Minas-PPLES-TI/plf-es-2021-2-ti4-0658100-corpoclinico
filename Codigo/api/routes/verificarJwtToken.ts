import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

import { RequestHandler } from 'express'
import AppError from "../errors/AppError";

interface IAuthRequest {
  userId: number
}
// < params, response, body,  >
const verificarToken: RequestHandler = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    throw new AppError("Token de autenticação não fornecido.", 401);
  }
  else {
    token = Array.isArray(token) ? token[0] : token; //garante que token é uma string
    jwt.verify(token, process.env.SECRET_KEY ?? " ", (err, decoded) => {
      if (err) {
        throw new AppError("Falha ao autenticar o token.", 401, {
          autenticado: false,
          error: err
        })
      }
      req.headers.authorization = decoded?.id;
      next();
    });


  }

};

const isAdmin: RequestHandler = (req, res, next) => {
  Usuario.findByPk(req.headers.authorization).then(usuario => {
    if (usuario?.get().tipo === "A") {
      next();
      return;
    }
    else
      throw new AppError("Necessita de ser um usuário administrador!", 403)
  });
};

const autenticacaoJwt = {
  verificarToken,
  isAdmin
};

export default autenticacaoJwt;
