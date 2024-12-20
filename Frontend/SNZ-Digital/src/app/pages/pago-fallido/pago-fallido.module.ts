import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoFallidoPageRoutingModule } from './pago-fallido-routing.module';

import { PagoFallidoPage } from './pago-fallido.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoFallidoPageRoutingModule,
    SharedModule
  ],
  declarations: [PagoFallidoPage]
})
export class PagoFallidoPageModule {}
