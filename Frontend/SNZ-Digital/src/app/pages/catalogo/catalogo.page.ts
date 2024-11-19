import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { CarritoService } from 'src/app/Service/carrito.service'; // Importa el servicio de carrito
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {};
  productosSeleccionados: Producto[] = [];
  selectedCategory: Categoria | null = null;
  user: any = null; // Almacena la información del usuario

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,  // Inyectar ToastController

  ) {}

  ngOnInit() {
    this.loadUser();
    this.cargarCategorias();
  }

    // Método para cargar la información del usuario
    loadUser() {
      const email = this.authService.getEmailFromToken();
      if (email) {
        this.authService.searchByEmail(email).subscribe(
          (user) => {
            this.user = user;
            console.log('Usuario cargado:', this.user);
          },
          (error) => {
            console.error('Error al obtener el usuario:', error);
          }
        );
      } else {
        console.warn('No se encontró un token válido. El usuario debe iniciar sesión.');
      }
    }

  cargarCategorias() {
    this.categoriaService.getActiveCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  seleccionarCategoria(categoria: Categoria) {
    this.selectedCategory = categoria;
    this.productoService.getProductosByCategoria(categoria.catId).subscribe({
      next: (productos) => {
        this.productosSeleccionados = productos;
      },
      error: (err) => {
        console.error(`Error al cargar los productos de la categoría ${categoria.catId}:`, err);
      }
    });
  }

  irADetalleProducto(productId: any) {
    this.router.navigate(['/info-producto', productId]);
  }

  agregarAlCarrito(producto: Producto) {
    if (!producto.productId) {
      console.error('No se puede agregar al carrito: El productId es indefinido');
      this.mostrarToast('Este producto no tiene un ID válido y no se puede agregar al carrito.', 'warning');
      return;
    }
  
    if (!this.user || !this.user.id) {
      this.mostrarToast('Debes iniciar sesión para agregar productos al carrito.', 'warning');
      return;
    }
  
    const detalle: DetalleCarrito = {
      idDetalleCarrito: 0,
      cantidad: 1,
      costoUnitario: producto.precio ?? 0,
      costoTotal: (producto.precio ?? 0) * 1,
      productId: producto.productId,
      usuarioIdUser: this.user.id
    };
  
    this.carritoService.agregarAlCarrito(detalle).subscribe({
      next: () => {
        console.log('Producto agregado al carrito:', producto);
        this.mostrarToast('Producto agregado al carrito');
      },
      error: (err) => {
        console.error('Error al agregar el producto al carrito:', err);
        this.mostrarToast('Hubo un problema al agregar el producto al carrito', 'danger');
      }
    });
  }
  

  comprarAhora(producto: Producto) {
    console.log('Compra ahora:', producto);
    // Redirigir a la página de pago o implementar la lógica de compra inmediata
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,  // Duración en milisegundos
      color: color,
      position: 'top'
    });
    await toast.present();
  }
  
}
