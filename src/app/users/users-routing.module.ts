import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../auth/guards/admin.guards';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UsersComponent } from './users.component';
import { UsersResolver } from './users.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canMatch: [adminGuard],
    children: [
      { path: '', component: UserStartComponent },
      { path: 'new', component: UserEditComponent },
      { path: ':id', component: UserDetailComponent, resolve: [UsersResolver] },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: [UsersResolver],
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UsersRoutingModule {}
