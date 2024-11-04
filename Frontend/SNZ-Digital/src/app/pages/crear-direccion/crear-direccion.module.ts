import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearDireccionPageRoutingModule } from './crear-direccion-routing.module';

import { CrearDireccionPage } from './crear-direccion.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDireccionPageRoutingModule,
    SharedModule
  ],
  declarations: [CrearDireccionPage]
})
export class CrearDireccionPageModule {}
