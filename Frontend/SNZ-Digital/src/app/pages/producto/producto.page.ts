import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: Producto[] = []; // Inicializa como un array vacío
  producto: Producto | null = null;
  selectedProducto?: Producto; // Producto seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  imagePreview: string | ArrayBuffer | null = null;
  toastMessage: string | null = null;
  toastColor: string = 'success';
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,  // Inyectar ToastController

  ) {

  }

  ngOnInit() {
    this.loadProductFromRoute(); // Cargar los productos cuando el componente se inicie
  }

  loadProductFromRoute() {
    const productId = this.route.snapshot.paramMap.get('id'); // Obtén el ID del parámetro de la URL
    if (productId) {
      this.loadProductById(Number(productId)); // Llama a tu función para cargar el producto
    } else {
      this.errorMessage = 'No se proporcionó un ID de producto.';
    }
  }

  loadProductById(productId: number) {
    this.productoService.getProductById(productId).subscribe(
      (producto) => {
        this.selectedProducto = producto; // Almacena la información del producto seleccionado

        // Si el producto tiene imagen, se crea la vista previa
        if (this.selectedProducto.imagen) {
          this.imagePreview = `data:image/png;base64,${this.selectedProducto.imagen}`;
        }
      },
      (error) => {
        console.error('Error al obtener el producto', error);
        this.errorMessage = 'Hubo un problema al cargar el producto. Por favor, intenta más tarde.';
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
