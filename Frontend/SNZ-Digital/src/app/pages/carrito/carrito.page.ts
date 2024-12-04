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
import { EtiquetaProductoService } from 'src/app/Service/EtiquetaProductoService.service';
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
  detallePedido: string = ''; // Contiene el detalle del pedido ingresado por el usuario
  c12: number = 0;
  c13: number = 0;
  c15: number = 0;
  c16: number = 0;
  constructor(
    private carritoService: CarritoService,
    private etiquetaProductoService: EtiquetaProductoService,
    private router: Router,
    private userService: AuthService,
    private productoService: ProductoService,
    private toastController: ToastController,
    private paykuService: PaykuService,
    private direccionService: DireccionService, // Servicio de direcciones
    private pedidoService: PedidoService, // Inyecta el servicio de pedidos
    private authService: AuthService, 


  ) {}


  ngOnInit() {
    this.loadUser();
    this.cargarDirecciones();
    
    // Solo llama a verificarEstadoPago si transactionId tiene un valor
    if (this.transactionId) {
      this.verificarEstadoPago(this.transactionId);
    }
  }

    // Cargar direcciones del usuario logueado
    cargarDirecciones() {
      this.direccionService.getAllDirecciones().subscribe(
        (data: Direccion[]) => {
          this.direcciones = data.filter(d => d.usuarioIdUser === this.user.id); // Filtrar direcciones por usuario
          console.log('Direcciones:', this.direcciones); // Corrección en el console.log
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
  transactionId: string | null = null; // Define esta propiedad en la clase

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
        urlreturn: 'http://localhost:8100/pago-exitoso', // URL de éxito sin el transactionId
        urlnotify: 'http://localhost:8084/api/payku/response',
        direccion: this.selectedDireccion.direccion || 'No especificada',
    };


    // Guarda la información inicial del pedido en localStorage
    const pagoInfo = {
      usuarioId: this.user?.id,
      detalles: this.detalles,
      direccion: this.selectedDireccion,
      total: totalCarrito,
      orderId: orderValue,
      estado: 'Pendiente',
      detallePedido: this.detallePedido, // Incluye el detalle ingresado por el usuario
  };
  
  localStorage.setItem('pagoInfo', JSON.stringify(pagoInfo));
  

    // Realiza la solicitud de creación de transacción
    this.paykuService.createTransaction(pagoRequest).subscribe({
        next: async (response) => {
            if (response && response.url && response.id) {
                this.transactionId = response.id;

                // Guarda el transactionId en localStorage
                localStorage.setItem('transactionId', this.transactionId);
                localStorage.setItem('pagoInfo', JSON.stringify(pagoInfo));

                // Redirige al usuario a la URL de pago de Payku
                window.location.href = response.url;
                await this.presentToast('Redirigiendo al pago...');
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
          this.cargarDirecciones(); // Mueve esta línea aquí
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
    this.carritoService.getDetallesCarritoByUser(usuarioId).subscribe(
      (detalles) => {
        this.detalles = detalles;
        console.log("Detalles del carrito cargados:", this.detalles);
  
        // Cargar nombres de productos antes de verificar etiquetas
        this.cargarNombresProductos().then(() => {
          // Verificar las etiquetas para cada producto
          this.verificarEtiquetasPorProducto();
        });
      },
      (error) => {
        console.error('Error al obtener los detalles del carrito:', error);
      }
    );
  }
  
  incompatibles: string[] = [];

  verificarEtiquetasPorProducto() {
    const etiquetasBuscadas = [12, 13, 15, 16];
    this.incompatibles = []; // Reiniciar la lista de incompatibles
  
    const productosConEtiqueta: { [key: number]: { etiquetas: number[], nombre: string } } = {}; // Mapa para almacenar etiquetas y nombres por producto
  
    this.detalles.forEach(detalle => {
      this.etiquetaProductoService.getEtiquetaDetallesByProductId(detalle.productId).subscribe(
        (etiquetas) => {
          console.log(`Etiquetas para el producto ${detalle.productId}:`, etiquetas);
  
          // Guardar las etiquetas encontradas y el nombre del producto para este producto
          productosConEtiqueta[detalle.productId] = {
            etiquetas: etiquetas.map(e => e.etiquetaId),
            nombre: detalle.productName || 'Nombre desconocido' // Valor predeterminado
          };
          
  
          // Contar etiquetas globalmente
          etiquetas.forEach(etiqueta => {
            if (etiqueta.etiquetaId === 12) this.c12++;
            if (etiqueta.etiquetaId === 13) this.c13++;
            if (etiqueta.etiquetaId === 15) this.c15++;
            if (etiqueta.etiquetaId === 16) this.c16++;
          });
  
          // Verificar incompatibilidades después de procesar todos los productos
          this.detectarIncompatibilidades(productosConEtiqueta);
        },
        (error) => {
          console.error(`Error al obtener etiquetas para el producto ${detalle.productId}:`, error);
        }
      );
    });
  }
  

  detectarIncompatibilidades(productosConEtiqueta: { [key: number]: { etiquetas: number[], nombre: string } }) {
    const productosCon12 = Object.values(productosConEtiqueta).filter(producto =>
      producto.etiquetas.includes(12)
    ).map(producto => producto.nombre);
  
    const productosCon16 = Object.values(productosConEtiqueta).filter(producto =>
      producto.etiquetas.includes(16)
    ).map(producto => producto.nombre);
  
    const productosCon13 = Object.values(productosConEtiqueta).filter(producto =>
      producto.etiquetas.includes(13)
    ).map(producto => producto.nombre);
  
    const productosCon15 = Object.values(productosConEtiqueta).filter(producto =>
      producto.etiquetas.includes(15)
    ).map(producto => producto.nombre);
  
    // Detectar incompatibilidades entre productos
    if (productosCon12.length > 0 && productosCon16.length > 0) {
      this.incompatibles.push(
        `Hay productos incompatibles: ${productosCon12.join(', ')} y ${productosCon16.join(', ')}.`
      );
    }
  
    if (productosCon13.length > 0 && productosCon15.length > 0) {
      this.incompatibles.push(
        `Hay productos con etiquetas incompatibles: 13 (${productosCon13.join(', ')}) y 15 (${productosCon15.join(', ')}).`
      );
    }
  
    console.log('Incompatibles detectados:', this.incompatibles);
  }
  

  cargarNombresProductos(): Promise<void> {
    const requests = this.detalles.map(detalle => {
      return this.productoService.getProductoById(detalle.productId).pipe(
        map(data => {
          return {
            ...detalle,
            productName: data.data.productName || 'Nombre desconocido', // Valor predeterminado
            imagen: data.data.imagen
          };
        }),
        catchError(error => {
          console.warn(`Error al obtener el nombre del producto con ID ${detalle.productId}:`, error);
          return of(detalle); // Devuelve el detalle original si falla
        })
      );
    });
  
    return new Promise((resolve) => {
      forkJoin(requests).subscribe(updatedDetalles => {
        this.detalles = updatedDetalles;
        console.log("Detalles del carrito con nombres de productos:", this.detalles);
        resolve(); // Resuelve la promesa cuando se hayan cargado los nombres
      });
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

  async verificarEstadoPago(transactionId?: string) {
    if (!transactionId) {
        console.warn('Transaction ID is required for verification.');
        return;
    }
    
    this.paykuService.checkTransactionStatus(transactionId).subscribe({
        next: async (response) => {
            if (response.message === 'Transacción aprobada') {
                await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
                this.router.navigate(['/pago-exitoso']); // Redirige a la página de éxito
            } else {
                await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
                this.router.navigate(['/pago-fallido']);
            }
        },
        error: async (error) => {
            console.error('Error al verificar el estado de la transacción:', error);
            await this.presentToast('Error al verificar el estado de la transacción.');
            this.router.navigate(['/pago-fallido']);
        }
    });
}

irAlCatalogo() {
  this.router.navigate(['/catalogo']);
}


  
}
