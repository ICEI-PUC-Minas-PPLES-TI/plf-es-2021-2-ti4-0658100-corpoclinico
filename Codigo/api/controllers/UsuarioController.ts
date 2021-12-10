import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";
import { SortPaginate } from "../helpers/SortPaginate";

import * as yup from 'yup'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import AppError from "../errors/AppError";
import UsuarioService from "../services/UsuarioService";
import { usuarioCreateValidation, usuarioUpdateValidation } from "../validations/UsuarioValidations";

interface ILoginUsuario {
  email: string,
  senha: string
}

type SigninReponse = string | {
  acessoToken: string | null,
  tipo: string | null,
  nome: string | null,
  razao?: "Senha incorreta!"
}

class UsuarioController {

  Service!: UsuarioService;

  constructor(){
    this.Service = new UsuarioService();
  }

  public signin: RequestHandler<never, SigninReponse, ILoginUsuario> = async (req, res) => {
    const { email, senha } = req.body;

    await this.Service.getBy('email', email, ['id', 'senha','tipo', 'nome'])
    .then(usuario => {
      if (!usuario) {
        throw new AppError("Usuário não encontrado", 404);
      }
      const senhaValida = bcrypt.compareSync(senha, usuario.get().senha);
      if (!senhaValida) {
        throw new AppError("Senha incorreta!", 405);
      }

      const token = jwt.sign({ id: usuario.get().id }, process.env.SECRET_KEY ?? "fill-the-env-file.this-is-only-to-prevent-type-error", {
        expiresIn: 604800 * 4 // 4 semana expira
      });
      res.status(200).send({ acessoToken: token, nome: usuario.get().nome, tipo: usuario.get().tipo });
    })
  }

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = usuarioCreateValidation;

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    await this.Service.create({
      nome,
      email,
      senha: password,
      tipo: "A"
    })
    .then((usuario) => {
      return response.status(201).json({
        id: usuario.id
      });
    })
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public delete: DeleteRequestHandler = async (request, response) => {
    const usuario = await this.Service.getById( Number(request.params.id) );
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404)
    }

    await this.Service.delete(usuario.get().id)
    .then(() => {
      response.status(204).json({});
    })
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public update: UpddateRequestHandler<IAtributosUsuario> = async (request, response) => {
    const tipos = ["A", "M", "CC", "DC", "DT"];

    const scheme = usuarioUpdateValidation;

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const { nome, email, senha } = request.body;

    let passTemp = null;
    if (senha)
      passTemp = bcrypt.hashSync(senha, 8);
    const password = passTemp;

    const usuario = await this.Service.getById( Number(request.params.id) );
    if (!usuario) {
      throw new AppError('Usuario não encontrado', 404);
    } else {
      await usuario.update({
        nome: nome ? nome : usuario.get().nome,
        email: email ? email : usuario.get().email,
        senha: password ? password : usuario.get().senha,
        tipo: "A"
      }).catch((err)=>{
        throw new AppError("Erro interno no servidor", 500, err);
      })
      response.status(200).json({});
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public get: GetRequestHandler<IAtributosUsuario> = async (request, response) => {

    const usuario = await this.Service.getById(Number(request.params.id));
    if (!usuario) {
      throw new AppError('Usuario não encontrado', 404);
    } else {
      response.status(200).json(usuario);
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosUsuario> = async (request, response) => {

    await this.Service.getAll(request.query)
    .then(dados => {
      const total: number = (dados.total) as any;
      response.status(200).json({
        ...dados,
        total,
        quantidade: dados.dados.length
      });
    });
    
  }
}

export default UsuarioController;
