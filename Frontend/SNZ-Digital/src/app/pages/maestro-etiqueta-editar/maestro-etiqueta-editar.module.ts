import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroEtiquetaEditarPageRoutingModule } from './maestro-etiqueta-editar-routing.module';

import { MaestroEtiquetaEditarPage } from './maestro-etiqueta-editar.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroEtiquetaEditarPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroEtiquetaEditarPage]
})
export class MaestroEtiquetaEditarPageModule {}
