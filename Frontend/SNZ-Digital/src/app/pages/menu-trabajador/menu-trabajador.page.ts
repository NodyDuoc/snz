import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-menu-trabajador',
  templateUrl: './menu-trabajador.page.html',
  styleUrls: ['./menu-trabajador.page.scss'],
})
export class MenuTrabajadorPage implements OnInit {
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
    this.loadUser();

  }

  // Agregar este método para cargar el usuario al navegar
ionViewWillEnter() {
  this.loadUser(); // Cargar usuario cada vez que la vista entra
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

  // Función para encriptar el ID
  encryptId(id: string): string {
    const combined = id + environment.secretKey; // Usa la clave secreta del entorno
    let encrypted = '';

    // Aplica una transformación a cada carácter
    for (let i = 0; i < combined.length; i++) {
      encrypted += String.fromCharCode(combined.charCodeAt(i) + (i % 10));
    }

    return btoa(encrypted); // Convierte el resultado a Base64
  }



  ViewProductos() {  
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      const encryptedId = this.encryptId(this.user.id.toString()); // Encriptar el ID
  
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/maestro-producto']);
      console.log(`Redirigiendo a la página de pedidos de perfil con ID ${this.user.id}`);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }  
  ViewCategorias() {  
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      const encryptedId = this.encryptId(this.user.id.toString()); // Encriptar el ID
  
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/maestro-categoria']);
      console.log(`Redirigiendo a la página de pedidos de perfil con ID ${this.user.id}`);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }  
  ViewKardex() {  
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      const encryptedId = this.encryptId(this.user.id.toString()); // Encriptar el ID
  
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/kardex']);
      console.log(`Redirigiendo a la página de pedidos de perfil con ID ${this.user.id}`);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }  

  ViewGuias() {  
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      const encryptedId = this.encryptId(this.user.id.toString()); // Encriptar el ID
  
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/maestro-guia']);
      console.log(`Redirigiendo a la página de pedidos de perfil con ID ${this.user.id}`);
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }  
  ViewTag(){  
    // Verifica si el usuario está definido y tiene un ID
    if (this.user && this.user.id) {
      const encryptedId = this.encryptId(this.user.id.toString()); // Encriptar el ID
  
      // Redirige a la página de edición con el ID en la URL
      this.router.navigate(['/maestro-etiqueta']);
      console.log(`Redirigiendo a la página de pedidos de perfil con ID ${this.user.id}`);
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
