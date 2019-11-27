import { Routes } from '@angular/router';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {
    path: 'addBook',
    component: AddBookComponent
  },
  {
    path: 'book/:isbn',
    component: BookPageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
