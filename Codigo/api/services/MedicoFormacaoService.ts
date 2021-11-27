import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import MedicoFormacao, { IAtributosMedicoFormacaoCriacao } from "../models/MedicoFormacao";
import Especialidade from "../models/Especialidade";

export default class MedicoFormacaoService{
    async create(formacao: IAtributosMedicoFormacaoCriacao){
        return MedicoFormacao.create(formacao)
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async update(formacao: Partial<IAtributosMedicoFormacaoCriacao>){
        return MedicoFormacao.update(formacao, {
            where: {id: formacao.id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async delete(id: number){
        return MedicoFormacao.destroy({
            where: {id}
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getById(id: number){
        return MedicoFormacao.findOne({
            where: {id},
            include: [ Especialidade ]
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }

    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return MedicoFormacao.findAndCountAll()
        .then(async (dados) => {
            const count: number = (dados.count) as any;
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                count
            );
            return {
                formacaos: await MedicoFormacao.findAll({
                    include: [ Especialidade ],
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
