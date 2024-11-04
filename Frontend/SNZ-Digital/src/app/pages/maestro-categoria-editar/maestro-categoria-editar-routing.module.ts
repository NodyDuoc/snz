import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroCategoriaEditarPage } from './maestro-categoria-editar.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroCategoriaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroCategoriaEditarPageRoutingModule {}
