
export type CreateResponse = {
  id: number
}

export type DeleteResponse = {}

export type UpdateResponse = {}

export type ReadResponse<T> = {
  dados: T[],
  quantidade: number,
  total: number,
  paginas: number,
  offset: number
}
