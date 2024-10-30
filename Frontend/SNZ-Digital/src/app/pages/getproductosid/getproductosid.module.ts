import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetproductosidPageRoutingModule } from './getproductosid-routing.module';

import { GetproductosidPage } from './getproductosid.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetproductosidPageRoutingModule,
    SharedModule
  ],
  declarations: [GetproductosidPage]
})
export class GetproductosidPageModule {}
