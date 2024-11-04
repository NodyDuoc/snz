import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroProductoEditarPage } from './maestro-producto-editar.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroProductoEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroProductoEditarPageRoutingModule {}
