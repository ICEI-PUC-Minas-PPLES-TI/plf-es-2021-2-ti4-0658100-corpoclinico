import Medico, { IAtributosMedico, IAtributosMedicoCriacao } from "../models/Medico";
import MedicoService from "../services/MedicoService";
import { medicoCreateValidationScheme, medicoUpdateValidationScheme } from "../validations/MedicoValidations";
import jwt from "jsonwebtoken";

import Usuario, { IAtributosUsuarioCriacao } from "../models/Usuario";
import UsuarioService from "../services/UsuarioService";

import bcrypt from "bcryptjs";
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import AppError from "../errors/AppError";
import ArquivoService from "../services/ArquivoService";
import Arquivo from "../models/Arquivo";
import CandidaturaService from "../services/CandidaturaService";
import Candidatura, { IAtributosCandidatura, IAtributosCandidaturaCriacao } from "../models/Candidatura";
import { IGetAllMedicoFilter } from "../types/Requests";
import { ISortPaginateQuery } from "../helpers/SortPaginate";
import Equipe from "../models/Equipe";
import Unidade from "../models/Unidade";
import Retorno from "../models/Retorno";
import MedicoFormacao, { IAtributosMedicoFormacao, IAtributosMedicoFormacaoCriacao } from "../models/MedicoFormacao";
import MedicoEspecialidade from "../models/MedicoEspecialidade";
import { RequestHandler } from "express";
import Especialidade from "../models/Especialidade";

interface IAtributosMedicoUsuarioCriacao extends IAtributosMedicoCriacao, IAtributosUsuarioCriacao, IAtributosCandidaturaCriacao {
  especialidades : any,
  formacoes : any,
  candidaturas: Array<IAtributosCandidatura>
}
interface IGetHandlerGetFilter extends ISortPaginateQuery, IGetAllMedicoFilter { }
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
    if(typeof request.body.candidaturas == "string")
      request.body.candidaturas = JSON.parse(request.body.candidaturas);

    const scheme = medicoCreateValidationScheme;

    // Validando com o esquema criado:

    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as valida????es


    const { crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max, especialidades, formacoes } = request.body;
    const { candidaturas } = request.body;
    const { nome, email, senha } = request.body;
    const password = bcrypt.hashSync(senha, 8);

    let formacoesArray : any;
    if(typeof formacoes == "string")
      formacoesArray = JSON.parse(formacoes);
    else
      formacoesArray = formacoes;
    let especialidadesArray : any;
    if(typeof especialidades == "string")
      especialidadesArray = JSON.parse(especialidades);
    else
      especialidadesArray = especialidades;

    const usuario = await this.usuarioSerive.create({
      nome,
      email,
      senha: password,
      tipo: "M",
    });

    await this.medicoService.create(
      {
        // Atributos de m??dico
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
        let arquivosCriados : any;
        let candidaturaCriada : any;

        try {
          await Promise.all( candidaturas.map(async (candidatura) => {
            await this.candidaturaService.create({
              ...candidatura,
              medico_id: medico.id
            });
          }))
        } catch (error) {
          await this.medicoService.delete(medico.id, true);
          throw new AppError("Erro interno no servidor", 500, error);
        }
        try {
          arquivosCriados = await this.arquivoService.create(request.files, medico.id, formacoesArray, especialidadesArray);
        } catch (error) {
          await this.medicoService.delete(medico.id, true);
          throw new AppError("Erro interno no servidor", 500, error);
        }

        return response.status(201).json({
          id: medico.id,
        });
      })
      .catch(async (erro) => {
        // Caso d?? erro ao cadastrar o m??dico, ap??s ter criado o usu??rio, hard-delete no usu??rio criado sem m??dico.
        await Usuario.destroy({
          where: {
            id: usuario.id
          },
          force: true,
        });
        throw new AppError("M??dico n??o criado!", 500, erro);
      });
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public delete: DeleteRequestHandler = async (request, response) => {
    await this.medicoService.delete(Number(request.params.id))
      .then(async (medico) => {
        await this.usuarioSerive.delete(Number(medico.get().usuario_id))
          .then(usuarioDado => {
            const dado = Number(medico.get().id);
            return response.status(204).json({
              deletado: true,
              dado
            });
          })
      })
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public update: UpddateRequestHandler<IAtributosMedicoUsuarioCriacao> = async (request, response) => {
    if(typeof request.body.candidaturas == "string")
      request.body.candidaturas = JSON.parse(request.body.candidaturas);

    const scheme = medicoUpdateValidationScheme

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as valida????es

    const { crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max, especialidades, formacoes } = request.body;
    const { candidaturas } = request.body;
    const { nome, email, senha } = request.body;

    let especialidadesArray : any;
    if(typeof especialidades == "string")
      especialidadesArray = JSON.parse(especialidades);
    else
      especialidadesArray = especialidades;

    let formacoesArray : any;
    if(typeof formacoes == "string")
      formacoesArray = JSON.parse(formacoes);
    else
      formacoesArray = formacoes;

    let senhaTemp : any;
    if (senha)
      senhaTemp = bcrypt.hashSync(senha, 8);
    const password = senhaTemp;

    let token = request.headers["x-access-token"];

    if (!token) {
      throw new AppError("Usu??rio n??o autenticado!", 401);
    }
    let idLogado = request.headers.authorization;

    if(!idLogado)
      throw new AppError("Usu??rio n??o autenticado!", 401);

    const medicoAlterado = await this.medicoService.getById(Number(request.params.id))
    if (!medicoAlterado)
      throw new AppError("Medico n??o encontrado!", 404);

    const usuario = await this.usuarioSerive.getById(Number(medicoAlterado?.get().usuario_id));
    if (!usuario)
      throw new AppError("Usu??rio n??o encontrado!", 404);

    const usuarioLogado = await this.usuarioSerive.getById(Number(idLogado));
    if (usuarioLogado?.get().tipo !== "A" && usuario?.get().id !== usuarioLogado?.get().id)
      throw new AppError("Usu??rio logado n??o ?? admin ou n??o ?? o mesmo do m??dico em atualiza????o cadastral!", 405);

    await usuario.update({
      nome,
      email,
      senha: password
    });

    let candidaturaExiste = true;
    const candidatura = await this.candidaturaService.getBy("medico_id", medicoAlterado?.get().id.toString());

    if (!candidatura)
      candidaturaExiste = false;

    await this.medicoService.update(
      {
        id: medicoAlterado?.get().id,
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
        cep: cep?.replace(/\D/g, ''),
        sociedade_cientifica,
        escolaridade_max,
      }
    )
      .then(async (medico) => {
        let arquivosAtualizados: any = [];
        let candidaturaAtualizada : any;

        if(candidaturas!=undefined) {
          try {
            await Promise.all( candidaturas.map(async (candidatura) => {
              await this.candidaturaService.update({
                ...candidatura,
                medico_id: medico.get().id
              });
            }))
          } catch (error) {
            throw new AppError("Candidatura para m??dico n??o atualizada!" + error, 500);
          }
        }

        try {
          arquivosAtualizados = await this.arquivoService.update(request.files, medico?.get().id, formacoesArray, especialidadesArray);
        } catch (error) {
          throw new AppError("Arquivos para m??dico n??o atualizados!" + error, 500);
        }

        return response.status(201).json({
          atualizado: true,
          id: medico?.get().id,
          candidatura: candidaturaAtualizada,
          arquivosAtualizados: arquivosAtualizados
        });
      })
      .catch(async (erro) => {
        throw new AppError("M??dico n??o atualizado!" + erro, 500);
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
          attributes: ['cnpj', 'faturamento', 'equipe_id', 'unidade_id', 'data_criado'],
          include: [{
            model: Retorno, as: 'retornos',
            attributes: ['id', 'comentario', 'status'],
            include: [{
              model: Usuario, as: 'avaliador',
            }]
          }, {
            model: Equipe, as: 'equipe',
          }, {
            model: Unidade, as: 'unidade',
          }],
          required: false
        },
        {
          model: MedicoFormacao, as: 'formacoes',
        },
        {
          model: MedicoEspecialidade, as: 'especialidades',
          include: [{
            model: Especialidade,
            as: 'especialidade'
          }]
        }
      ]
    });

    if (!medico)
      throw new AppError("Medico n??o encontrado!", 404);
    else
      response.status(200).json(medico);
  }

  // URI de exemplo: http://localhost:3000/api/medico/1
  public getMe: GetRequestHandler<IAtributosMedico> = async (request, response) => {
    const medico = await Medico.findOne({
      where: {
        usuario_id: request.headers.authorization
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
          model: MedicoFormacao, as: 'formacoes',
        },
        {
          model: MedicoEspecialidade, as: 'especialidades',
        },
        {
          model: Candidatura, as: 'candidatura',
          attributes: ['id','cnpj', 'faturamento', 'equipe_id', 'unidade_id', 'data_criado'],
          include: [{
            model: Equipe,
            as: 'equipe'
          },{
            model: Unidade,
            as: 'unidade'
          },{
            model: Retorno,
            as: 'retornos'
          }]
        }
      ]
    });

    if (!medico)
      throw new AppError("Medico n??o encontrado!", 404);
    else
      response.status(200).json(medico);
  }


  public updateThisVideosAssitidos: RequestHandler = async (request, response) => {
    const usuarioLogadoId = Number(request.headers.authorization);
    const medico = await this.medicoService.getBy('usuario_id', usuarioLogadoId);
    if (!!medico){
        await this.medicoService.update({
          id: medico.get().id,
          assistiuVideos: true
      });
      return response.status(200).json({
        atualizado: true
      })
    }
    else{
      throw new AppError("Usu??rio logado n??o ?? um m??dico", 404)
    }

  }

  public getThis: GetRequestHandler<IAtributosMedico> = async (request, response, next) => {
    const id = request.headers.authorization;
    request.params.id = ((await this.medicoService.getBy('usuario_id', id))?.get().id ?? "") + "" ;
    await this.get(request, response, next);
  }

  // URI de exemplo: http://localhost:3000/api/medico?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys s??o opicionais
  public getAll: GetAllRequestHandler<IAtributosMedico, IGetHandlerGetFilter> = async (request, response) => {
    const { nome, dt_inicio, dt_fim, status, paraRevisar } = request.query;
    const idAvalidor = paraRevisar ? Number(request.headers.authorization) : undefined ;
    await this.medicoService.getAll({
      ...request.query
    },
      Object.keys(Medico.rawAttributes),
      { nome, dt_inicio, dt_fim, status, idAvalidor },
    )
    .then(({ medicos, count, paginas, offset }) => {
      const total: number = (count) as any;
      response.status(200).json({
        dados: medicos,
        quantidade: medicos.length,
        total,
        paginas: paginas,
        offset: offset
      });
    })
  }
}

export default MedicoController;
