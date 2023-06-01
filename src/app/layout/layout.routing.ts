import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserhomeModule } from './userhome/userhome.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), UserhomeModule],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
