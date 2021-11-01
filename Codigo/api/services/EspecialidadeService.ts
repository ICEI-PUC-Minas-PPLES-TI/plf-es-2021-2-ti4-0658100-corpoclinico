import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Especialidade, { IAtributosEspecialidadeCriacao } from "../models/Especialidade";

export default class EspecialidadeService{
    async create(especialidade: IAtributosEspecialidadeCriacao){
        return Especialidade.create(especialidade)
    }
    async update(especialidade: Partial<IAtributosEspecialidadeCriacao>){
        return Especialidade.update(especialidade, {
            where: {id: especialidade.id},
        });
    }
    async delete(id: number){
        return Especialidade.destroy({
            where: {id}
          })
    }
    async getById(id: number){
        return Especialidade.findOne({
            where: {id},
        })
    }
    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return Especialidade.findAndCountAll()
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
        .catch((error) => {
            console.log(error);
            throw error;
        });
    }
}