import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroCategoriaEditarPageRoutingModule } from './maestro-categoria-editar-routing.module';

import { MaestroCategoriaEditarPage } from './maestro-categoria-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroCategoriaEditarPageRoutingModule
  ],
  declarations: [MaestroCategoriaEditarPage]
})
export class MaestroCategoriaEditarPageModule {}
