import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { User } from '../user.model';
import { getUsers } from '../store/user.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: Observable<User[]>;
  constructor(private store: Store<fromApp.AppState>) {
    this.users = this.store.select(getUsers);
  }
}
