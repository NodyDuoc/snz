import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTrabajadorPage } from './menu-trabajador.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTrabajadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTrabajadorPageRoutingModule {}
