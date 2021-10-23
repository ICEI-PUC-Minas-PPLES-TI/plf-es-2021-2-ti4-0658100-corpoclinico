import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";

export default class UsuarioService {

  async create(usuario: IAtributosUsuarioCriacao) {
    return Usuario.create(usuario)
    .catch((err)=>{
      throw new AppError("Erro interno no servidor", 500, err)
    })
  }

  async update(usuario: Partial<IAtributosUsuario>) {
    return Usuario.update(usuario, {
      where: { id: usuario.id }
    })
    .catch((err)=>{
      throw new AppError("Erro interno no servidor", 500, err)
    })
  }

  async delete(id: number) {
    const usuario = await this.getById(id);
    if (!usuario) {
      throw new AppError("Usuário não encontrado!", 404);
    }
    return Usuario.destroy({
      where: { id }
    })
    .catch((err)=>{
      throw new AppError("Erro interno no servidor", 500, err)
    })
  }

  async getById(id: number, paranoid?: boolean) {
    return Usuario.findOne({
      where: { id },
      paranoid
    })
    .catch((err)=>{
      throw new AppError("Erro interno no servidor", 500, err)
    })
  }

  async getBy(field: keyof IAtributosUsuario, value: any, atributes?: Array<keyof IAtributosUsuario>) {
    return Usuario.findOne({
      where: {
        [field]: value
      }
    })
    .catch((err)=>{
      throw new AppError("Erro interno no servidor", 500, err)
    })
  }

  async getAll(sortPaginate: ISortPaginateQuery) {
    const atributos = Object.keys(
      Usuario.rawAttributes
    ) /* Todos os atributos de usuário */

    return Usuario.findAndCountAll()
      .then(async (dados) => {
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          { ...sortPaginate },
          atributos,
          dados.count
        );
        return {
          dados: await Usuario.findAll({
            attributes: atributos,
            ...SortPaginateOptions,
          }),
          paginas,
          offset: SortPaginateOptions.offset,
          total: dados.count
        }
      })
      .catch((err)=>{
        throw new AppError("Erro interno no servidor", 500, err)
      })
  }

}
