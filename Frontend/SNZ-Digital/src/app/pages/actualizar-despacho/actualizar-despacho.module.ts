import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarDespachoPageRoutingModule } from './actualizar-despacho-routing.module';

import { ActualizarDespachoPage } from './actualizar-despacho.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarDespachoPageRoutingModule,
    SharedModule
  ],
  declarations: [ActualizarDespachoPage]
})
export class ActualizarDespachoPageModule {}
