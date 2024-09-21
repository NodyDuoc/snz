import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../Componet/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Componet/login/login.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditarClaveComponent } from './editar-clave/editar-clave.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './producto/producto.component';
import { DireccionComponent } from './direccion/direccion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Para soportar componentes no conocidos
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [RegistroComponent, LoginComponent,EditarUsuarioComponent,InicioComponent,CatalogoComponent,CategoriaComponent,EditarClaveComponent,PerfilComponent,ProductoComponent,DireccionComponent],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule
    FormsModule, // Importa FormsModule
    AppRoutingModule,
    ReactiveFormsModule // Importa ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RegistroComponent, LoginComponent,EditarUsuarioComponent,InicioComponent,CatalogoComponent,CategoriaComponent,EditarClaveComponent,PerfilComponent,ProductoComponent,DireccionComponent]  // Exportar si deseas usarlo fuera de este módulo
})
export class RegistroModule { }
