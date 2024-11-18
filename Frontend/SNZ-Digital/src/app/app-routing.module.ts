import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { validarSesionRolGuard } from './Guard/validar-sesion-rol.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
    path: 'editar-perfil/:id',
    loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'direccion/:id',
    loadChildren: () => import('./pages/direccion/direccion.module').then( m => m.DireccionPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'pedido/:id',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'producto/:id',
    loadChildren: () => import('./pages/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'preguntas-frecuentes',
    loadChildren: () => import('./pages/preguntas-frecuentes/preguntas-frecuentes.module').then( m => m.PreguntasFrecuentesPageModule)
  },
  {  
    path: 'menu-trabajador',  
    loadChildren: () => import('./pages/menu-trabajador/menu-trabajador.module').then(m => m.MenuTrabajadorPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR'] }
  },  
  {  
    path: 'maestro-producto',  
    loadChildren: () => import('./pages/maestro-producto/maestro-producto.module').then(m => m.MaestroProductoPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },  
  {
    path: 'maestro-etiqueta',
    loadChildren: () => import('./pages/maestro-etiqueta/maestro-etiqueta.module').then( m => m.MaestroEtiquetaPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'kardex',
    loadChildren: () => import('./pages/kardex/kardex.module').then( m => m.KardexPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'actualizar-despacho',
    loadChildren: () => import('./pages/actualizar-despacho/actualizar-despacho.module').then( m => m.ActualizarDespachoPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'busqueda/:detalle',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'getproductosid',
    loadChildren: () => import('./pages/getproductosid/getproductosid.module').then( m => m.GetproductosidPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'maestro-categoria',
    loadChildren: () => import('./pages/maestro-categoria/maestro-categoria.module').then( m => m.MaestroCategoriaPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-categoria-editar/:id',
    loadChildren: () => import('./pages/maestro-categoria-editar/maestro-categoria-editar.module').then( m => m.MaestroCategoriaEditarPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-producto-editar/:id',
    loadChildren: () => import('./pages/maestro-producto-editar/maestro-producto-editar.module').then( m => m.MaestroProductoEditarPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-etiqueta-editar',
    loadChildren: () => import('./pages/maestro-etiqueta-editar/maestro-etiqueta-editar.module').then( m => m.MaestroEtiquetaEditarPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'info-producto/:id',
    loadChildren: () => import('./pages/info-producto/info-producto.module').then( m => m.InfoProductoPageModule)
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
  },
  {
    path: 'pago-test',
    loadChildren: () => import('./pages/pago-test/pago-test.module').then( m => m.PagoTestPageModule)
  },
  {
    path: 'kardex-editar',
    loadChildren: () => import('./pages/kardex-editar/kardex-editar.module').then( m => m.KardexEditarPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'crear-direccion',
    loadChildren: () => import('./pages/crear-direccion/crear-direccion.module').then( m => m.CrearDireccionPageModule)
  },
  {
    path: 'kardex-crear',
    loadChildren: () => import('./pages/kardex-crear/kardex-crear.module').then( m => m.KardexCrearPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-etiqueta-crear',
    loadChildren: () => import('./pages/maestro-etiqueta-crear/maestro-etiqueta-crear.module').then( m => m.MaestroEtiquetaCrearPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-producto-crear/:categoryId',
    loadChildren: () => import('./pages/maestro-producto-crear/maestro-producto-crear.module').then(m => m.MaestroProductoCrearPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'maestro-despacho',
    loadChildren: () => import('./pages/maestro-despacho/maestro-despacho.module').then( m => m.MaestroDespachoPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'necesidades-pc',
    loadChildren: () => import('./pages/necesidades-pc/necesidades-pc.module').then( m => m.NecesidadesPcPageModule)
  },
  {
    path: 'maestro-producto-editar/:categoryId/:productId',
    loadChildren: () => import('./pages/maestro-producto-editar/maestro-producto-editar.module').then(m => m.MaestroProductoEditarPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'pago-exitoso',
    loadChildren: () => import('./pages/pago-exitoso/pago-exitoso.module').then( m => m.PagoExitosoPageModule)
  },
  {
    path: 'pago-fallido',
    loadChildren: () => import('./pages/pago-fallido/pago-fallido.module').then( m => m.PagoFallidoPageModule)
  },
  {
    path: 'maestro-etiqueta-producto/:Id',
    loadChildren: () => import('./pages/maestro-etiqueta-producto/maestro-etiqueta-producto.module').then( m => m.MaestroEtiquetaProductoPageModule),
    canActivate: [validarSesionRolGuard],
    data: { roles: ['ROLE_ADMINISTRADOR']}  
  },
  {
    path: 'etiqueta/:Id',
    loadChildren: () => import('./pages/etiqueta/etiqueta.module').then( m => m.EtiquetaPageModule)
  },
  {
    path: 'pedido-detalle/:pedidoId',
    loadChildren: () => import('./pages/pedido-detalle/pedido-detalle.module').then( m => m.PedidoDetallePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
