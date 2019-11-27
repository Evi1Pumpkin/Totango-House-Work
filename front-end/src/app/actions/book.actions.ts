import { Action } from '@ngrx/store';
import { Book } from '../models/book.model';

export const GET_ALL = '[Book] Get all';
export const GET_ALL_SUCCESS = '[Book] Get all success';
export const ADD = '[Book] add';
export const ADD_SUCCESS = '[Book] add success';
export const DELETE = '[Book] delete';
export const DELETE_SUCCESS = '[Book] delete success';

export class GetAll implements Action {
  readonly type = GET_ALL;

  constructor() {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS;

  constructor(public payload: Book[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Book) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Book) {}
}
export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) {}
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: string) {}
}

export type Actions =
  | GetAll
  | GetAllSuccess
  | Add
  | AddSuccess
  | Delete
  | DeleteSuccess;
