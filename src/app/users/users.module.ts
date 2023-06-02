import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { UserListItemComponent } from './user-list/user-list-item/user-list-item.component';
import { UserStartComponent } from './user-start/user-start.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserListComponent,
    UsersComponent,
    UserListItemComponent,
    UserStartComponent,
    UserEditComponent,
    UserDetailComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
