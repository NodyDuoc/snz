import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../Componet/registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Componet/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EditarClaveComponent } from './editar-clave/editar-clave.component';
import { EditarUsuarioComponent } from '../Componet/editar-usuario/editar-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './producto/producto.component';
import { DireccionComponent } from './direccion/direccion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Para soportar componentes no conocidos
import { AppRoutingModule } from '../app-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    EditarUsuarioComponent,
    InicioComponent,
    CatalogoComponent,
    CategoriaComponent,
    EditarClaveComponent,
    PerfilComponent,
    ProductoComponent,
    DireccionComponent,
    PedidosComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    IonicModule, // Importa IonicModule para Ionic
    FormsModule, // Importa FormsModule para formularios
    ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
    AppRoutingModule // Importa AppRoutingModule para el enrutamiento
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para permitir componentes no estándar
  exports: [
    RegistroComponent,
    LoginComponent,
    EditarUsuarioComponent,
    InicioComponent,
    CatalogoComponent,
    CategoriaComponent,
    EditarClaveComponent,
    PerfilComponent,
    ProductoComponent,
    DireccionComponent,
    PedidosComponent,
    CarritoComponent // Exportar todos los componentes necesarios
  ]
})
export class RegistroModule { }
