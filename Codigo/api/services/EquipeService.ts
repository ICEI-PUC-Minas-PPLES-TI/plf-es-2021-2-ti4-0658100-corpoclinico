import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Equipe, { IAtributosEquipeCriacao } from "../models/Equipe";
import Especialidade from "../models/Especialidade";

export default class EquipeService{
    async create(equipe: IAtributosEquipeCriacao){
        return Equipe.create(equipe)
    }
    async update(equipe: Partial<IAtributosEquipeCriacao>){
        return Equipe.update(equipe, {
            where: {id: equipe.id},
        });
    }
    async delete(id: number){
        return Equipe.destroy({
            where: {id}
          })
    }
    async getById(id: number){
        return Equipe.findOne({
            where: {id},
            include: [ Especialidade ]
        })
    }

    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[],  ){
        return Equipe.findAndCountAll()
        .then(async (dados) => {
            const count: number = (dados.count) as any;
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                count
            );
            return {
                equipes: await Equipe.findAll({
                    include: [ Especialidade ],
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