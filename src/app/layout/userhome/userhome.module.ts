import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome.component';
import { UserhomeRoutingModule } from './userhome.routing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CommonResourcesModule } from 'src/app/common-resources/common-resources.module';
import { ScannerComponent } from 'src/app/common-resources/scanner/scanner/scanner.component';
@NgModule({
  declarations: [UserhomeComponent, HeaderComponent, FooterComponent ],
  imports: [CommonModule, UserhomeRoutingModule , CommonResourcesModule],
})
export class UserhomeModule {}
