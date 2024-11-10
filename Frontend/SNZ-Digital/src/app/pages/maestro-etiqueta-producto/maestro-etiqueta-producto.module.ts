import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroEtiquetaProductoPageRoutingModule } from './maestro-etiqueta-producto-routing.module';

import { MaestroEtiquetaProductoPage } from './maestro-etiqueta-producto.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroEtiquetaProductoPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroEtiquetaProductoPage]
})
export class MaestroEtiquetaProductoPageModule {}
