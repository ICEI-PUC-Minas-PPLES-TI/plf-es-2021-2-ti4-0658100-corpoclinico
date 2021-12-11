import { IAtributosVideo , IAtributosVideoCriacao } from "../models/Video";
import AppError from "../errors/AppError";

import { CreateRequestHandler, DeleteRequestHandler, GetAllSimpleRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import VideoService from "../services/VideoService";
import { videoCreateValidationScheme, videoUpdateValidationScheme } from "../validations/VideoValidations";

interface IGetAllVideoRequest{
    ativo: boolean
}

class VideoController {

  private Service!: VideoService;

  constructor(){
    this.Service = new VideoService();
  }

  public create: CreateRequestHandler<IAtributosVideoCriacao> = async (request, response) => {
    const scheme = videoCreateValidationScheme;
    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const { link } = request.body;

    const prioridade = ((await this.Service.getLastByPrioridade())?.get()?.prioridade ?? 0) + 1;

    const video = await this.Service.create({ link, prioridade })
    response.status(201).json({
      id: video.id,
    })
  }

  public update: UpddateRequestHandler<IAtributosVideoCriacao> = async (request, response) => {
    const scheme = videoUpdateValidationScheme;

    // Validando com o esquema criado:
    await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações

    const { link, prioridade, ativo } = request.body;

    await this.Service.update({ link, prioridade, ativo, id: Number(request.params.id) });
    response.status(201).send();
  }

  public delete: DeleteRequestHandler = async (request,response) => {
    await this.Service.delete(Number(request.params.id));
    response.status(200).send();
  }

  // URI de exemplo: http://localhost:3000/api/video/1
  public get: GetRequestHandler<IAtributosVideo> = async (request, response) => {
    const video = await this.Service.getById(Number(request.params.id));
    if (!video) {
      throw new AppError('Video não encontrado', 404);
    } else {
      response.status(200).json(video);
    }
  }

  // URI de exemplo: {{server}}/api/video
  public getAll: GetAllSimpleRequestHandler<IAtributosVideo> = async (request, response) => {

    const videos = (request.query.ativo && request.query.ativo == "1") ?
      await this.Service.getAllBy('ativo', true) :
    await this.Service.getAll();
    response.status(200).json(videos);
  }
}

export default VideoController;
