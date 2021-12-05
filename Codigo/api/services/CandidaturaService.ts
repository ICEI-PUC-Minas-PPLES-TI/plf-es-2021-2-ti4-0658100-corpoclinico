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
        this.usuarioService = new UsuarioService();
    }

    async create(candidatura: IAtributosCandidaturaCriacao){
        const candidaturaCriada = await Candidatura.create({...candidatura})
        const usuarios = (await this.usuarioService.getAllBy('tipo', ['A'])).map(u=>(u.get().id))

        const { /*equipe_id, */id: candidatura_id } = candidaturaCriada;
        // criação de retorno no nome do responsável da equipe - requisito paralizado
        /*const equipe = await this.equipeService.getById( equipe_id );
        const avaliador_equipe_id = equipe?.get().usuario_id;

        if (avaliador_equipe_id)
            usuarios.push(avaliador_equipe_id);*/

        await Promise.all([
            usuarios.map(async (avaliador_id) => await this.retornoService.create({
                avaliador_id,
                candidatura_id,
                status: 'P',
            }))
        ])
        return candidaturaCriada;
    }
    async update(candidatura: Partial<IAtributosCandidaturaCriacao>){

      let candidaturaAtualizada : any;
      if(candidatura.id)
        candidaturaAtualizada = await Candidatura.findByPk(candidatura.id);

      if(!candidaturaAtualizada)
        throw new AppError("Candidatura do médico não encontrada!", 500, ["'candidatura.id' da candidatura do médico não encontrada"]);

      try {
        await candidaturaAtualizada.update(candidatura)
      } catch (erro) {
        throw new AppError("Erro interno no servidor!", 500, erro);
      }

      return candidaturaAtualizada;
    }
    async delete(id: number) {
        return Candidatura.destroy({
            where: {id}
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getById(id: number) {
        return Candidatura.findOne({
            where: { id },
            include: [Medico, Equipe]
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }
    async getBy(key: keyof Candidatura, atributo: string) {
        return Candidatura.findAll({
            where: {
                [key]: atributo
            }
        })
        .catch (erro => {
            throw new AppError("Erro interno no servidor!", 500, erro);
        })
    }

    async getAll(sortPaginate: ISortPaginateQuery, atributos: string[]) {
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
