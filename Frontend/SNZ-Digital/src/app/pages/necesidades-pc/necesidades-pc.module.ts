import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NecesidadesPcPageRoutingModule } from './necesidades-pc-routing.module';

import { NecesidadesPcPage } from './necesidades-pc.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NecesidadesPcPageRoutingModule,
    SharedModule
  ],
  declarations: [NecesidadesPcPage]
})
export class NecesidadesPcPageModule {}
