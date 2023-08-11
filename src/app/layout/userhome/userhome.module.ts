import { CommonResourcesModule } from 'src/app/common-resources/common-resources.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { UserhomeRoutingModule } from './userhome.routing';
import { UserhomeComponent } from './userhome.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { NgToastModule } from 'ng-angular-popup'; // to be added

@NgModule({
  declarations: [UserhomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    UserhomeRoutingModule,
    CommonResourcesModule,
    QrCodeModule,
    NgToastModule,
  ],
})
export class UserhomeModule {}
