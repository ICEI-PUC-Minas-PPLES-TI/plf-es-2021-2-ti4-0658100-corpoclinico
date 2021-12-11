import Retorno, { IAtributosRetorno , IAtributosRetornoCriacao } from "../models/Retorno";
import AppError from "../errors/AppError";

import { GetAllSimpleRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import RetornoService from "../services/RetornoService";
import { retornoUpdateScheme } from "../validations/RetornoValidations";
import CandidaturaService from "../services/CandidaturaService";
import MedicoService from "../services/MedicoService";

class RetornoController {

  private Service!: RetornoService;
  private CandidaturaService!: CandidaturaService;
  private MedicoService!: MedicoService;

  constructor(){
    this.Service = new RetornoService();
    this.CandidaturaService = new CandidaturaService();
    this.MedicoService = new MedicoService();
  }

  public update: UpddateRequestHandler<IAtributosRetornoCriacao> = async (request, response) => {
    const id = Number(request.params.id);
    const scheme = retornoUpdateScheme;

    const avaliador_id = Number(request.headers.authorization);

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const retorno = await this.Service.getById(id);
    if (!retorno)
        throw new AppError("Retorno não encontrado", 404);

    if (retorno.get().avaliador_id !== avaliador_id)
      throw new AppError("Você não é avaliador desse retorno!", 403);

    const { status, comentario } = request.body;

    await this.Service.update({ status, comentario, id });
    response.status(201).json({});
  }

  // URI de exemplo: http://localhost:3000/api/retorno/1
  public get: GetRequestHandler<IAtributosRetorno> = async (request, response) => {
    const retorno = await this.Service.getById(Number(request.params.id));
    if (!retorno) {
      throw new AppError('Retorno não encontrada', 404);
    } else {
      response.status(200).json(retorno);
    }
  }

  // URI de exemplo: {{server}}/api/retorno
  public getAll: GetAllSimpleRequestHandler<IAtributosRetorno> = async (request, response) => {
    if (request.headers.authorization){
      const usuarioLogadoId = Number(request.headers.authorization);
      const retornos = await this.Service.getAllBy("avaliador_id", usuarioLogadoId)
      response.status(200).json(retornos);
    }
    else
      throw new AppError("Necessario logar para acessar os retornos", 405);
    
  }

  public requestReview: UpddateRequestHandler = async (request, response) => {
    if (request.headers.authorization){
      const usuarioLogadoId = Number(request.headers.authorization);
      const medicoId = (await this.MedicoService.getBy("usuario_id", usuarioLogadoId))?.get().id;
      if (medicoId){
        const candidaturas = await this.CandidaturaService.getBy("medico_id", medicoId);
        const retornos = candidaturas.flatMap((c: any)=>{
          return c.get().retornos?.map((r: Retorno)=>r.get())
        });
        await Promise.all([
          retornos.map(async (retorno)=>{
            await this.Service.update({
              ...retorno,
              status: "P"
            })
          })
        ]);
        response.status(200).json();
      }
      else
        throw new AppError("Necessario ser um usuário médico para executar essa ação", 403);
    }
    else
      throw new AppError("Necessario logar para acessar os retornos", 405);
  }
}

export default RetornoController;
