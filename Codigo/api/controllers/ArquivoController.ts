import AppError from "../errors/AppError";
import { IAtributosArquivo } from "../models/Arquivo";
import ArquivoService from "../services/ArquivoService";

import { DeleteRequestHandler, GetRequestHandler } from "../types/RequestHandlers";

const path = require("path");

class ArquivoController {
  private service!: ArquivoService;

  constructor(){
    this.service = new ArquivoService();
  }

  public download: GetRequestHandler<IAtributosArquivo> = async (request, response) => {
    const arquivo = await this.service.findById(Number(request.params.id));

    const arquivoDir = await path.resolve(process.cwd(), ("api\\uploads\\" + arquivo.get().nome_arquivo));
    return response.download(arquivoDir);
  }

  public delete: DeleteRequestHandler = async (request, response) => {
    await this.service.deleteById(Number(request.params.id))
    .then(dado => {
      response.status(204).json({
          deletado: true,
          dado: Number(request.params.id),
      });
    })
    .catch(function(error) {
        throw new AppError("Arquivo não deletado!" + error, 500);
    });
  }

}

export default ArquivoController;
