import AppError from "../errors/AppError";
import { ISortPaginateQuery, SortPaginate } from "../helpers/SortPaginate";
import Candidatura, { IAtributosCandidaturaCriacao } from "../models/Candidatura";
import Equipe from "../models/Equipe";
import Medico from "../models/Medico";
import EquipeService from "./EquipeService";
import RetornoService from "./RetornoService";
import UsuarioService from "./UsuarioService";

export default class CandidaturaService{
    equipeService!: EquipeService;
    retornoService!: RetornoService;
    usuarioService!: UsuarioService;

    constructor(){
        this.equipeService = new EquipeService();
        this.retornoService = new RetornoService();
    }

    async create(candidatura: IAtributosCandidaturaCriacao){
        return Candidatura.create({...candidatura})
        .then(async (candidatura)=>{
            const { equipe_id, id: candidatura_id } = candidatura.get();
            const equipe = await this.equipeService.getById( equipe_id );
            const avaliador_id = equipe.get().usuario_id;

            
            return Promise.all([
                this.retornoService.create({
                    avaliador_id,
                    candidatura_id,
                    status: 'P',
                }),
                
            ])
            
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async update(candidatura: Partial<IAtributosCandidaturaCriacao>){
        return Candidatura.update(candidatura, {
            where: {id: candidatura.id},
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async delete(id: number){
        return Candidatura.destroy({
            where: {id}
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getById(id: number){
        return Candidatura.findOne({
            where: {id},
            include: [ Medico, Equipe ]
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getBy(key: keyof Candidatura, atributo: string){
        return Candidatura.findAll({
            where: {
                [key]: atributo
            }
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
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
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
}