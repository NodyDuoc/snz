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
    path:'login',
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
    path:'catalogo',
    component:CatalogoComponent
  },{
    path:'categoria',
    component:CategoriaComponent
  },{
    path:'editar-clave',
    component:EditarClaveComponent
  },{
    path:'perfil',
    component:PerfilComponent
  },{
    path:'producto',
    component:ProductoComponent
  },{
    path:'direccion',
    component:DireccionComponent
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
