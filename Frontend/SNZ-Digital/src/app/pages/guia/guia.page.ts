import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ValoracionService } from 'src/app/Service/valoracion.service';
import { Valoracion } from 'src/models/valoracion';
import { Etiqueta } from 'src/models/etiqueta';
import { Guia } from 'src/models/guia';
import { GuideService } from 'src/app/Service/guia.service';
import { ToastController } from '@ionic/angular';
import { EtiquetaProductoService } from 'src/app/Service/EtiquetaProductoService.service';
import { CarritoService } from 'src/app/Service/carrito.service';
import { DetalleCarrito } from 'src/models/detalleCarrito';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {
  idGuia: number | undefined;
  guia: any;
  cantidadSeleccionada: number = 1;
  precioTotal: number = 0;
  isLoggedIn: boolean = false;
  valoracion: number | undefined;
  comentario: string = '';
  userId: number | null = null;
  imagePreview: string | ArrayBuffer | null = 'assets/img/default.jpg'; // Imagen por defecto
  etiquetas: Etiqueta[] = [];
  yaComento: boolean = false; // Nueva bandera para controlar si el usuario ya comentó
  // Diccionario para valoraciones, asegurándonos de que cada producto tiene su propio arreglo de valoraciones
  valoracionesPorProducto: { [key: number]: { resena: Valoracion, nombreUsuario: string }[] } = {};
  valoraciones: Valoracion[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private authService: AuthService,
    private valoracionService: ValoracionService,
    private toastController: ToastController,
    private etiquetaProductoService: EtiquetaProductoService, // Nuevo servicio
    private router: Router,
    private carritoService: CarritoService,
    private guideService: GuideService,
    

  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.loadUser();
    const id = this.route.snapshot.paramMap.get('Id');
    if (id) {
      this.idGuia = +id;
      this.cargarGuia(this.idGuia);
     
    }
  }


  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  loadUser() {

    const email = this.authService.getEmailFromToken();
    if (email) {
      this.authService.searchByEmail(email).subscribe(
        (user) => {
          this.userId = user.id;

        },
        (error) => {
          console.error('Error fetching user:', error);


        }
      );
    } else {

    }
  }


  

  cargarGuia(id: number) {
    this.guideService.getGuideById(id).subscribe(
      (data) => {
        this.guia = data;
        // Verificar que el producto tenga un status y es un número
      },
      (error) => {
        console.error('Error al cargar guia', error);
        this.presentToast('Error al cargar guia.', 'danger');
      }
    );
  }
  



  
  
  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  getColorForUser(nombreUsuario: string): string {
    const colors = [
      '#FF5733', // Naranja
      '#33FF57', // Verde
      '#3357FF', // Azul
      '#FF33A1', // Rosa
      '#FF8C33', // Amarillo
      '#33FFF5', // Turquesa
      '#A833FF'  // Morado
    ]; // Paleta de colores
    const hash = Array.from(nombreUsuario).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }
  
  
}
