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
import { IAtributosCandidaturaCriacao } from "../models/Candidatura";

interface IAtributosMedicoUsuarioCriacao extends IAtributosMedicoCriacao, IAtributosUsuarioCriacao, IAtributosCandidaturaCriacao { }

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
    } catch (erro) {
      throw new AppError("Erro na validação de um ou mais campos", 422, erro)
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
        ]).catch(async (error)=>{
          await this.medicoService.delete(medico.id, true);
          throw error;
        })
        return response.status(201).json({
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
        throw new AppError("Médico não criado!", 500, erro);
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
  public get: GetRequestHandler<IAtributosMedico> = async (request, response) => {
    const medico = await this.medicoService.getById(Number(request.params.id), [
      {
        model: Usuario,
        attributes: ['email', 'nome']
      },
      {
        model: Arquivo,
        attributes: ['nome_arquivo', 'tipo']
      }
    ]);

    if (!medico)
      throw new AppError("Medico não encontrado!", 404);
    else
      response.status(200).json(medico);
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

    const { crm, regiao, dt_inscricao_crm, celular, cartao_sus, categoria, rg, rg_orgao_emissor, rg_data_emissao, dt_nascimento, cpf, titulo_eleitoral, zona, secao, logradouro, numero, complemento, bairro, cidade, estado, cep, sociedade_cientifica, escolaridade_max } = request.body;

    const medico = await this.medicoService.getById(Number(request.params.id))
    if (!medico) {
      throw new AppError("Medico não encontrado!", 404);
    } else {
      await this.medicoService.update(
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
      );
      response.status(200).json({});
    }
  }

  // URI de exemplo: http://localhost:3000/api/medico?pagina=1&limite=5&atributo=nome&ordem=DESC
  // todos as querys são opicionais
  public getAll: GetAllRequestHandler<IAtributosMedico> = async (request, response) => {

    await this.medicoService.getAll(
      { ...request.query },
      Object.keys(Medico.rawAttributes)
    )
    .then(({ medicos, count, paginas, offset }) => {
      const total: number = (count) as any;
      response.status(200).json({
        dados: medicos,
        quantidade: medicos.length,
        total: total,
        paginas: paginas,
        offset: offset
      });
    })
  }
}

export default MedicoController;
