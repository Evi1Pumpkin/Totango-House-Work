import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatDialogRef, MatInputModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BookTileComponent } from './components/book-tile/book-tile.component';
import { BookListComponent } from './components/book-list/book-list.component';

import { reducers } from './reducers/store-reducers';
import { BookEffects } from './effects/books.effects';
import { BooksService } from './services/books.service';
import { TruncatePipe } from './shared/truncate.pipe';
import { ShekelPipe } from './shared/shekel.pipe';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { BookPageComponent } from './components//book-page/book-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BookTileComponent,
    BookListComponent,
    TruncatePipe,
    ShekelPipe,
    BookPageComponent,
    AddBookComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BookEffects]),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [BooksService, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
