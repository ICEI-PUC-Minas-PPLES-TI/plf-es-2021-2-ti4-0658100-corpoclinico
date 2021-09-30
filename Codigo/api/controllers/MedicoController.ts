import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import { SortPaginate } from "../helpers/SortPaginate";

import * as yup from 'yup'
import bcrypt from "bcryptjs";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import MedicoService from "../services/MedicoService";

class MedicoController {
  private Service!: MedicoService;

  constructor(){
    this.Service = new MedicoService();
  }

  public create: CreateRequestHandler<IAtributosMedicoCriacao> = async (request, response) => {
    const celularRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    /*
      /^
        (?=.*\d)          // deve ter no mínimo 1 número
        (?=.*[a-z])       // deve ter no mínimo 1 letra minúscula
        (?=.*[A-Z])       // deve ter no mínimo 1 letra maiúscula
        [a-zA-Z0-9]{8,}   // deve ter no mínimo 8 caracteres alfanuméricos
      $/
    */

    const categorias = ["E", "T", "C"];
    const scheme = yup.object().shape({
      crm: yup.string().required("crm obrigatório!"),
      celular: yup.string().matches(celularRegExp, "celular inválido!"),
      categoria: yup
      .mixed()
      .oneOf(categorias, `categoria deve ser alguma destas: ${categorias}.`)
      .required("categoria obrigatório!"),
      rg: yup
        .string()
        .required("rg obrigatório!"), // TODO: RegEX de RG
      cpf: yup
      .string()
      .required("rg obrigatório!"), // TODO: RegEX de CPF,
      usuario_id: yup
      .number()
      .required('usuario_id obrigatório')
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

    const { crm, celular, categoria, rg, cpf, usuario_id } = request.body;

    const medico = Medico.build({
      crm: crm,
      usuario_id: usuario_id,
      celular: celular,
      categoria: categoria,
      rg: rg,
      cpf: cpf
    });

    medico
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: medico.id
        });
      })
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public delete: DeleteRequestHandler = async (request, response) => {
    await Medico.destroy({
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
    .catch(function(error) {
      response.status(500).json({
        deletado: false,
        errors: error
      });
    });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public update: UpddateRequestHandler<IAtributosMedico> = async (request, response) => {
    const celularRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    /*
      /^
        (?=.*\d)          // deve ter no mínimo 1 número
        (?=.*[a-z])       // deve ter no mínimo 1 letra minúscula
        (?=.*[A-Z])       // deve ter no mínimo 1 letra maiúscula
        [a-zA-Z0-9]{8,}   // deve ter no mínimo 8 caracteres alfanuméricos
      $/
    */

    const categorias = ["E", "T", "C"];
    const scheme = yup.object().shape({
      celular: yup.string().matches(celularRegExp, "celular inválido!"),
      categoria: yup
      .mixed()
      .oneOf(categorias, `categoria deve ser alguma destas: ${categorias}.`)
      .required("categoria obrigatório!"),
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

    const { celular, categoria } = request.body;

    const atributos = [
      "id",
      "crm",
      "celular",
      "categoria",
      "rg",
      "cpf",
      "data_excluido"
    ];
    const medico = await Medico.findOne({
      where: {
        id: request.params.id
      },
      attributes: atributos
    });
    if (!medico) {
      response.status(404).json({
        atualizado: false,
        nome: "Medico não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      medico.update({
        celular: celular,
        categoria: categoria
      });
      response.status(200).json({
        atualizado: true,
        id: medico.id
      });
    }
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public get: GetRequestHandler<IAtributosMedico> = async (request, response) => {

    const atributos = [
      "id",
      "crm",
      "celular",
      "categoria",
      "rg",
      "cpf",
      "data_excluido"
    ];
    const medico = await Medico.findOne({
      where: {
        id: request.params.id
      },
      attributes: atributos
    });
    if (!medico) {
      response.status(404).json(medico);
    } else {
      response.status(200).json(medico);
    }
  }

  // URI de exemplo: http://localhost:3000/api/medico?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosMedico> = async (request, response) => {
    const atributos = [
      "id",
      "crm",
      "celular",
      "categoria",
      "rg",
      "cpf",
      "data_excluido"
    ];

    this.Service.getAll(
      {...request.query},
      atributos,
    )
    .then(({medicos, count, paginas, offset}) => {
      response.status(200).json({
        dados: medicos,
        quantidade: medicos.length,
        total: count,
        paginas: paginas,
        offset: offset
      });
    })
    .catch(error => {
      response.status(500).json({
        titulo: "Erro interno do servidor!",
        error
      });
    });
  }
}

export default MedicoController;
