import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoTestPage } from './pago-test.page';

const routes: Routes = [
  {
    path: '',
    component: PagoTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoTestPageRoutingModule {}
