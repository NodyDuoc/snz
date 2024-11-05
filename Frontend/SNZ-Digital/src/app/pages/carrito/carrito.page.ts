import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/Service/carrito.service';
import { ProductoService } from 'src/app/Service/ProductoService.service'; 
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { AuthService } from 'src/app/Service/auth.service';
import { Producto } from 'src/models/producto'; 
import { catchError, forkJoin, map, of } from 'rxjs';

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
    private productoService: ProductoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    console.log('Email del token:', email); // Log del email obtenido
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user);
          this.cargarCarrito(); 
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
        console.log('Carritos obtenidos:', carritos); // Log de carritos obtenidos
        this.carrito = carritos.find(c => c.usuarioIdUser === this.user.id);
        console.log('Carrito encontrado:', this.carrito); // Log del carrito encontrado

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
        console.log('Detalles del carrito obtenidos:', detalles); // Log de detalles obtenidos
        this.detalles = detalles.filter(d => d.idCarrito === carritoId);
        console.log('Detalles filtrados para el carrito:', this.detalles); // Log de detalles filtrados

        // Aquí llamas a cargar los nombres de los productos
        this.cargarNombresProductos();
      },
      (error) => {
        console.error('Error al obtener los detalles del carrito:', error);
      }
    );
  }

  cargarNombresProductos() {
    const requests = this.detalles.map(detalle => {
      return this.productoService.getProductoById(detalle.productId).pipe(
        map(data => {
          console.log('Producto obtenido:', data); // Log del producto obtenido
          return {
            ...detalle,
            productName: data.data.productName, // Asegúrate de acceder a productName correctamente
            imagen: data.data.imagen  // Asigna la imagen del producto aquí
          };
        }),
        catchError(error => {
          console.error('Error al cargar el producto', error);
          return of(detalle); // Devuelve el detalle original en caso de error
        })
      );
    });

    // Ejecuta todas las solicitudes en paralelo
    forkJoin(requests).subscribe(updatedDetalles => {
      console.log('Detalles actualizados con nombres de productos:', updatedDetalles);
      this.detalles = updatedDetalles; 
      console.log('Detalles finales:', this.detalles); // Log para verificar los detalles finales
    });
  }

  // Método para calcular el total del carrito
  calcularTotal() {
    return this.detalles.reduce((total, detalle) => total + detalle.costoTotal, 0);
  }
}
