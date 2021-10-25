import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Candidatura, { IAtributosCandidaturaCriacao } from "../models/Candidatura";
import Equipe from "../models/Equipe";
import Medico from "../models/Medico";

export default class CandidaturaService{
    async create(candidatura: IAtributosCandidaturaCriacao){
        return Candidatura.create({...candidatura})
    }
    async update(candidatura: Partial<IAtributosCandidaturaCriacao>){
        return Candidatura.update(candidatura, {
            where: {id: candidatura.id},
        });
    }
    async delete(id: number){
        return Candidatura.destroy({
            where: {id}
          })
    }
    async getById(id: number){
        return Candidatura.findOne({
            where: {id},
            include: [ Medico, Equipe ]
        })
    }
    async getBy(key: keyof Candidatura, atributo: string){
        return Candidatura.findAll({
            where: {
                [key]: atributo
            }
        })
    }

    async getAll( sortPaginate: ISortPaginateQuery, atributos: string[] ){
        return Candidatura.findAndCountAll()
        .then(async (dados) => {
            const count: number = (dados.count) as any;
            const { paginas, ...SortPaginateOptions } = SortPaginate(
                {...sortPaginate},
                atributos,
                count
            );
            return {
                candidaturas: await Candidatura.findAll({
                    ...SortPaginateOptions,
                }),
                count,
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