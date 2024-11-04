import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearDireccionPage } from './crear-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearDireccionPageRoutingModule {}
