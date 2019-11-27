import { ActionReducerMap } from '@ngrx/store';
import { BookState, booksReducer } from './books.reducer';

export interface AppState {
  bookState: BookState;
}

export const reducers: ActionReducerMap<AppState> = {
    bookState: booksReducer
};
