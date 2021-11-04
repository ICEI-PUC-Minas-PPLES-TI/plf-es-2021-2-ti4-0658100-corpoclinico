import { OrderItem } from 'sequelize'

interface ISortableQuery {
  atributo: string,
  ordem: 'ASC' | 'DESC'
}
interface IPaginatableQuery {
  limite: string,
  pagina: string
}
export interface ISortPaginateQuery extends Partial<ISortableQuery>, Partial<IPaginatableQuery> {
  [filtros: string]: any;
}

function SortPaginate(query: ISortPaginateQuery, atributos: string[], dadosCount: number) {
  const limite =
    query.limite && Number.parseInt(query.limite) < 50
      ? Number.parseInt(query.limite)
      : 50;

  const pagina = query.pagina ? Number.parseInt(query.pagina) : 1;
  const paginas = Math.ceil(dadosCount / limite);

  const offset = limite * (pagina - 1);

  const atributo =
    query.atributo && atributos.includes(query.atributo)
      ? query.atributo
      : "id";

  const ordem = query.ordem === "DESC" ? "DESC" : "ASC";

  return {
    limit: limite,
    offset: offset,
    order: [[atributo, ordem]] as OrderItem[],
    paginas
  };
}

export {
  SortPaginate
};
