import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

import { RequestHandler } from 'express'

interface IAuthRequest{
  userId: number
}
// < params, response, body,  >
const verificarToken: RequestHandler = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      autenticado: false,
      message: "Token de autenticação não fornecido."
    });
  }
  else{
    token = Array.isArray(token) ? token[0] : token ; //garante que token é uma string
    jwt.verify(token, process.env.SECRET_KEY ?? " ", (err, decoded) => {
      if (err) {
        return res.status(500).send({
          autenticado: false,
          message: "Falha ao autenticar o token. Erro -> " + err
        });
      }
      console.log(decoded);
      req.headers.authorization = decoded?.id;
      next();
    });


  }

};

const isAdmin: RequestHandler = (req, res, next) => {
  Usuario.findByPk(req.headers.authorization).then(usuario => {
    console.log(usuario)
    if (usuario?.get().tipo === "A") {
      next();
      return;
    }

    res.status(403).send("Necessita de ser um usuário administrador!");
    return;
  });
};

const autenticacaoJwt = {
  verificarToken,
  isAdmin
};

export default autenticacaoJwt;
