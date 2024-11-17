import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ValoracionService } from 'src/app/Service/valoracion.service';
import { Valoracion } from 'src/models/valoracion';
import { Etiqueta } from 'src/models/etiqueta';
import { ToastController } from '@ionic/angular';
import { EtiquetaProductoService } from 'src/app/Service/EtiquetaProductoService.service';

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

  // Diccionario para valoraciones, asegurándonos de que cada producto tiene su propio arreglo de valoraciones
  valoracionesPorProducto: { [key: number]: { resena: Valoracion, nombreUsuario: string }[] } = {};

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private authService: AuthService,
    private valoracionService: ValoracionService,
    private toastController: ToastController,
    private etiquetaProductoService: EtiquetaProductoService, // Nuevo servicio
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.cargarProducto(this.idProducto);
      this.cargarValoraciones(this.idProducto);
      this.cargarEtiquetasPorProducto(this.idProducto); // Cargar etiquetas
    }
    this.loadUser();
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
          this.presentToast('Error al cargar el usuario', 'danger');
        }
      );
    } else {
      this.presentToast('Debe iniciar sesión para ver y dejar valoraciones.', 'danger');
    }
  }

  actualizarPrecio() {
    if (this.producto && this.producto.precio) {
      this.precioTotal = this.producto.precio * this.cantidadSeleccionada;
    }
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe(
      (data) => {
        this.producto = data.data;
        this.actualizarPrecio();
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
        if (!this.valoracionesPorProducto[productoId]) {
          this.valoracionesPorProducto[productoId] = [];
        }

        // Aseguramos que no haya duplicados al asignar nuevas valoraciones
        const nuevasValoraciones = await Promise.all(
          valoraciones.map(async (valoracion) => {
            try {
              const usuario = await this.authService.getUserById(valoracion.usuariosUserId).toPromise();
              return {
                resena: valoracion,
                nombreUsuario: usuario?.firstName || 'Usuario desconocido'
              };
            } catch (userError) {
              console.error('Error al obtener usuario:', userError);
              return {
                resena: valoracion,
                nombreUsuario: 'Usuario desconocido'
              };
            }
          })
        );

        // Evitamos sobrescribir y solo añadimos valoraciones únicas
        this.valoracionesPorProducto[productoId] = [
          ...this.valoracionesPorProducto[productoId],
          ...nuevasValoraciones,
        ];
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

    const valoracionData: Valoracion = {
      valPuntuacion: this.valoracion,
      valComentario: this.comentario,
      usuariosUserId: this.userId,
      productoProductId: this.idProducto || 0,
      valid: 1
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

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado al carrito:', producto);
    this.presentToast('Producto agregado al carrito.');
  }

  comprarAhora(producto: any) {
    console.log('Compra directa:', producto);
    this.presentToast('Iniciando compra.');
  }
}
