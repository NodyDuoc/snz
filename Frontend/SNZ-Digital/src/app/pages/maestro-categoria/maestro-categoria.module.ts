import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroCategoriaPageRoutingModule } from './maestro-categoria-routing.module';

import { MaestroCategoriaPage } from './maestro-categoria.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroCategoriaPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroCategoriaPage]
})
export class MaestroCategoriaPageModule {}
