import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './Componet/registro/registro.component';
import { LoginComponent } from './Componet/login/login.component';
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
    path:'editar-usuario',
    component:EditarUsuarioComponent
  },
  {
    path: '',
    redirectTo: 'home',
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