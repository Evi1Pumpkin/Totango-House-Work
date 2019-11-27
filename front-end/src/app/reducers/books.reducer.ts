import { createSelector } from '@ngrx/store';
import { Book } from '../models/book.model';
import * as bookActions from '../actions/book.actions';
import { AppState } from './store-reducers';

export interface BookState {
  books: { [isbn: string]: Book };
}

export const initialState: BookState = {
  books: {}
};

export function booksReducer(
  state = initialState,
  action: bookActions.Actions
): BookState {
  switch (action.type) {
    case bookActions.GET_ALL_SUCCESS: {
      const books: { [isbn: string]: Book } = {};

      action.payload.forEach((book: Book) => (books[book.isbn] = book));

      return {
        ...state,
        books
      };
    }
    case bookActions.ADD_SUCCESS: {
      const book: { [isbn: string]: Book } = {
        [action.payload.isbn]: action.payload
      };

      return {
        ...state,
        books: Object.assign({}, state.books, book)
      };
    }
    case bookActions.DELETE_SUCCESS: {
      const bookIsbn: string = action.payload;
      const books: { [isbn: string]: Book } = {...state.books};

      delete books[bookIsbn];

      return {
        ...state,
        books
      };
    }
    default: {
      return state;
    }
  }
}

export const booksFeature = (state: AppState) => state.bookState;
export const getBooksHashmap = createSelector(
  booksFeature,
  (state: BookState) => state.books
);

export const getBooks = createSelector(getBooksHashmap, books => {
  return Object.values(books);
});

export const getSpecificBook = createSelector(getBooksHashmap, (books: { [isbn: string]: Book }, props)  => {
  return books[props.isbn];
});
