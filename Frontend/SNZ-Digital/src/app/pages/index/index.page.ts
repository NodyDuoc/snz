import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { CarritoService } from 'src/app/Service/carrito.service';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { Producto } from 'src/models/producto';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = { 1: [] }; // Inicializamos con un array vacío para la categoría 5
  categoriasIds: number[] = [];
  productosSeleccionados: Producto[] = []; // Productos de la categoría seleccionada  
  selectedCategory: Categoria | null = null; // Agrega esta propiedad  
  errorMessage: string = '';
  user: any = null; // Almacena la información del usuario

  loading: boolean = true;
  loadingProgress: number = 0;
  
  
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private router: Router,    
    private toastController: ToastController,  // Inyectar ToastController
    private carritoService: CarritoService,
    private authService: AuthService,


  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.cargarCategorias();
    this.loadUser();
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

  updateLoadingProgress(value: number) {
    this.loadingProgress = value;
    if (this.loadingProgress >= 100) {
      setTimeout(() => {
        this.loading = false; // Oculta la barra de carga cuando se completa
      }, 500); // Agrega un pequeño retraso para una transición suave
    }
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data; // Carga todas las categorías sin filtrar
        this.updateLoadingProgress(50); // Actualiza el progreso después de cargar categorías
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
        this.errorMessage = 'Hubo un problema al cargar las categorías. Por favor, intenta más tarde.';
        this.updateLoadingProgress(50);
      }
    );
  }
  

  loadProductos(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        this.categoriasIds = [];
        const categoria5 = this.categorias.find(categoria => categoria.catId === 1);
        if (categoria5) {
          this.categoriasIds.push(categoria5.catId);
          this.productoService.getProductosByCategoria(categoria5.catId).subscribe({
            next: (productos) => {
              this.productosPorCategoria[categoria5.catId] = productos;
              this.updateLoadingProgress(100); // Finaliza la carga
            },
            error: (err) => {
              console.error(`Error al cargar los productos de la categoría ${categoria5.catId}:`, err);
              this.updateLoadingProgress(100);
            }
          });
        } else {
          console.log('No se encontró la categoría 5');
          this.updateLoadingProgress(100);
        }
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
        this.updateLoadingProgress(100);
      }
    });
  }

  irADetalleProducto(productId: any) {
    console.log(productId)
    this.router.navigate(['/info-producto', productId]); // Redirige a la página de info-producto con el ID del producto
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
    console.log('Iniciar compra para el producto:', producto);
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

  irAlCatalogo() {
    this.router.navigate(['/catalogo']);
  }
  
}
