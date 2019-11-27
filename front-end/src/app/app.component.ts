import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers/store-reducers';
import * as BookActions from './actions/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private store: Store<AppState>) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
   this.store.dispatch(new BookActions.GetAll());
  }
}
