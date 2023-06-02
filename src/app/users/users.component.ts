import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as UserActions from '../users/store/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(UserActions.fetchUsers());
  }
}
