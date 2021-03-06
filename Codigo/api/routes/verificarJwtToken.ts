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

const isAdmin: RequestHandler = async (req, res, next) => {
  await Usuario.findByPk(req.headers.authorization).then(usuario => {
    req.headers["user-tipo"] = usuario?.get().tipo;
    if (usuario?.get().tipo === "A") {
      next();
      return;
    }
    else
      throw new AppError("Necessita de ser um usuário administrador!", 403)
  });
};
const isAdminOrMedico: RequestHandler = async (req, res, next) => {
  await Usuario.findByPk(req.headers.authorization).then(usuario => {
    req.headers["user-tipo"] = usuario?.get().tipo;
    if (usuario?.get().tipo === "A" || usuario?.get().tipo === "M") {
      next();
      return;
    }
    else
      throw new AppError("Necessita de ser um usuário administrador ou médico!", 403)
  });
};
const isMedico: RequestHandler = async (req, res, next) => {
  await Usuario.findByPk(req.headers.authorization).then(usuario => {
    req.headers["user-tipo"] = usuario?.get().tipo;
    if (usuario?.get().tipo === "M") {
      next();
      return;
    }
    else
      throw new AppError("Necessita de ser um usuário médico!");
  });
};


const autenticacaoJwt = {
  verificarToken,
  isAdmin,
  isMedico,
  isAdminOrMedico
};

export default autenticacaoJwt;
