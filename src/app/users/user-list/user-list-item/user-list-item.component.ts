import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { User } from '../../user.model';
import * as UserActions from '../../store/user.actions';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css'],
})
export class UserListItemComponent {
  @Input() users: User[] = [];
  constructor(private store: Store<fromApp.AppState>) {}
  onDeleteUser(id: string) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
