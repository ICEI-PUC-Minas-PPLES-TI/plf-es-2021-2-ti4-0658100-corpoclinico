import { RequestHandler } from 'express'
import { CreateResponse, DeleteResponse, ReadResponse, UpdateResponse } from './Responses'
import { ISortPaginateQuery } from '../helpers/SortPaginate'

///tipos dos handlers dos principais requests

export type CreateRequestHandler<TRequestBody = any> = RequestHandler<never, CreateResponse, TRequestBody>;

export type GetAllRequestHandler<TModel, TQuery=ISortPaginateQuery> = RequestHandler<never, ReadResponse<TModel>, never, TQuery>;

export type GetRequestHandler<TModel> = RequestHandler<{ id: string }, TModel | undefined | null>

export type GetAllSimpleRequestHandler<TModel> = RequestHandler<{id: string}, TModel|undefined|null|TModel[]>

export type UpddateRequestHandler<TRequestBody = any> = RequestHandler<{id: string}, UpdateResponse, TRequestBody>;

export type DeleteRequestHandler = RequestHandler<{ id: string }, DeleteResponse, never>;
