import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';
import { EtiquetaService } from 'src/app/Service/EtiquetaService.service'; // Importa el servicio de Etiqueta
import { EtiquetaProductoService } from 'src/app/Service/EtiquetaProductoService.service'; // Importa el servicio de Etiqueta
import { Etiqueta } from 'src/models/etiqueta'; // Asegúrate de importar el modelo de Etiqueta

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.page.html',
  styleUrls: ['./etiqueta.page.scss'],
})
export class EtiquetaPage implements OnInit {
  productos: Producto[] = []; // Inicializa como un array vacío
  selectedProducto?: Producto; // Producto seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  imagePreview: string | ArrayBuffer | null = null;
  toastMessage: string | null = null;
  toastColor: string = 'success';
  searchQuery: string = '';
  etiquetaIdTemp: string = '';
  etiquetaDetalle?: Etiqueta; // Variable para almacenar los detalles de la etiqueta
  detalleEtiquetas: string[] = []; // Array para almacenar las frases separadas

  constructor(
    private productoService: ProductoService,
    private etiquetaService: EtiquetaService, // Inyecta el servicio de Etiqueta
    private etiquetaProductoService: EtiquetaProductoService, // Inyecta el servicio de Etiqueta
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController  // Inyectar ToastController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.etiquetaIdTemp = params.get('Id') || ''; // Obtén el ID de la etiqueta de los parámetros
      this.searchQuery = params.get('detalle') || ''; // Obtén el detalle de búsqueda
      this.obtenerEtiquetaDetalle(); // Llama al método para obtener la etiqueta por ID
      this.obtenerProductosDetalle(); 

      
    });
  }

  // Agrega este método para obtener la información de la etiqueta
  obtenerEtiquetaDetalle(): void {
    const id = parseInt(this.etiquetaIdTemp); // Asegúrate de convertir el id a número
    if (id) {
      this.etiquetaService.getEtiquetaById(id).subscribe(
        (data: Etiqueta) => {
          this.etiquetaDetalle = data; // Asigna la respuesta a la variable de detalles de la etiqueta
          console.log('Detalles de la etiqueta:', this.etiquetaDetalle);
          this.procesarDetalleEtiqueta(); // Llama al método para dividir el texto en frases
        },
        (error) => {
          console.error('Error al obtener los detalles de la etiqueta', error);
          this.errorMessage = 'Hubo un problema al cargar los detalles de la etiqueta. Por favor, intenta más tarde.';
        }
      );
    } else {
      console.log('Nisiquiera encontró 1', this.etiquetaIdTemp);
    }
  }

  // Método para filtrar los productos
  get filteredProductos() {
    const query = this.searchQuery?.toLowerCase() || ''; // Convierte la consulta a minúsculas para coincidencias parciales
    return this.productos.filter(producto =>
      producto?.productName?.toLowerCase().includes(query) || 
      producto?.descripcion?.toLowerCase().includes(query)
    );
  }

    // Método para dividir el texto de detalle en frases
    procesarDetalleEtiqueta(): void {
      if (this.etiquetaDetalle?.detalleEtiqueta) {
        // Divide el texto usando un punto seguido de un espacio o fin de línea, pero no puntos en números o siglas
        this.detalleEtiquetas = this.etiquetaDetalle.detalleEtiqueta
          .split(/(?<!\d)\. /) // División basada en un punto que no siga un número
          .map(frase => frase.trim()) // Elimina espacios extra
          .filter(frase => frase !== '') // Filtra frases vacías
          .map(frase => frase.endsWith('.') ? frase : `${frase}.`); // Asegura que todas las frases terminen en punto
      }
    }
    

  realizarBusqueda(): void {
    console.log('Realizando búsqueda para:', this.searchQuery);
    // Aquí agregas la lógica para buscar productos basados en `this.searchQuery`
  }

  obtenerProductosDetalle(): void {
    const id = parseInt(this.etiquetaIdTemp); // Asegúrate de convertir el id a número
    if (id) {
      this.etiquetaProductoService.getProductosDetalleByEtiquetaId(id).subscribe(
        (productostemp: Producto[]) => {
          console.log('Todo bien con los productos:', this.etiquetaIdTemp);
          this.productos = productostemp; // Asignar los productos asociados a la etiqueta
        },
        (error) => {
          console.error('Error al obtener los productos de la etiqueta', error);
        }
      );
    } else {
      console.log('No se encontró ningún producto:', this.etiquetaIdTemp);
    }
  }

  ordenarProductos() {
    this.productos.sort((a, b) => {
      return (b.precio || 0) - (a.precio || 0);
    });
  }

  seleccionarProducto(producto: Producto) {
    this.selectedProducto = producto; // Método para cambiar el producto seleccionado
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
