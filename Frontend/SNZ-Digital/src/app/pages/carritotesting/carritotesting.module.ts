import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritotestingPageRoutingModule } from './carritotesting-routing.module';

import { CarritotestingPage } from './carritotesting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritotestingPageRoutingModule
  ],
  declarations: [CarritotestingPage]
})
export class CarritotestingPageModule {}
