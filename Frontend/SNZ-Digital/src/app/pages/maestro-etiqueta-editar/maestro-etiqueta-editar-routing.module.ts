import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroEtiquetaEditarPage } from './maestro-etiqueta-editar.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroEtiquetaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroEtiquetaEditarPageRoutingModule {}
