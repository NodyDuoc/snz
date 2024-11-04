import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroProductoEditarPageRoutingModule } from './maestro-producto-editar-routing.module';

import { MaestroProductoEditarPage } from './maestro-producto-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroProductoEditarPageRoutingModule
  ],
  declarations: [MaestroProductoEditarPage]
})
export class MaestroProductoEditarPageModule {}
