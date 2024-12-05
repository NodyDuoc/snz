import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroGuiaPageRoutingModule } from './maestro-guia-routing.module';

import { MaestroGuiaPage } from './maestro-guia.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroGuiaPageRoutingModule,
    SharedModule
  ],
  declarations: [MaestroGuiaPage]
})
export class MaestroGuiaPageModule {}
