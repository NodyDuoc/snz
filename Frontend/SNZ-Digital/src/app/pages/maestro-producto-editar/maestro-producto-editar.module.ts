import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroProductoEditarPageRoutingModule } from './maestro-producto-editar-routing.module';

import { MaestroProductoEditarPage } from './maestro-producto-editar.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroProductoEditarPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroProductoEditarPage]
})
export class MaestroProductoEditarPageModule {}
