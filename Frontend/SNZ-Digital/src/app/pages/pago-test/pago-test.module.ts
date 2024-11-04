import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoTestPageRoutingModule } from './pago-test-routing.module';

import { PagoTestPage } from './pago-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoTestPageRoutingModule
  ],
  declarations: [PagoTestPage]
})
export class PagoTestPageModule {}
