import AppError from "../errors/AppError";
import Video, { IAtributosVideo, IAtributosVideoCriacao } from "../models/Video";

export default class VideoService {

  async create(video: IAtributosVideoCriacao) {
    video.ativo = true;
    return Video.create(video)
    .catch (error => {
      throw new AppError("Vídeo não criado!", 500, error);
    })
  }

  async update(video: Partial<IAtributosVideo>) {
    const videoBD = await Video.findByPk(video.id);
    if (videoBD){
        return videoBD.update(video)
        .catch(error => {
            throw new AppError("Erro interno do servidor!", 500, error);
        });
    }
    else{
        throw new AppError("Vídeo não encontrado", 404)
    }
  }

  async delete(id: number) {
    const video = await Video.findByPk(id);
    if (!video) {
      throw new AppError("Video não encontrada!", 404);
    }
    video.update({
      ativo: false,
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
    return video;
  }

  async getById(id: number) {
    return Video.findOne({
      where: { id }
    })
    .catch (erro => {
      throw new AppError("Erro interno no servidor!", 500, erro);
    })
  }

  async getBy(field: keyof Video, value: any) {
    return Video.findOne({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getAllBy(field: keyof Video, value: any) {
    return Video.findAll({
      where: {
        [field]: value
      }
    })
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getAll() {
    return Video.findAll()
    .catch(error => {
        throw new AppError("Erro interno do servidor!", 500, error);
    });
  }

  async getLastByPrioridade(){
    return Video.findOne({
      order: [["prioridade", "DESC"]]
    })
  }

}
