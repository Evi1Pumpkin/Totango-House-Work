import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, empty } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { BooksService } from '../services/books.service';
import * as bookActions from '../actions/book.actions';

@Injectable()
export class BookEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.GET_ALL),
    switchMap(() => {
      return this.booksService.getAllBooks().pipe(
        map(books => new bookActions.GetAllSuccess(books)),
        catchError(() => of(new bookActions.GetAllSuccess([])))
      );
    })
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.ADD),
    switchMap(({payload}) => {
      return this.booksService.addBook(payload).pipe(
        map(resBook => new bookActions.AddSuccess(resBook)),
        catchError(() => empty())
      );
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.DELETE),
    switchMap(({payload}) => {
      return this.booksService.removeBook(payload).pipe(
        map(bookIsbn => new bookActions.DeleteSuccess(bookIsbn)),
        catchError(() => empty())
      );
    })
  );

  constructor(private actions$: Actions, private booksService: BooksService) {}
}
