import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoExitosoPageRoutingModule } from './pago-exitoso-routing.module';

import { PagoExitosoPage } from './pago-exitoso.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoExitosoPageRoutingModule,
    SharedModule
  ],
  declarations: [PagoExitosoPage]
})
export class PagoExitosoPageModule {}
