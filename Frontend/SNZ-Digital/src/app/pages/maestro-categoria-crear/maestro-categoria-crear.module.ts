import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroCategoriaCrearPageRoutingModule } from './maestro-categoria-crear-routing.module';

import { MaestroCategoriaCrearPage } from './maestro-categoria-crear.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroCategoriaCrearPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroCategoriaCrearPage]
})
export class MaestroCategoriaCrearPageModule {}
