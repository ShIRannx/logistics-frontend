import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { map, switchMap } from 'rxjs';

import * as UserActions from '../store/user.actions';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id: string = '';
  user: User | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => (this.id = params['id'])),
        switchMap(() => this.store.select('users')),
        map(state => state.users.find(user => user.uuid === this.id))
      )
      .subscribe(user => (this.user = user));
  }
  onDeleteUser() {
    this.store.dispatch(UserActions.deleteUser({ id: this.id }));
  }
}
