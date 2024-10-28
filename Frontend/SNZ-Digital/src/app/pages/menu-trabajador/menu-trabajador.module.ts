import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTrabajadorPageRoutingModule } from './menu-trabajador-routing.module';

import { MenuTrabajadorPage } from './menu-trabajador.page';

import { SharedModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTrabajadorPageRoutingModule,
    SharedModule
  ],
  declarations: [MenuTrabajadorPage]
})
export class MenuTrabajadorPageModule {}
