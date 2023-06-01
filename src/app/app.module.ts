import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/Auth/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './layout/Auth/auth.module';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent,  ResetPasswordComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule , AuthModule , HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
