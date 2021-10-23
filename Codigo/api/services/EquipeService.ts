import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Equipe, { IAtributosEquipeCriacao } from "../models/Equipe";
import Especialidade from "../models/Especialidade";

export default class EquipeService{
    async create(equipe: IAtributosEquipeCriacao){
        return Equipe.create(equipe)
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async update(equipe: Partial<IAtributosEquipeCriacao>){
        return Equipe.update(equipe, {
            where: {id: equipe.id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async delete(id: number){
        return Equipe.destroy({
            where: {id}
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getById(id: number){
        return Equipe.findOne({
            where: {id},
            include: [ Especialidade ]
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }

    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return Equipe.findAndCountAll()
        .then(async (dados) => {
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                dados.count
            );
            return {
                equipes: await Equipe.findAll({
                    include: [ Especialidade ],
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