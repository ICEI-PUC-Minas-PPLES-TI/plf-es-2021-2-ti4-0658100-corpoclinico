import AppError from "../errors/AppError";
import ArquivoService from "../services/ArquivoService";

import { DeleteRequestHandler } from "../types/RequestHandlers";

class ArquivoController {
  private service!: ArquivoService;

  constructor(){
    this.service = new ArquivoService();
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
