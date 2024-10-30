import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritotestingPage } from './carritotesting.page';

const routes: Routes = [
  {
    path: '',
    component: CarritotestingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarritotestingPageRoutingModule {}
