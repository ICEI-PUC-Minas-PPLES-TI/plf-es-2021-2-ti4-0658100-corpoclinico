import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Especialidade, { IAtributosEspecialidadeCriacao } from "../models/Especialidade";

export default class EspecialidadeService{
    async create(especialidade: IAtributosEspecialidadeCriacao){
        return Especialidade.create(especialidade)
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async update(especialidade: Partial<IAtributosEspecialidadeCriacao>){
        return Especialidade.update(especialidade, {
            where: {id: especialidade.id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async delete(id: number){
        return Especialidade.destroy({
            where: {id}
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getById(id: number){
        return Especialidade.findOne({
            where: {id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return Especialidade.findAndCountAll()
        .then(async (dados) => {
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                dados.count
            );
            return {
                especialidades: await Especialidade.findAll({
                    ...SortPaginateOptions,
                }),
                count: dados.count,
                paginas,
                offset: SortPaginateOptions.offset
            }
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
}