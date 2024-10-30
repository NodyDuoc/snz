import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetproductosidPage } from './getproductosid.page';

const routes: Routes = [
  {
    path: '',
    component: GetproductosidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetproductosidPageRoutingModule {}
