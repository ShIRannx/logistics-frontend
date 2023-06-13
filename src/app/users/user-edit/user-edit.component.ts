import { Component, OnInit } from '@angular/core';
import * as UserActions from '../store/user.actions';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  id: string = '';
  editMode: boolean = false;
  userForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    admin: [false, [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => (this.id = params['id'])),
        switchMap(() => this.store.select('users')),
        map(state => state.users.find(user => user.uuid === this.id))
      )
      .subscribe(user => {
        this.editMode = !!this.id;
        if (!this.editMode) return;

        this.userForm.reset();
        this.userForm.patchValue({ ...user, admin: user?.authz } ?? {});
        this.userForm.addControl(
          'uuid',
          this.fb.control({ value: user?.uuid, disabled: true })
        );
      });
  }
  onSubmit() {
    const { username, password, admin } = this.userForm.value;
    if (!password || !username) return;

    this.editMode
      ? this.store.dispatch(
          UserActions.updateUser({
            username,
            password,
            id: this.id,
            authz: admin,
          })
        )
      : this.store.dispatch(
          UserActions.addUser({ username, password, authz: admin })
        );
  }
}
