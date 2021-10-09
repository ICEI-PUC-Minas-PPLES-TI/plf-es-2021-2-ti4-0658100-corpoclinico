import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Equipe, { IAtributosEquipeCriacao } from "../models/Equipe";
import Especialidade from "../models/Especialidade";

export default class EquipeService{
    async create(equipe: IAtributosEquipeCriacao){
        return Equipe.create(equipe, {
            include: {
                association: Equipe.associations.especialidade
            }
        })
    }
    async update(equipe: Partial<IAtributosEquipeCriacao>){
        if (equipe.especialidade){
            await Especialidade.update(equipe.especialidade, {
                where: {id: equipe.especialidade_id},
            })
        }
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
            include: { 
                model: Especialidade,
                attributes: ['identificacao']
            }
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
                    include: {
                        all: true
                    },
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