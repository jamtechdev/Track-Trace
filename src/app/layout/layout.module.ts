import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing';
import { UserhomeRoutingModule } from './userhome/userhome.routing';
import { UserhomeModule } from './userhome/userhome.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonResourcesModule } from '../common-resources/common-resources.module';
import { ScannerComponent } from '../common-resources/scanner/scanner/scanner.component';

@NgModule({
  declarations: [LayoutComponent ],
  imports: [LayoutRoutingModule],
})
export class LayoutModule {}
