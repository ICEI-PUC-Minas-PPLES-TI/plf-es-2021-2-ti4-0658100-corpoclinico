export type IGetAllMedicoFilter = {
    nome?: boolean,
    dt_inicio?: string,
    dt_fim?: any,
    status?: 'P' | 'A' | 'R',
    paraRevisar?: boolean,
    idAvalidor?: number
}
