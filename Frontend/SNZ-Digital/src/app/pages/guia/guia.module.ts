import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiaPageRoutingModule } from './guia-routing.module';

import { GuiaPage } from './guia.page';
import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiaPageRoutingModule,
    SharedModule
  ],
  declarations: [GuiaPage]
})
export class GuiaPageModule {}
