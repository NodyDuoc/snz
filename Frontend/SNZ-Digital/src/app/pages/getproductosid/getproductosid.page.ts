import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-getproductosid',
  templateUrl: './getproductosid.page.html',
  styleUrls: ['./getproductosid.page.scss'],
})
export class GetproductosidPage implements OnInit {
  productos: Producto[] = []; // Inicializa como un array vacío
  selectedProducto?: Producto; // Producto seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  imagePreview: string | ArrayBuffer | null = null;
  toastMessage: string | null = null;
  toastColor: string = 'success';
  searchQuery: string = '';
  user: any = null; // Almacenar toda la información del usuario

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: AuthService,
    private toastController: ToastController  // Inyectar ToastController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user); // Verifica el contenido de this.user
          this.cargarProductos(); // Cargar los productos solo si hay un usuario
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver los productos.';
    }
  }

  // Nueva función para filtrar por productId
  filtrarPorId(): Producto[] {
    return this.productos.filter(producto => producto.productId === this.user.id);
  }

  cargarProductos() {
    if (!this.user) {
      this.productos = []; // No muestra productos si no hay usuario
      this.errorMessage = 'Debes iniciar sesión para ver los productos.';
      return;
    }

    this.productoService.getAllProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;

        // Filtra los productos para que solo incluya el de productId = 1
        this.productos = this.filtrarPorId();

        if (this.productos.length > 0) {
          this.selectedProducto = this.productos[0];

          // Si el producto tiene imagen, se crea la vista previa
          if (this.selectedProducto.imagen) {
            this.imagePreview = `data:image/png;base64,${this.selectedProducto.imagen}`;
          }
        } else {
          this.errorMessage = 'No hay productos disponibles con el ID especificado.';
        }
      },
      (error) => {
        console.error('Error al obtener los productos', error);
        this.errorMessage = 'Hubo un problema al cargar los productos. Por favor, intenta más tarde.';
      }
    );
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];

      // Validar el tipo de archivo
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          this.imagePreview = reader.result;
        };

        reader.readAsDataURL(file);
      } else {
        // Mostrar mensaje de error si el archivo no es JPG o PNG
        this.toastMessage = "Solo se permiten archivos JPG o PNG.";
        this.toastColor = 'danger';
        this.presentToast();
      }
    }
  }

  ordenarProductos() {
    this.productos.sort((a, b) => {
      // Ordenar por precio de mayor a menor
      return (b.precio || 0) - (a.precio || 0);
    });
  }

  seleccionarProducto(producto: Producto) {
    this.selectedProducto = producto; // Método para cambiar el producto seleccionado
  }

  // Función para hacer scroll suave a la sección con el id proporcionado
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  agregarAlCarrito(producto: Producto) {
    // Lógica para agregar el producto al carrito
    console.log('Producto agregado al carrito:', producto);
  }

  comprarAhora(producto: Producto) {
    // Lógica para realizar la compra del producto
    console.log('Iniciar compra para el producto:', producto);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage || '',
      color: this.toastColor,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async showToast(message: string, color: string = 'success') {
    this.toastMessage = message; // Actualiza la propiedad
    this.toastColor = color; // Actualiza el color del toast
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
