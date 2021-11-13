import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import MedicoFormacao, { IAtributosMedicoFormacaoCriacao } from "../models/MedicoFormacao";
import Especialidade from "../models/Especialidade";

export default class MedicoFormacaoService{
    async create(medicoFormacao: IAtributosMedicoFormacaoCriacao){
        return MedicoFormacao.create(medicoFormacao)
    }
    async update(medicoFormacao: Partial<IAtributosMedicoFormacaoCriacao>){
        return MedicoFormacao.update(medicoFormacao, {
            where: {id: medicoFormacao.id},
        });
    }
    async delete(id: number){
        return MedicoFormacao.destroy({
            where: {id}
          })
    }
    async getById(id: number){
        return MedicoFormacao.findOne({
            where: {id},
            include: [ Especialidade ]
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
                medicoFormacaos: await MedicoFormacao.findAll({
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
