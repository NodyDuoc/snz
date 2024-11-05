import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroDespachoPage } from './maestro-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroDespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroDespachoPageRoutingModule {}
