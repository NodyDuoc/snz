import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NecesidadesPcPage } from './necesidades-pc.page';

const routes: Routes = [
  {
    path: '',
    component: NecesidadesPcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NecesidadesPcPageRoutingModule {}
