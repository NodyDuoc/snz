import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroGuiaPage } from './maestro-guia.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroGuiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroGuiaPageRoutingModule {}
