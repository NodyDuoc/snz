import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {}; // Almacena productos por categoría
  categoriasIds: number[] = []; // Arreglo para almacenar las IDs de las categorías

  //
  user!: any; // Almacenar toda la información del usuario
  currentYear: number = new Date().getFullYear();
  searchQuery: string = '';
  cartTotal: number = 0;
  cartItemCount: number = 0;
  currentIndex: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private router: Router, // Cambiado a Router aquí
    private fb: FormBuilder,
    private userService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    this.loadProductos();
    this.loadUser();

  }

  // Agregar este método para cargar el usuario al navegar
ionViewWillEnter() {
  this.loadUser(); // Cargar usuario cada vez que la vista entra
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

// Funciones propias

loadUser() {
  const email = this.userService.getEmailFromToken();
  if (email) {
    this.userService.searchByEmail(email).subscribe(
      (user) => {
        this.user = user;
        console.log('Usuario cargado:', this.user); // Verifica el contenido de this.user
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}


  search(): void {
    console.log('Buscando:', this.searchQuery);
  }

  onViewProfile() {
    console.log('Ver perfil');
  }

  onEditProfile() {
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/editar-perfil', this.user.id]);
      console.log(`Redirigiendo a la página de edición de perfil con ID ${this.user.id}`);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }

  onViewPurchases() {
    console.log('Ver compras');
  }

  onViewAddresses() {
    console.log('Ver direcciones');
  }

  onLogout() {
    console.log('Cerrar sesión');
  }



}
