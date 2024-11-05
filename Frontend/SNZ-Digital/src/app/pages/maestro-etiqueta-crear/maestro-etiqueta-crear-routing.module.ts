import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroEtiquetaCrearPage } from './maestro-etiqueta-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroEtiquetaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroEtiquetaCrearPageRoutingModule {}
