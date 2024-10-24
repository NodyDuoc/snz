import { Component, OnInit } from '@angular/core';
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
  productosPorCategoria: { [key: number]: Producto[] } = {}; // Almacena productos por categoría
  categoriasIds: number[] = []; // Arreglo para almacenar las IDs de las categorías

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.loadProductos();

  }

  
  loadProductos(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
        console.log('Categorías:', this.categorias);
        
        this.categoriasIds = [];
        this.categorias.forEach(categoria => {
          console.log('Cargando productos para la categoría:', categoria);
          this.categoriasIds.push(categoria.catId);
          
          this.productoService.getProductosByCategoria(categoria.catId).subscribe({
            next: (productos) => {
              console.log(`Productos para la categoría ${categoria.catId}:`, productos);
              this.productosPorCategoria[categoria.catId] = productos;
            },
            error: (err) => {
              console.error(`Error al cargar los productos de la categoría ${categoria.catId}:`, err);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }

agregarAlCarrito(producto: Producto) {
    // Lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', producto);
}

comprarAhora(producto: Producto) {
    // Lógica para realizar la compra del producto
    console.log('Iniciar compra para el producto:', producto);
}


}
