import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CarruselComponent } from 'src/app/components/carrusel/carrusel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule
  ],
  declarations: [IndexPage,HeaderComponent,FooterComponent,CarruselComponent]
})
export class IndexPageModule {}
