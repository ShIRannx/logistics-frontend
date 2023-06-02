import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loading = false;
  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(24)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(24)],
    ],
  });
  authStoreSub: Subscription;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<fromApp.AppState>
  ) {
    this.authStoreSub = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
    });
  }

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe(state => {
        if (!state.user?.username) return;
        this.loginForm.patchValue({ username: state.user.username });
      });
  }

  isFormValid() {
    return this.loginForm.valid;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const formValue = this.loginForm.getRawValue();

    this.store.dispatch(AuthActions.loginStart(formValue));
    // this.authService.login(username, password).subscribe({
    //   next: () => {
    //     this.loading = false;
    //     this.router.navigate(['/main']);
    //   },
    //   error: err => {
    //     this.loading = false;
    //   },
    // });
  }
  ngOnDestroy(): void {
    this.authStoreSub.unsubscribe();
  }
}
