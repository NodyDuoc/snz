import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { CarritoService } from 'src/app/Service/carrito.service'; // Importa el servicio de carrito
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { AuthService } from 'src/app/Service/auth.service';

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

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService, // Inyecta el servicio de autenticación
    private router: Router
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
      alert('Este producto no tiene un ID válido y no se puede agregar al carrito.');
      return;
    }
  
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
  
    const detalle: DetalleCarrito = {
      idDetalleCarrito: 0,
      cantidad: 1,
      costoUnitario: producto.precio ?? 0,
      costoTotal: (producto.precio ?? 0) * 1,
      productId: producto.productId,
      usuarioIdUser: userId
    };
  
    this.carritoService.agregarAlCarrito(detalle).subscribe({
      next: () => {
        console.log('Producto agregado al carrito:', producto);
        alert('Producto agregado al carrito');
      },
      error: (err) => {
        console.error('Error al agregar el producto al carrito:', err);
        alert('Hubo un problema al agregar el producto al carrito');
      }
    });
  }
  
  
  

  getUserId(): number {
    // Aquí debes obtener el ID del usuario actual; puedes obtenerlo desde un servicio de autenticación
    return 1; // Este es solo un ejemplo
  }

  comprarAhora(producto: Producto) {
    console.log('Compra ahora:', producto);
    // Redirigir a la página de pago o implementar la lógica de compra inmediata
  }
}
