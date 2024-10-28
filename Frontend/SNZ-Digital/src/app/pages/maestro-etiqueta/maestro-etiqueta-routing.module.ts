import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroEtiquetaPage } from './maestro-etiqueta.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroEtiquetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroEtiquetaPageRoutingModule {}
