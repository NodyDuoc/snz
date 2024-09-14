import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../Componet/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Componet/login/login.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent,EditarUsuarioComponent],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule
    FormsModule, // Importa FormsModule
    ReactiveFormsModule // Importa ReactiveFormsModule
  ],
  exports: [RegistroComponent, LoginComponent,EditarUsuarioComponent]  // Exportar si deseas usarlo fuera de este módulo
})
export class RegistroModule { }
