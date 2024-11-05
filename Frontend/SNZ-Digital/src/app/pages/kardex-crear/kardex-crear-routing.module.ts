import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KardexCrearPage } from './kardex-crear.page';

const routes: Routes = [
  {
    path: '',
    component: KardexCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KardexCrearPageRoutingModule {}
