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
import { DireccionService } from 'src/app/Service/DireccionService.service';
import { Direccion } from 'src/models/direccion';
import { PedidoService } from 'src/app/Service/pedido.service';
import { Pedido } from 'src/models/pedido';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Carrito | undefined;
  detalles: DetalleCarrito[] = [];
  direcciones: Direccion[] = []; // Almacena las direcciones del usuario
  selectedDireccion?: Direccion; // Dirección seleccionada
  errorMessage: string = '';
  user: any = null;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private userService: AuthService,
    private productoService: ProductoService,
    private toastController: ToastController,
    private paykuService: PaykuService,
    private direccionService: DireccionService, // Servicio de direcciones
    private pedidoService: PedidoService // Inyecta el servicio de pedidos


  ) {}


  ngOnInit() {
    this.loadUser();
    this.cargarDirecciones();
  }

    // Cargar direcciones del usuario logueado
    cargarDirecciones() {
      this.direccionService.getAllDirecciones().subscribe(
        (data: Direccion[]) => {
          this.direcciones = data.filter(d => d.usuarioIdUser === this.user.id); // Filtrar direcciones por usuario
        },
        error => {
          console.error('Error al cargar direcciones:', error);
        }
      );
    }

    // Genera un ID único para cada pedido
    private generateUniqueOrderId(): string {
      const timestamp = Date.now().toString().slice(-10); // Recorta a 10 dígitos
      return `${timestamp}`; // Ejemplo: "order_1234567890"
  }

  // Método para iniciar el proceso de pago 
  async realizarPago() {
    const totalCarrito = this.calcularTotal();
    const orderValue = this.generateUniqueOrderId();

    if (!this.selectedDireccion) {
      await this.presentToast('Por favor, selecciona una dirección.');
      return;
    }

    const pagoRequest: PagoRequest = {
      amount: totalCarrito.toString(),
      currency: 'CLP',
      subject: 'Compra en tienda',
      email: this.user?.email || 'usuario@ejemplo.com',
      order: orderValue,
      urlreturn: 'http://localhost:8100/pago-exitoso?token={TOKEN}',
      urlnotify: 'http://localhost:8084/api/payku/notificar',
      direccion: this.selectedDireccion.direccion || 'No especificada',
    };

    this.paykuService.createTransaction(pagoRequest).subscribe({
      next: async (response) => {
        if (response && response.url) {
          window.open(response.url, '_blank');
          await this.presentToast('Redirigiendo al pago...');
          
          // Llama al método para crear el pedido en el backend
          this.crearPedido(orderValue, totalCarrito, 'Pendiente');
        } else {
          await this.presentToast('Error al generar el enlace de pago.');
        }
      },
      error: async (error) => {
        console.error('Error en el proceso de pago:', error);
        await this.presentToast('Ocurrió un error en el proceso de pago.');
      }
    });
  }


// Método para crear un pedido en el backend
crearPedido(orderId: string, amount: number, estado: string) {
  const pedido: Pedido = {
    pedidoId: 0, // El backend lo asignará
    usuariosUserId: this.user.id,
    productoProductId: this.detalles.map(d => d.productId), // Siempre será un array
    comuna: this.selectedDireccion?.comuna || '',
    direccion: this.selectedDireccion?.direccion || '',
    detalle: 'Detalles adicionales del pedido',
    precio: amount,
    cantidad: this.detalles.reduce((total, d) => total + d.cantidad, 0),
    estado: estado,
    orderId: orderId,
    currency: 'CLP', 
    urlReturn: 'http://localhost:8100/pago-exitoso?token={TOKEN}',
    urlNotify: 'http://localhost:8084/api/payku/notificar',
  };
  
  console.log('Datos de pedido a enviar al backend:', pedido); // Verificar datos de pedido

  this.pedidoService.createPedido(pedido).subscribe({
    next: (nuevoPedido: Pedido) => {
      console.log('Pedido creado en el backend:', nuevoPedido);
      this.presentToast('Pedido creado con éxito.');
    },
    error: (error: any) => {
      console.error('Error al crear el pedido:', error);
      this.presentToast('Hubo un problema al crear el pedido.');
    }
  });
}




  // Método para seleccionar dirección
  seleccionarDireccion(direccion: Direccion) {
    this.selectedDireccion = direccion;
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
          console.log("Usuario cargado:", this.user);
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
        console.log("Detalles del carrito cargados:", this.detalles);
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
      console.log("Detalles del carrito con nombres de productos:", this.detalles);
    });
  }

  calcularTotal() {
    return this.detalles.reduce((total, detalle) => total + detalle.costoTotal, 0);
  }

  modificarCantidad(detalle: DetalleCarrito, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;
  
    detalle.cantidad = nuevaCantidad;
    detalle.costoTotal = detalle.costoUnitario * nuevaCantidad;
  
    this.carritoService.updateDetalleCarrito(detalle.idDetalleCarrito, {
      cantidad: nuevaCantidad,
      costoTotal: detalle.costoTotal,
      costoUnitario: detalle.costoUnitario,
      productId: detalle.productId,
      usuarioIdUser: detalle.usuarioIdUser
    }).subscribe({
      next: () => {
        this.presentToast('Cantidad actualizada');
        this.calcularTotal();
      },
      error: (error) => {
        console.error('Error al actualizar la cantidad:', error);
        this.presentToast('Hubo un problema al actualizar la cantidad');
      }
    });
  }
  
  
  eliminarProducto(detalle: DetalleCarrito) {
    this.carritoService.deleteDetalleCarrito(detalle.idDetalleCarrito).subscribe({
      next: () => {
        this.detalles = this.detalles.filter(d => d.idDetalleCarrito !== detalle.idDetalleCarrito);
        this.presentToast('Producto eliminado del carrito');
        this.calcularTotal();
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.presentToast('Hubo un problema al eliminar el producto');
      }
    });
  }


  async verificarEstadoPago(token: string) {
    this.paykuService.checkTransactionStatus(token).subscribe({
      next: async (status) => {
        if (status === 'approved') {
          await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
        } else {
          await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
          this.router.navigate(['/pago-fallido']);
        }
      },
      error: async () => {
        await this.presentToast('Error al verificar el estado de la transacción.');
        this.router.navigate(['/pago-fallido']);
      }
    });
  }
  
  
}
