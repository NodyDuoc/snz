import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../Componet/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Componet/login/login.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent,EditarUsuarioComponent,InicioComponent],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule
    FormsModule, // Importa FormsModule
    ReactiveFormsModule // Importa ReactiveFormsModule
  ],
  exports: [RegistroComponent, LoginComponent,EditarUsuarioComponent,InicioComponent]  // Exportar si deseas usarlo fuera de este módulo
})
export class RegistroModule { }
