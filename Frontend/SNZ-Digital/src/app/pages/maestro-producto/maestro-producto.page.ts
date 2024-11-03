import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto'; // Asegúrate de tener el modelo de producto  

@Component({
  selector: 'app-maestro-producto',
  templateUrl: './maestro-producto.page.html',
  styleUrls: ['./maestro-producto.page.scss'],
})
export class MaestroProductoPage implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {}; // Almacena productos por categoría  
  productosSeleccionados: Producto[] = []; // Productos de la categoría seleccionada  
  selectedCategory: Categoria | null = null; // Agrega esta propiedad  

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService // Inyecta el servicio de productos  

  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  seleccionarCategoria(categoria: Categoria) {  
    this.selectedCategory = categoria; // Actualiza la categoría seleccionada  
    console.log('Categoría seleccionada:', categoria);  
    this.productoService.getProductosByCategoria(categoria.catId).subscribe({  
      next: (productos) => {  
        console.log(`Productos para la categoría ${categoria.catId}:`, productos);  
        this.productosSeleccionados = productos; // Almacena los productos seleccionados  
      },  
      error: (err) => {  
        console.error(`Error al cargar los productos de la categoría ${categoria.catId}:`, err);  
      }  
    });  
  } 

  agregarAlCarrito(producto: Producto) {  
    // Lógica para agregar el producto al carrito  
    console.log('Producto agregado al carrito:', producto);  
    // Aquí agregarías la lógica para añadir el producto al carrito.  
  }  

  comprarAhora(producto: Producto) {  
    // Lógica para proceder con la compra inmediata  
    console.log('Compra ahora:', producto);  
    // Aquí agregarías la lógica para llevar al usuario a la página de pago o similar.  
  }  


}