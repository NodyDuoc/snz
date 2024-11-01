import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/Service/carrito.service';
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Carrito | undefined;
  detalles: DetalleCarrito[] = [];
  errorMessage: string = '';
  user: any = null;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private userService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user);
          this.cargarCarrito(); // Cargar el carrito solo si hay un usuario
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          this.errorMessage = 'Debes iniciar sesión para ver el carrito.';
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver el carrito.';
    }
  }

  cargarCarrito() {
    if (!this.user) {
      this.carrito = undefined;
      this.detalles = [];
      this.errorMessage = 'Debes iniciar sesión para ver el carrito.';
      return;
    }

    this.carritoService.getAllCarritos().subscribe(
      (carritos) => {
        this.carrito = carritos.find(c => c.usuarioIdUser === this.user.id);

        if (this.carrito) {
          this.cargarDetallesCarrito(this.carrito.idCarrito);
        } else {
          this.errorMessage = 'No hay un carrito disponible para este usuario.';
        }
      },
      (error) => {
        console.error('Error al obtener los carritos:', error);
        this.errorMessage = 'Hubo un problema al cargar el carrito. Por favor, intenta más tarde.';
      }
    );
  }

  cargarDetallesCarrito(carritoId: number) {
    this.carritoService.getAllDetallesCarrito().subscribe(
      (detalles) => {
        this.detalles = detalles.filter(d => d.idCarrito === carritoId);
      },
      (error) => {
        console.error('Error al obtener los detalles del carrito:', error);
      }
    );
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
