import { LoginComponent } from 'src/app/layout/Auth/login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  providers: [],
  bootstrap: [SignUpComponent, LoginComponent],
})
export class AuthModule {}
