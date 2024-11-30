import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuiasPageRoutingModule } from './guias-routing.module';

import { GuiasPage } from './guias.page';
import { SharedModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuiasPageRoutingModule,
    SharedModule
  ],
  declarations: [GuiasPage]
})
export class GuiasPageModule {}
