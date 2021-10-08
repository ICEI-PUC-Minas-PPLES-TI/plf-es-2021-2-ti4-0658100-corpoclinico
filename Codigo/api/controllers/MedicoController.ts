import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import MedicoService from "../services/MedicoService";
import { medicoCreateValidationScheme, medicoUpdateValidationScheme } from "../validations/MedicoValidations";

import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";

class MedicoController {
  private Service!: MedicoService;

  constructor() {
    this.Service = new MedicoService();
  }

  public create: CreateRequestHandler<IAtributosMedicoCriacao> = async (request, response) => {
    const scheme = medicoCreateValidationScheme;

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

    const { usuario_id, crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max } = request.body;

    this.Service.create(
      {
        usuario_id,
        crm,
        regiao,
        dt_inscricao_crm,
        celular,
        cartao_sus,
        categoria,
        rg,
        rg_orgao_emissor,
        rg_data_emissao,
        dt_nascimento,
        cpf,
        titulo_eleitoral,
        zona,
        secao,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
        sociedade_cientifica,
        escolaridade_max,
      }
    )
      .then((medico) => {
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
    this.Service.delete(Number(request.params.id))
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

  // URI de exemplo: http://localhost:3000/api/medico/1
  public get: GetRequestHandler<IAtributosMedico> = async (request, response) => {

    const medico = await Medico.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!medico) {
      response.status(404).json(medico);
    } else {
      response.status(200).json(medico);
    }
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public update: UpddateRequestHandler<IAtributosMedico> = async (request, response) => {

    const scheme = medicoUpdateValidationScheme

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

    const medico = await this.Service.getById(Number(request.params.id))
    if (!medico) {
      response.status(404).json({
        atualizado: false,
        nome: "Medico não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await this.Service.update({ celular, categoria });
      response.status(200).json({
        atualizado: true,
        id: medico.id
      });
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
    ];

    this.Service.getAll(
      { ...request.query },
      atributos,
    )
      .then(({ medicos, count, paginas, offset }) => {
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
