import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroProductoPage } from './maestro-producto.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroProductoPageRoutingModule {}
