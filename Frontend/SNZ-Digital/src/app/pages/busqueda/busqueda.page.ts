import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { CarritoService } from 'src/app/Service/carrito.service';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { Producto } from 'src/models/producto';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  productos: Producto[] = []; // Inicializa como un array vacío
  selectedProducto?: Producto; // Producto seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  imagePreview: string | ArrayBuffer | null = null;
  toastMessage: string | null = null;
  toastColor: string = 'success';
  searchQuery: string = '';
  user: any = null; // Agrega una propiedad para almacenar el usuario

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,  // Inyectar ToastController
    private carritoService: CarritoService, // Inyecta el servicio del carrito
    private authService: AuthService,


  ) { }

  ngOnInit() {
    this.cargarProductos(); // Cargar los productos cuando el componente se inicie
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('detalle') || '';
      this.realizarBusqueda();
    });
    this.loadUser(); // Carga el usuario
  }

  // Agrega este método en tu componente TypeScript
  get filteredProductos() {
    const query = this.searchQuery?.toLowerCase() || ''; // Convierte la consulta a minúsculas para coincidencias parciales
  
    // Filtrar productos activos y por búsqueda
    return this.productos.filter(producto =>
      producto.status === 1 && // Solo productos activos
      (producto.productName?.toLowerCase().includes(query) || 
       producto.descripcion?.toLowerCase().includes(query))
    );
  }
  

  loadUser() {
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.authService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado en BusquedaPage:', this.user);
        },
        (error) => {
          console.error('Error al obtener el usuario en BusquedaPage:', error);
        }
      );
    } else {
      console.warn('No se encontró un token válido. El usuario debe iniciar sesión.');
    }
  }
  

  realizarBusqueda(): void {
    console.log('Realizando búsqueda para:', this.searchQuery);
    // Aquí agregas la lógica para buscar productos basados en `this.searchQuery`
  }

  cargarProductos() {
    this.productoService.getAllProductos().subscribe(
      (data: Producto[]) => {
        // Filtrar productos activos
        const activeProducts = data.filter(producto => producto.status === 1);
  
        // Filtrar productos para eliminar duplicados por nombre
        const uniqueProducts = activeProducts.filter((producto, index, self) =>
          index === self.findIndex(p => p.productName === producto.productName)
        );
  
        this.productos = uniqueProducts;
  
        // Llama al método para ordenar después de cargar los productos
        this.ordenarProductos();
  
        // Selecciona el primer producto por defecto si hay productos disponibles
        if (this.productos.length > 0) {
          this.selectedProducto = this.productos[0];
  
          // Si el producto tiene imagen, se crea la vista previa
          if (this.selectedProducto.imagen) {
            this.imagePreview = `data:image/png;base64,${this.selectedProducto.imagen}`;
          }
        } else {
          this.errorMessage = 'No hay productos disponibles.';
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
  verProducto(productoId?: number) {
    if (productoId === undefined) {
      this.showToast('El producto no tiene un ID válido para ver.', 'danger');
      return;
    }
  
    // Redirige a la página de detalles
    this.router.navigate(['/info-producto', productoId]);
  }
  
  

  // Función para hacer scroll suave a la sección con el id proporcionado
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  agregarAlCarrito(producto: Producto) {
    if (!producto.productId) {
      this.showToast('El producto no tiene un ID válido y no se puede agregar al carrito.', 'danger');
      return;
    }
  
    if (!this.user || !this.user.id) {
      this.showToast('Debes iniciar sesión para agregar productos al carrito.', 'warning');
      return;
    }
  
    const detalle: DetalleCarrito = {
      idDetalleCarrito: 0,
      cantidad: 1,
      costoUnitario: producto.precio || 0,
      costoTotal: (producto.precio || 0) * 1,
      productId: producto.productId,
      usuarioIdUser: this.user.id, // Usa el ID del usuario cargado
    };
  
    this.carritoService.agregarAlCarrito(detalle).subscribe({
      next: () => {
        this.showToast('Producto agregado al carrito', 'success');
        console.log('Producto agregado al carrito:', producto);
      },
      error: (err) => {
        console.error('Error al agregar el producto al carrito:', err);
        this.showToast('Hubo un problema al agregar el producto al carrito.', 'danger');
      },
    });
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
