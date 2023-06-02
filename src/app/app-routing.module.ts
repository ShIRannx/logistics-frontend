import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRouteGuard } from './auth/auth-routing.guard';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [authRouteGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./logistics/logistics.module').then(m => m.LogisticsModule),
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
