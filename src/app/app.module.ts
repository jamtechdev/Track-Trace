import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { NgxScannerQrcodeModule } from 'ngx-qrcode-updated';

@NgModule({
  declarations: [AppComponent, LoginComponent, ResetPasswordComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
