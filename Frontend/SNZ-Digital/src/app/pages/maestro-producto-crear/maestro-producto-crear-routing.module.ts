import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroProductoCrearPage } from './maestro-producto-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroProductoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroProductoCrearPageRoutingModule {}
