import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KardexCrearPageRoutingModule } from './kardex-crear-routing.module';

import { KardexCrearPage } from './kardex-crear.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KardexCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [KardexCrearPage]
})
export class KardexCrearPageModule {}
