import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroCategoriaCrearPage } from './maestro-categoria-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroCategoriaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroCategoriaCrearPageRoutingModule {}
