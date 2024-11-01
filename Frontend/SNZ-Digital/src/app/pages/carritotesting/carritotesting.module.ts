import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritotestingPageRoutingModule } from './carritotesting-routing.module';

import { CarritotestingPage } from './carritotesting.page';
import { SharedModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritotestingPageRoutingModule,
    SharedModule
  ],
  declarations: [CarritotestingPage]
})
export class CarritotestingPageModule {}
