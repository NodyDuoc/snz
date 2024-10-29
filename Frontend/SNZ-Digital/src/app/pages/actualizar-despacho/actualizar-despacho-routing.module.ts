import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarDespachoPage } from './actualizar-despacho.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarDespachoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarDespachoPageRoutingModule {}
