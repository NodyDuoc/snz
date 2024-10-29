import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroCategoriaPage } from './maestro-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroCategoriaPageRoutingModule {}
