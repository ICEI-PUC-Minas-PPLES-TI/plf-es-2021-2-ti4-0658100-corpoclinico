import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import MedicoService from "../services/MedicoService";
import { medicoCreateValidationScheme, medicoUpdateValidationScheme } from "../validations/MedicoValidations";

import Usuario, { IAtributosUsuarioCriacao } from "../models/Usuario";
import UsuarioService from "../services/UsuarioService";

import bcrypt from "bcryptjs";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import AppError from "../errors/AppError";
import ArquivoService from "../services/ArquivoService";
import Arquivo from "../models/Arquivo";
import CandidaturaService from "../services/CandidaturaService";
import Candidatura, { IAtributosCandidaturaCriacao } from "../models/Candidatura";
import { IGetAllMedicoFilter } from "../types/Requests";

interface IAtributosMedicoUsuarioCriacao extends IAtributosMedicoCriacao, IAtributosUsuarioCriacao, IAtributosCandidaturaCriacao { }
interface IGetHandlerGetFilter extends IAtributosMedico, IGetAllMedicoFilter { }

class MedicoController {
  private medicoService!: MedicoService;
  private usuarioSerive!: UsuarioService;
  private arquivoService!: ArquivoService;
  private candidaturaService!: CandidaturaService;

  constructor() {
    this.medicoService = new MedicoService();
    this.usuarioSerive = new UsuarioService();
    this.arquivoService = new ArquivoService();
    this.candidaturaService = new CandidaturaService();
  }

  public create: CreateRequestHandler<IAtributosMedicoUsuarioCriacao> = async (request, response) => {
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

    const { crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max } = request.body;
    const { equipe_id, cnpj, faturamento, unidade_id } = request.body;
    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    const usuario = await this.usuarioSerive.create({
      nome,
      email,
      senha: password,
      tipo: "M",
    });

    this.medicoService.create(
      {
        // Atributos de médico
        usuario_id: usuario.id,
        crm,
        regiao,
        dt_inscricao_crm,
        celular,
        cartao_sus: cartao_sus ? cartao_sus : null,
        categoria,
        rg: rg ? rg : null,
        rg_orgao_emissor,
        rg_data_emissao,
        dt_nascimento,
        cpf: cpf ? cpf : null,
        titulo_eleitoral: titulo_eleitoral ? titulo_eleitoral : null,
        zona,
        secao,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep: cep?.replace(/\D/g, ''),
        sociedade_cientifica,
        escolaridade_max,
      }
    )
      .then(async (medico) => {
        await Promise.all([
          this.arquivoService.create(request.files, medico.id),
          this.candidaturaService.create({ cnpj, equipe_id, faturamento, medico_id: medico.id, unidade_id })
        ]).catch(async (error) => {
          await this.medicoService.delete(medico.id, true);
          throw error;
        })
        return response.status(201).json({
          criado: true,
          id: medico.id
        });
      })
      .catch(async (erro) => {
        // Caso dê erro ao cadastrar o médico, após ter criado o usuário, hard-delete no usuário criado sem médico.
        await Usuario.destroy({
          where: {
            id: usuario.id
          },
          force: true
        });
        return response.status(500).json({
          criado: false,
          nome: "Médico não criado!",
          erros: erro.message,
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public delete: DeleteRequestHandler = async (request, response) => {
    this.medicoService.delete(Number(request.params.id))
      .then(medico => {
        this.usuarioSerive.delete(Number(medico.get().usuario_id))
          .then(usuarioDado => {
            const dado = Number(medico.get().id);
            return response.status(204).json({
              deletado: true,
              dado
            });
          })
          .catch(function (error: AppError) {
            return response.status(error.statusCode).json({
              deletado: false,
              errors: error.message
            });
          });
      })
      .catch(function (error) {
        return response.status(500).json({
          deletado: false,
          errors: error
        });
      });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public update: UpddateRequestHandler<IAtributosMedicoUsuarioCriacao> = async (request, response) => {
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

    const { crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max } = request.body;
    const { equipe_id, cnpj, faturamento, unidade_id } = request.body;
    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    const usuario = await this.usuarioSerive.getBy("email", email);
    if (!usuario)
      throw new AppError("Usuário não encontrado!", 404);

    // const usuarioLogado = await this.usuarioSerive.getById(Number(request.headers.authorization));
    const usuarioLogado = await this.usuarioSerive.getById(Number('3'));
    if (usuarioLogado?.get().tipo !== "A" && usuario.id !== usuarioLogado?.get().id)
      throw new AppError("Usuário logado não é admin ou não é o mesmo do médico em atualização cadastral!", 405);

    usuario.update({
      nome,
      email,
      senha: password
    });

    const medico = await this.medicoService.getById(Number(request.params.id))
    if (!medico)
      throw new AppError("Medico não encontrado!", 404)

    const candidatura = await this.candidaturaService.getBy("medico_id", medico?.get().id.toString());
    if (!candidatura)
      throw new AppError("Candidatura do médico não encontrada!", 404)

    await medico.update(
      {
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
      .then(async (medico) => {
        await Promise.all([
          this.arquivoService.update(request.files, medico?.get().id),
          this.candidaturaService.update({ id: candidatura[0].id, cnpj, equipe_id, faturamento, medico_id: medico.id, unidade_id }),
        ]).catch(async (error) => {
          throw new AppError("Candidatura e arquivos para médico não atualizados!", 500);
        })
        return response.status(201).json({
          atualizado: true,
          id: medico.id
        });
      })
      .catch(async (erro) => {
        throw new AppError("Médico não atualizado!" + erro, 500);
      });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public get: GetRequestHandler<IAtributosMedico> = async (request, response) => {
    const medico = await Medico.findOne({
      where: {
        id: request.params.id
      },
      include: [
        {
          model: Usuario, as: 'usuario',
          attributes: ['email', 'nome']
        },
        {
          model: Arquivo, as: 'arquivos',
          attributes: ['id', 'nome_arquivo', 'tipo']
        },
        {
          model: Candidatura, as: 'candidatura',
          attributes: ['cnpj', 'faturamento', 'equipe_id', 'unidade_id', 'data_criado']
        }
      ]
    });

    if (!medico)
      response.status(404).json(medico);
    else
      response.status(200).json(medico);
  }

  // URI de exemplo: http://localhost:3000/api/medico?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IGetHandlerGetFilter> = async (request, response) => {
    const { nome, dt_inicio, dt_fim } = request.query;

    this.medicoService.getAll({
      ...request.query
    },
      Object.keys(Medico.rawAttributes),
      { nome, dt_inicio, dt_fim },
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
