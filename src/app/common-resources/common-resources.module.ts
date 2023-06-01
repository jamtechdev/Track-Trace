import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeModule } from '../layout/userhome/userhome.module';
import { ScannerComponent } from './scanner/scanner/scanner.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule  , NgxScannerQrcodeModule
  ],
  exports :[ScannerComponent]
})
export class CommonResourcesModule { }
