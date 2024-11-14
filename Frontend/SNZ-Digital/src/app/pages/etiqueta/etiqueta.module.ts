import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaPageRoutingModule } from './etiqueta-routing.module';

import { EtiquetaPage } from './etiqueta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetaPageRoutingModule
  ],
  declarations: [EtiquetaPage]
})
export class EtiquetaPageModule {}
