import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Para soportar componentes no conocidos

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroModule } from './Componet/registro.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { AuthInterceptorService } from 'src/interceptors/auth-interceptor.service';
import { DireccionDetalleComponent } from './components/direccion-detalle/direccion-detalle.component';
import { EtiquetaDetalleComponent } from './components/etiqueta-detalle/etiqueta-detalle.component';
register();

@NgModule({
  declarations: [
    AppComponent, // Mantén el componente principal
    DireccionDetalleComponent,
    EtiquetaDetalleComponent 
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    RegistroModule, // Asegúrate de que este módulo contenga el EditarUsuarioComponent
    HttpClientModule, // Para habilitar HttpClient
    FormsModule, // Para habilitar formularios reactivos
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } // Registro del interceptor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para componentes personalizados
  bootstrap: [AppComponent], // Componente raíz de la aplicación
})
export class AppModule {}
