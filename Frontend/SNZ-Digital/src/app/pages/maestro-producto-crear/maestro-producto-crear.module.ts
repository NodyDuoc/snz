import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroProductoCrearPageRoutingModule } from './maestro-producto-crear-routing.module';

import { MaestroProductoCrearPage } from './maestro-producto-crear.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroProductoCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroProductoCrearPage]
})
export class MaestroProductoCrearPageModule {}
