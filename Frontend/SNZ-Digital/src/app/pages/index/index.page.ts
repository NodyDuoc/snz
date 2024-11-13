import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
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

  loading: boolean = true;
  loadingProgress: number = 0;
  
  
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.cargarCategorias();
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
        this.categorias = data.filter(categoria =>
          ['Destacados', 'Celulares', 'Computación', 'Gaming'].includes(categoria.catName)
        );
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
    console.log('Producto agregado al carrito:', producto);
  }

  comprarAhora(producto: Producto) {
    console.log('Iniciar compra para el producto:', producto);
  }
}
