import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroDespachoPageRoutingModule } from './maestro-despacho-routing.module';

import { MaestroDespachoPage } from './maestro-despacho.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroDespachoPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroDespachoPage]
})
export class MaestroDespachoPageModule {}
