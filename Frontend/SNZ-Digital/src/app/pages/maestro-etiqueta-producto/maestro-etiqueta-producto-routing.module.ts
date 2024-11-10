import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroEtiquetaProductoPage } from './maestro-etiqueta-producto.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroEtiquetaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroEtiquetaProductoPageRoutingModule {}
