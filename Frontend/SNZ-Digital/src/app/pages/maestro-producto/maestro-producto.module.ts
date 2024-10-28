import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroProductoPageRoutingModule } from './maestro-producto-routing.module';

import { MaestroProductoPage } from './maestro-producto.page';

import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroProductoPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroProductoPage]
})
export class MaestroProductoPageModule {}
