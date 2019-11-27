import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { getBooks } from '../../reducers/books.reducer';
import { AppState } from 'src/app/reducers/store-reducers';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(store: Store<AppState>) {
    this.books$ = store.select(getBooks);
  }
}
