import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../auth/auth.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: Observable<{ user: User | null }>;
  constructor(private store: Store<fromApp.AppState>) {
    this.user = this.store.select('auth');
  }
  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
