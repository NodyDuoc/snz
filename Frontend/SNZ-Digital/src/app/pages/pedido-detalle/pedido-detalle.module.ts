import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoDetallePageRoutingModule } from './pedido-detalle-routing.module';

import { PedidoDetallePage } from './pedido-detalle.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoDetallePageRoutingModule,
    SharedModule
  ],
  declarations: [PedidoDetallePage]
})
export class PedidoDetallePageModule {}
