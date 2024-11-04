import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Categoria } from 'src/models/categoria';
import { Producto } from 'src/models/producto';


import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  categorias: Categoria[] = [];
  productosPorCategoria: { [key: number]: Producto[] } = {}; // Almacena productos por categoría
  categoriasIds: number[] = []; // Arreglo para almacenar las IDs de las categorías

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private authService: AuthService, 
    private router: Router, 
    private toastController: ToastController
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
  

  onRegister() {
    this.router.navigate(['/registrar-usuario']);
  }

agregarAlCarrito(producto: Producto) {
    // Lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', producto);
}

comprarAhora(producto: Producto) {
    // Lógica para realizar la compra del producto
    console.log('Iniciar compra para el producto:', producto);
}
// Propios
login() {
  // Verificar si se han proporcionado correo electrónico y contraseña
  if (!this.email || !this.password) {
    // Mostrar mensaje de error si faltan correo electrónico o contraseña
    this.presentToast('Por favor ingresa tu correo electrónico y contraseña.');
    return;
  }

  // Enviar solicitud de inicio de sesión al servicio
  this.authService.login(this.email, this.password).subscribe(
    (response) => {
      // Manejar la respuesta del servicio (por ejemplo, guardar el token)
      const token = response.jwt;  // Accede al token usando 'response.jwt'
      const userId = response.userId; // Asegúrate de que esta propiedad exista en tu respuesta

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', `${userId}`); // Usando template literals para convertirlo a string

        this.isLoggedIn = this.authService.isAuthenticated();

        if (this.isLoggedIn) {
            const userRole = this.authService.getRoleFromToken();
            console.log('Respuesta del inicio de sesión:', response);

            this.router.navigate(['/index']).then(() => {
              window.location.reload(); // Recarga la página para asegurar que el token se guarda y se usa correctamente
            });
        }
      } else {
        console.error("Token no recibido.");
      }
    },
    (error) => {
      // Manejar errores de inicio de sesión (por ejemplo, mostrar mensaje de error)
      if (error.status === 401) {
        this.presentToast('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.');
      } else {
        this.presentToast('Error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  );

}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}


}
