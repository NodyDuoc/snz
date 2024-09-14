import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../Componet/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Componet/login/login.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule
    FormsModule, // Importa FormsModule
    ReactiveFormsModule // Importa ReactiveFormsModule
  ],
  exports: [RegistroComponent, LoginComponent]  // Exportar si deseas usarlo fuera de este módulo
})
export class RegistroModule { }
