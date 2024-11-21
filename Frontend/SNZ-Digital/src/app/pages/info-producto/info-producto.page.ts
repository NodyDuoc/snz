import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ValoracionService } from 'src/app/Service/valoracion.service';
import { Valoracion } from 'src/models/valoracion';
import { Etiqueta } from 'src/models/etiqueta';
import { ToastController } from '@ionic/angular';
import { EtiquetaProductoService } from 'src/app/Service/EtiquetaProductoService.service';
import { CarritoService } from 'src/app/Service/carrito.service';
import { DetalleCarrito } from 'src/models/detalleCarrito';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.page.html',
  styleUrls: ['./info-producto.page.scss'],
})
export class InfoProductoPage implements OnInit {
  idProducto: number | undefined;
  producto: any;
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

  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.loadUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.cargarProducto(this.idProducto);
      this.cargarValoraciones(this.idProducto);
      this.cargarEtiquetasPorProducto(this.idProducto); // Cargar etiquetas
    }
  }

  irADetalleEtiqueta(etiquetaId: any) {
    this.router.navigate(['/etiqueta', etiquetaId]);
  }
  cargarEtiquetasPorProducto(productId: number) {
    this.etiquetaProductoService.getEtiquetaDetallesByProductId(productId).subscribe(
      (data) => {
        this.etiquetas = data;
      },
      (error) => {
        console.error('Error al cargar etiquetas del producto', error);
        this.presentToast('Error al cargar las etiquetas.', 'danger');
      }
    );
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

  actualizarPrecio() {
    if (this.producto && this.producto.precio) {
      this.precioTotal = this.producto.precio * this.cantidadSeleccionada;
    }
  }

  onDelete(valoracionId?: number): void {
    if (valoracionId === undefined) {
      console.error('El ID de la valoración es indefinido.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar esta valoración?')) {
      this.valoracionService.deleteValoracion(valoracionId).subscribe({
        next: () => {
          this.presentToast('Valoración eliminada exitosamente.');
          if (this.idProducto !== undefined) {
            // Limpiar las valoraciones actuales antes de recargar
            this.valoracionesPorProducto[this.idProducto] = [];
            this.cargarValoraciones(this.idProducto); // Recargar valoraciones desde el backend
          }
        },
        error: (err) => {
          console.error('Error al eliminar la valoración:', err);
          this.presentToast('Error al eliminar la valoración.', 'danger');
        },
      });
    }
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe(
      (data) => {
        this.producto = data.data;
        // Verificar que el producto tenga un status y es un número
        if (this.producto && this.producto.status !== undefined) {
          this.actualizarPrecio();
        } else {
          console.error('El producto no tiene un status definido.');
        }
      },
      (error) => {
        console.error('Error al cargar el producto', error);
        this.presentToast('Error al cargar el producto.', 'danger');
      }
    );
  }
  

  cargarValoraciones(productoId: number) {
    this.valoracionService.getValoracionesByProductoId(productoId).subscribe(
      async (valoraciones) => {
        this.valoracionesPorProducto[productoId] = [];
  
        const nuevasValoraciones = await Promise.all(
          valoraciones.map(async (valoracion) => {
            try {
              const usuario = await this.authService.getUserById(valoracion.usuariosUserId).toPromise();
              // Verificar si el usuario actual ya comentó
              if (this.userId === valoracion.usuariosUserId) {
                this.yaComento = true;
              }
              return {
                resena: valoracion,
                nombreUsuario: usuario?.firstName || 'Usuario desconocido',
              };
            } catch (userError) {
              console.error('Error al obtener usuario:', userError);
              return {
                resena: valoracion,
                nombreUsuario: 'Usuario desconocido',
              };
            }
          })
        );
  
        this.valoracionesPorProducto[productoId] = nuevasValoraciones;
  
        // Si no se encontraron valoraciones del usuario actual, permitir comentar
        if (valoraciones.every(v => v.usuariosUserId !== this.userId)) {
          this.yaComento = false;
        }
      },
      (error) => {
        console.error('Error al cargar valoraciones:', error);
        this.presentToast('Error al cargar las valoraciones.', 'danger');
      }
    );
  }

  enviarValoracion() {
    if (!this.valoracion || !this.comentario || !this.userId) {
      console.error('Faltan datos de la valoración o usuario no autenticado.');
      this.presentToast('Complete todos los campos para enviar su valoración.', 'danger');
      return;
    }
  
    // Verificar si el usuario ya ha comentado
    if (this.yaComento) {
      this.presentToast('Ya has enviado una valoración para este producto.', 'warning');
      return;
    }
  
    const valoracionData: Valoracion = {
      valPuntuacion: this.valoracion,
      valComentario: this.comentario,
      usuariosUserId: this.userId,
      productoProductId: this.idProducto || 0,
    };
  
    this.valoracionService.createValoracion(valoracionData).subscribe({
      next: (response: Valoracion) => {
        if (this.idProducto !== undefined) {
          if (!this.valoracionesPorProducto[this.idProducto]) {
            this.valoracionesPorProducto[this.idProducto] = [];
          }
          this.valoracionesPorProducto[this.idProducto] = [
            ...this.valoracionesPorProducto[this.idProducto],
            { resena: response, nombreUsuario: 'Tú' }
          ];
        }
        this.valoracion = undefined;
        this.comentario = '';
        this.yaComento = true; // Actualiza la bandera para impedir nuevos comentarios
        this.presentToast('Valoración enviada exitosamente.');
      },
      error: (error: any) => {
        console.error('Error al enviar valoración:', error);
        this.presentToast('Error al enviar la valoración.', 'danger');
      }
    });
  }

  tieneValoraciones(): boolean {
    return this.idProducto !== undefined && !!this.valoracionesPorProducto[this.idProducto]?.length;
  }

  agregarAlCarrito() {
    if (!this.producto || !this.producto.productId) {
      console.error('No se puede agregar al carrito: El productId es indefinido');
      this.mostrarToast('Este producto no tiene un ID válido y no se puede agregar al carrito.', 'warning');
      return;
    }
  
    if (!this.userId) {
      this.mostrarToast('Debes iniciar sesión para agregar productos al carrito.', 'warning');
      return;
    }
  
    const detalle: DetalleCarrito = {
      idDetalleCarrito: 0,
      cantidad: this.cantidadSeleccionada,
      costoUnitario: this.producto.precio ?? 0,
      costoTotal: (this.producto.precio ?? 0) * this.cantidadSeleccionada,
      productId: this.producto.productId,
      usuarioIdUser: this.userId,
    };
  
    this.carritoService.agregarAlCarrito(detalle).subscribe({
      next: () => {
        console.log('Producto agregado al carrito:', this.producto);
        this.mostrarToast('Producto agregado al carrito');
      },
      error: (err) => {
        console.error('Error al agregar el producto al carrito:', err);
        this.mostrarToast('Hubo un problema al agregar el producto al carrito', 'danger');
      }
    });
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
