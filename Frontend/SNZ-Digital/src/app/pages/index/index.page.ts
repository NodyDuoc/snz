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
  productosPorCategoria: { [key: number]: Producto[] } = { 5: [] }; // Inicializamos con un array vacío para la categoría 5
  categoriasIds: number[] = [];
  productosSeleccionados: Producto[] = []; // Productos de la categoría seleccionada  
  selectedCategory: Categoria | null = null; // Agrega esta propiedad  
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        console.log('Categorías:', this.categorias);
        
        // Limpiar el array de IDs de categorías
        this.categoriasIds = [];
        
        // Filtrar solo la categoría con catId 5
        const categoria5 = this.categorias.find(categoria => categoria.catId === 5);
        if (categoria5) {
          console.log('Cargando productos para la categoría 5:', categoria5);
          this.categoriasIds.push(categoria5.catId);
          
          this.productoService.getProductosByCategoria(categoria5.catId).subscribe({
            next: (productos) => {
              console.log(`Productos para la categoría ${categoria5.catId}:`, productos);
              this.productosPorCategoria[categoria5.catId] = productos;
            },
            error: (err) => {
              console.error(`Error al cargar los productos de la categoría ${categoria5.catId}:`, err);
            }
          });
        } else {
          console.log('No se encontró la categoría 5');
        }
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
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
