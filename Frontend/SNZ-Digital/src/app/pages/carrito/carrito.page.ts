import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/Service/carrito.service';
import { ProductoService } from 'src/app/Service/ProductoService.service'; 
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { AuthService } from 'src/app/Service/auth.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { PaykuService } from 'src/app/Service/PaykuService.service';
import { PagoRequest } from 'src/models/PagoRequest';

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
    private toastController: ToastController,
    private paykuService: PaykuService // Inyección del servicio de pago
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  // Método para iniciar el proceso de pago
  realizarPago() {  
    if (!this.carrito || this.detalles.length === 0) {  
        this.presentToast('El carrito está vacío. No hay nada para pagar.');  
        return;  
    }  

    const totalCarrito = this.calcularTotal();  
    
    const pagoRequest: PagoRequest = new PagoRequest(
        totalCarrito.toString(),
        'CLP',
        'Pago de carrito',
        this.user?.email || 'usuario@ejemplo.com',  // Email del usuario o predeterminado
        '12345', // Número de orden o identificador único
        'Compra de productos' // Asunto de la transacción
    );

    // Llamada al servicio de pago para generar el enlace de pago  
    this.paykuService.createTransaction(pagoRequest).subscribe({
        next: (response: any) => { // Cambiado a `response` para acceder a las propiedades del objeto recibido
            console.log("URL de pago recibida:", response); // Verifica el objeto completo aquí
            if (response && response.url) {
                window.open(response.url, '_blank'); // Abre la URL en una nueva ventana
            } else {
                this.presentToast('Error al generar el enlace de pago.');
            }
        },
        error: (error) => {
            console.error('Error en el proceso de pago:', error);
            this.presentToast('Ocurrió un problema al iniciar el pago. Por favor, intenta nuevamente.');
        }
    });
}



  // Método auxiliar para mostrar un mensaje de notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          this.cargarDetallesCarrito(user.id); 
        },
        (error) => {
          this.errorMessage = 'Debes iniciar sesión para ver el carrito.';
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver el carrito.';
    }
  }


  cargarDetallesCarrito(usuarioId: number) {
    this.carritoService.getAllDetallesCarrito().subscribe(
      (detalles) => {
        this.detalles = detalles.filter(d => d.usuarioIdUser === usuarioId);
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
          return {
            ...detalle,
            productName: data.data.productName,
            imagen: data.data.imagen
          };
        }),
        catchError(error => {
          return of(detalle);
        })
      );
    });

    forkJoin(requests).subscribe(updatedDetalles => {
      this.detalles = updatedDetalles; 
    });
  }

  calcularTotal() {
    return this.detalles.reduce((total, detalle) => total + detalle.costoTotal, 0);
  }
}
