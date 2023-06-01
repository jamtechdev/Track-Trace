import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './layout/Auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/Auth/auth.module').then((m) => m.AuthModule),
  }
  ,  {
    path: 'home',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
