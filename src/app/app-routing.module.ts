import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './layout/Auth/login/login.component';
import { authGuard } from './common-resources/servieces/gaurd/auth.guard';
import { logInGaurd } from './common-resources/servieces/gaurd/login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [logInGaurd],
    loadChildren: () =>
      import('./layout/Auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./Admin/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
