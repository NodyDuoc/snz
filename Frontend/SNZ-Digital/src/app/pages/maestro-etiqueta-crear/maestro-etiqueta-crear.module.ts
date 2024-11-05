import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroEtiquetaCrearPageRoutingModule } from './maestro-etiqueta-crear-routing.module';

import { MaestroEtiquetaCrearPage } from './maestro-etiqueta-crear.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroEtiquetaCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroEtiquetaCrearPage]
})
export class MaestroEtiquetaCrearPageModule {}
