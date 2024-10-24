import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Componet/registro/registro.component';
import { LoginComponent } from './Componet/login/login.component';
import { InicioComponent } from './Componet/inicio/inicio.component';
import { CatalogoComponent } from './Componet/catalogo/catalogo.component';
import { CategoriaComponent } from './Componet/categoria/categoria.component';
import { EditarClaveComponent } from './Componet/editar-clave/editar-clave.component';
import { PerfilComponent } from './Componet/perfil/perfil.component';
import { ProductoComponent } from './Componet/producto/producto.component';
import { DireccionComponent } from './Componet/direccion/direccion.component';
import { EditarUsuarioComponent } from './Componet/editar-usuario/editar-usuario.component';
import { CarritoComponent } from './Componet/carrito/carrito.component';
import { PedidosComponent } from './Componet/pedidos/pedidos.component';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path:'registro-usuario',
    component:RegistroComponent
  },
  {
    path:'login-np',
    component:LoginComponent
  },
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path:'editar-usuario',
    component:EditarUsuarioComponent
  },
  {
    path:'catalogo-no',
    component:CatalogoComponent
  },{
    path:'categoria-no',
    component:CategoriaComponent
  },{
    path:'editar-clave',
    component:EditarClaveComponent
  },{
    path:'perfil-no',
    component:PerfilComponent
  },{
    path:'producto-no',
    component:ProductoComponent
  },{
    path:'direccion-no',
    component:DireccionComponent
  },{
    path:'carrito-no',
    component:CarritoComponent
  },{
    path:'pedido-no',
    component:PedidosComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'plantilla',
    loadChildren: () => import('./pages/plantilla/plantilla.module').then( m => m.PlantillaPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
