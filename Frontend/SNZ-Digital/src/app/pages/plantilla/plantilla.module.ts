import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantillaPageRoutingModule } from './plantilla-routing.module';

import { PlantillaPage } from './plantilla.page';



import { SharedModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantillaPageRoutingModule
    ,SharedModule
  ],
  declarations: [PlantillaPage]
})
export class PlantillaPageModule {}
