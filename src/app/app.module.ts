import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './layout/Auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { NgxScannerQrcodeModule } from 'ngx-qrcode-updated';

@NgModule({
  declarations: [AppComponent, LoginComponent, ResetPasswordComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
=======
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, ResetPasswordComponent],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AuthModule,
  ],
>>>>>>> 1e036f05f9fb9289353803e3e539fc43f166cf20
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
