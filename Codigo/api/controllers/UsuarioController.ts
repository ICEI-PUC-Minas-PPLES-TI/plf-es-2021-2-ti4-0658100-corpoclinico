import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";
import { SortPaginate } from "../helpers/SortPaginate";

import * as yup from 'yup'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import AppError from "../errors/AppError";

interface ILoginUsuario {
  email: string,
  senha: string
}

type SigninReponse = string | {
  acessoToken: string | null,
  razao?: "Senha incorreta!"
}

class UsuarioController {
  public signin: RequestHandler<never, SigninReponse, ILoginUsuario> = async (req, res) => {
    const { email, senha } = req.body;

    await Usuario.findOne({
      attributes: ['id', 'senha'],
      where: {
        email: email
      }
    })
    .then(usuario => {
      if (!usuario) {
        return res.status(404).send("Usuario nao encontrado.");
      }

      const senhaValida = bcrypt.compareSync(senha, usuario.get().senha);
      if (!senhaValida) {
        throw new AppError("Senha incorreta!", 401);
      }

      const token = jwt.sign({ id: usuario.get().id }, process.env.SECRET_KEY ?? "fill-the-env-file.this-is-only-to-prevent-type-error", {
        expiresIn: 604800 * 4 // 4 semana expira
      });

      res.status(200).send({ acessoToken: token });
    })
  }

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      nome: yup.string().required("'nome' obrigatório!").max(120, "'nome' deve ter no máximo 120 caracteres!"),

      email: yup
        .string()
        .email()
        .required("'email' obrigatório!").max(100, "'email' deve ter no máximo 100 caracteres!"),
      senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!")
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
    }

    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    const usuario = Usuario.build({
      nome,
      email,
      senha: password,
      tipo: "A"
    });

    await usuario
      .save()
      .then(() => {
        return response.status(201).json({
          id: usuario.id
        });
      })
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public delete: DeleteRequestHandler = async (request, response) => {
    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404)
    }

    await Usuario.destroy({
      where: {
        id: request.params.id
      }
    })
      .then(dado => {
        response.status(204).json({
          deletado: true,
          dado
        });
      })
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public update: UpddateRequestHandler<IAtributosUsuario> = async (request, response) => {
    const tipos = ["A", "M", "CC", "DC", "DT"];

    const scheme = yup.object().shape({
      nome: yup.string().max(120, "'nome' deve ter no máximo 120 caracteres!"),

      email: yup.string().email().max(100, "'email' deve ter no máximo 100 caracteres!"),
      senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),

      tipo: yup.mixed().oneOf(tipos, `Tipo deve ser algum destes: ${tipos}.`)
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (err) {
      throw new AppError("Erro na validação de um ou mais campos", 422, err)
    }

    const { nome, email, senha } = request.body;

    let passTemp = null;
    if (senha)
      passTemp = bcrypt.hashSync(senha, 8);
    const password = passTemp;

    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      throw new AppError('Usuario não encontrado', 404);
    } else {
      usuario.update({
        nome: nome ? nome : usuario.get().nome,
        email: email ? email : usuario.get().email,
        senha: password ? password : usuario.get().senha,
        tipo: "A"
      });
      response.status(200).json({
        atualizado: true,
        id: usuario.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public get: GetRequestHandler<IAtributosUsuario> = async (request, response) => {

    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      },
      paranoid: false
    });
    if (!usuario) {
      throw new AppError('Usuario não encontrado', 404);
    } else {
      response.status(200).json(usuario);
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosUsuario> = async (request, response) => {

    await Usuario.findAndCountAll({
      paranoid: false
    })
      .then(async (dados) => {
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          request.query,
          Object.keys(
            Usuario.rawAttributes
          ) /* Todos os atributos de usuário */,
          dados.count,
        );
        await Usuario.findAll({
          ...SortPaginateOptions,
          paranoid: false
        })
        .then(usuarios => {
          response.status(200).json({
            dados: usuarios,
            quantidade: usuarios.length,
            total: dados.count,
            paginas: paginas,
            offset: SortPaginateOptions.offset
          });
        })
      })
  }
}

export default UsuarioController;
