import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
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

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController  // Inyectar ToastController
  ) { }

  ngOnInit() {
    this.cargarProductos(); // Cargar los productos cuando el componente se inicie
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('detalle') || '';
      this.realizarBusqueda();
    });
  }

  // Agrega este método en tu componente TypeScript
  get filteredProductos() {
    const query = this.searchQuery?.toLowerCase() || ''; // Convierte la consulta a minúsculas para coincidencias parciales
    return this.productos.filter(producto =>
      producto?.productName?.toLowerCase().includes(query)
    );
  }

  realizarBusqueda(): void {
    console.log('Realizando búsqueda para:', this.searchQuery);
    // Aquí agregas la lógica para buscar productos basados en `this.searchQuery`
  }

  cargarProductos() {
    this.productoService.getAllProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;

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
