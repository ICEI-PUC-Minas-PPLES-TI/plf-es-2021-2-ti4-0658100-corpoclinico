import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";
import { SortPaginate } from "../helpers/sortPaginate";

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
  autenticado: boolean,
  acessoToken: string | null,
  razao?: "Senha incorreta!"
}

class UsuarioController {
  public signin: RequestHandler<never, SigninReponse, ILoginUsuario> = async (req, res) => {
    const { email, senha } = req.body;

    Usuario.findOne({
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
          return res.status(401).send({
            autenticado: false,
            acessoToken: null,
            razao: "Senha incorreta!"
          });
        }

        const token = jwt.sign({ id: usuario.get().id }, process.env.SECRET_KEY ?? "fill-the-env-file.this-is-only-to-prevent-type-error", {
          expiresIn: 604800 * 4 // 4 semana expira
        });

        res.status(200).send({ autenticado: true, acessoToken: token });
      })
      .catch(err => {
        res.status(500).send("Erro -> " + err);
      });
  }

  public create: CreateRequestHandler = async (request, response) => {
    const senhaRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    /*
      /^
        (?=.*\d)          // deve ter no mínimo 1 número
        (?=.*[a-z])       // deve ter no mínimo 1 letra minúscula
        (?=.*[A-Z])       // deve ter no mínimo 1 letra maiúscula
        [a-zA-Z0-9]{8,}   // deve ter no mínimo 8 caracteres alfanuméricos
      $/
    */

    // Em breve buscar dos tipos automaticamente no banco de dados.
    const tipos = ["A", "V"];
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
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        criado: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    const usuario = Usuario.build({
      nome,
      email,
      senha: password,
      tipo: "A"
    });

    usuario
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: usuario.id
        });
      })
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public delete: DeleteRequestHandler = async (request, response) => {
    const usuario = await Usuario.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!usuario) {
      return response.status(404).json({
        deletado: false,
        errors: "ID de usuário não encontrado!"
      });
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
      .catch(function (error) {
        response.status(500).json({
          deletado: false,
          errors: error
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/usuario/1
  public update: UpddateRequestHandler<IAtributosUsuario> = async (request, response) => {
    const tipos = ["A", "M", "CC", "DC", "DT"];

    const scheme = yup.object().shape({
      nome: yup.string().max(120, "Nome deve ter no máximo 120 caracteres!"),

      email: yup.string().email().max(100, "Nome deve ter no máximo 100 caracteres!"),
      senha: yup
        .string()
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),

      tipo: yup.mixed().oneOf(tipos, `Tipo deve ser algum destes: ${tipos}.`)
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (err: any) {
      return response.status(422).json({
        atualizado: false,
        nome: err.name, // => 'ValidationError'
        erros: err.errors
      });
    }

    const { nome, email, senha, tipo } = request.body;

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
      response.status(404).json({
        atualizado: false,
        nome: "Usuario não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      usuario.update({
        nome: nome ? nome : usuario.get().nome,
        email: email ? email : usuario.get().email,
        senha: password ? password : usuario.get().senha,
        tipo: tipo ? tipo : usuario.get().tipo
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
      response.status(404).json(usuario);
    } else {
      response.status(200).json(usuario);
    }
  }

  // URI de exemplo: http://localhost:3000/api/usuario?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosUsuario> = async (request, response) => {

    Usuario.findAndCountAll({
      paranoid: false
    })
      .then(dados => {
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          request.query,
          Object.keys(
            Usuario.rawAttributes
          ) /* Todos os atributos de usuário */,
          dados.count,
        );
        Usuario.findAll({
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
          .catch(error => {
            response.status(500).json({
              titulo: "Erro interno do servidor!",
              error
            });
          });
      })
      .catch(function (error) {
        response.status(500).json({
          titulo: "Erro interno do servidor!",
          error
        });
      });
  }
}

export default UsuarioController;
