import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroEtiquetaPageRoutingModule } from './maestro-etiqueta-routing.module';

import { MaestroEtiquetaPage } from './maestro-etiqueta.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroEtiquetaPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroEtiquetaPage]
})
export class MaestroEtiquetaPageModule {}
