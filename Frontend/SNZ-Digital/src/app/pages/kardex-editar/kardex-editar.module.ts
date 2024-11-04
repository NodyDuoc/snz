import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KardexEditarPageRoutingModule } from './kardex-editar-routing.module';

import { KardexEditarPage } from './kardex-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KardexEditarPageRoutingModule
  ],
  declarations: [KardexEditarPage]
})
export class KardexEditarPageModule {}
