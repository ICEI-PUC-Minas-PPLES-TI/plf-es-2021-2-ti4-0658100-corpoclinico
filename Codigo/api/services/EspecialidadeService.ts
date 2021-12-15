import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Especialidade, { IAtributosEspecialidadeCriacao } from "../models/Especialidade";

export default class EspecialidadeService{
    async create(especialidade: IAtributosEspecialidadeCriacao){
        return await Especialidade.create(especialidade)
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async update(especialidade: Partial<IAtributosEspecialidadeCriacao>){
        return await Especialidade.update(especialidade, {
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
        return await Especialidade.findOne({
            where: {id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return await Especialidade.findAndCountAll()
        .then(async (dados) => {
            const count: number = (dados.count) as any;
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                count
            );
            return {
                especialidades: await Especialidade.findAll({
                    ...SortPaginateOptions,
                }),
                count: count,
                paginas,
                offset: SortPaginateOptions.offset
            }
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
}
