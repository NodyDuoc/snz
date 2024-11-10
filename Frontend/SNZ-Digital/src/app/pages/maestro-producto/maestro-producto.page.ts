import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  productosPorCategoria: { [key: number]: Producto[] } = {};  
  productosSeleccionados: Producto[] = [];  
  selectedCategory: Categoria | null = null;
  productos: Producto[] = []; // Aquí asumes que tienes una lista de productos

    constructor(
      private categoriaService: CategoriaService,
      private productoService: ProductoService, // Inyecta el servicio de productos  
      private router: Router,
      private toastController: ToastController,
      private route: ActivatedRoute,
    ) {}
  
    ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        if (params['refresh'] === 'true' && this.selectedCategory) {
          this.seleccionarCategoria(this.selectedCategory);
        }
      });
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
      this.selectedCategory = categoria; 
      console.log('Categoría seleccionada:', categoria);  
      this.productoService.getProductosByCategoria(categoria.catId).subscribe({  
        next: (productos) => {  
          console.log(`Productos para la categoría ${categoria.catId}:`, productos);  
          this.productosSeleccionados = productos;  
        },  
        error: (err) => {  
          console.error(`Error al cargar los productos de la categoría ${categoria.catId}:`, err);  
        }  
      });  
    } 
  
    irADetalleProducto(product: Producto) {
      if (this.selectedCategory) {
        const categoryId = this.selectedCategory.catId;
        const productId = product.productId;
        console.log('Navegando a la edición del producto con ID:', productId, 'y categoría ID:', categoryId);
        this.router.navigate(['/maestro-producto-editar', categoryId, productId]);
      }
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
  
    irACrearProducto() {
      if (this.selectedCategory) {
        const categoryId = this.selectedCategory.catId;
        console.log('ID de categoría seleccionada para crear producto:', categoryId);
        this.router.navigate([`/maestro-producto-crear`, categoryId]); // Navega a la URL con el id de la categoría
      }
    }

    async eliminarProducto(id: number) {
      this.productoService.deleteProducto(id).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Producto eliminado con éxito',
            color: 'success',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          location.reload();
        },
        error: async (error) => {
          const toast = await this.toastController.create({
            message: error.message || 'Error al eliminar el producto',
            color: 'danger',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      });
    }


    etiquetas(id: number) {
      // Verifica si el usuario está definido y tiene un ID
 
        this.router.navigate(['/maestro-etiqueta-producto', id]);
        
    }
    
    
  }