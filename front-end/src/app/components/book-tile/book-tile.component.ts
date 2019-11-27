import { Component, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/models/book.model';
import { AppState } from 'src/app/reducers/store-reducers';
import * as BookActions from '../../actions/book.actions';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.less']
})

export class BookTileComponent {
  public imageDefault = 'https://www.pngtube.com/myfile/detail/192-1925345_closed-book-icon-book-icon-png-transparent.png';

  constructor(private store: Store<AppState>, private router: Router) { }

  @Input () book: Book;

  public deleteBook() {
    this.store.dispatch(new BookActions.Delete(this.book.isbn));
  }

  public routeToBookPage() {
    this.router.navigate(['/book', this.book.isbn]);
  }
}
