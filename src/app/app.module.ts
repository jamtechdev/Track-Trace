import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './layout/Auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup' // to be added

@NgModule({
  declarations: [AppComponent, ResetPasswordComponent],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AuthModule,
    NgToastModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
