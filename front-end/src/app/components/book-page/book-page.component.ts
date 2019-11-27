import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { getSpecificBook } from 'src/app/reducers/books.reducer';
import { AppState } from 'src/app/reducers/store-reducers';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.less']
})
export class BookPageComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private bookId = '';

  public book$: Observable<Book>;
  public book: Book;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.bookId = params.isbn;

      this.book$ = this.store.pipe(
        select(getSpecificBook, { isbn: this.bookId })
      );

      this.book$.subscribe(book => this.book = book);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
