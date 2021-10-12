import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";

export default class UsuarioService {

  async create(usuario: IAtributosUsuarioCriacao) {
    return Usuario.create(usuario);
  }

  async update(usuario: Partial<IAtributosUsuario>) {
    return Usuario.update(usuario, {
      where: { id: usuario.id }
    });
  }

  async delete(id: number) {
    const usuario = await this.getById(id);
    if (!usuario) {
      throw new AppError("Usuário não encontrado!", 404);
    }
    return Usuario.destroy({
      where: { id }
    })
  }

  async getById(id: number) {
    return Usuario.findOne({
      where: { id }
    })
  }

  async getBy(field: keyof Usuario, value: any) {
    return Usuario.findOne({
      where: {
        [field]: value
      }
    })
  }

  async getAll(sortPaginate: ISortPaginateQuery, atributos: string[],) {
    return Usuario.findAndCountAll()
      .then(async (dados) => {
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          { ...sortPaginate },
          atributos,
          dados.count
        );
        return {
          usuarios: await Usuario.findAll({
            attributes: atributos,
            ...SortPaginateOptions,
          }),
          count: dados.count,
          paginas,
          offset: SortPaginateOptions.offset
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

}
