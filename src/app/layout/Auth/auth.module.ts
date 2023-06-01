import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/layout/Auth/login/login.component';



const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];



@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [
    CommonModule,  ReactiveFormsModule, RouterModule.forChild(routes)
  ], providers: [],
  bootstrap: [SignUpComponent, LoginComponent]
})
export class AuthModule { }
