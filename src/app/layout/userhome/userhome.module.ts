import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome.component';
import { UserhomeRoutingModule } from './userhome.routing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
  declarations: [UserhomeComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, UserhomeRoutingModule, NgxScannerQrcodeModule],
})
export class UserhomeModule {}
