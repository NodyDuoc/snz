import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {

  productos: Producto[] = []; // Variable para almacenar los productos
  selectedProducto?: Producto; // Producto seleccionado

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.cargarProductos(); // Cargar los productos cuando el componente se inicie
  }

  cargarProductos() {
    this.productoService.getAllProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        if (this.productos.length > 0) {
          this.selectedProducto = this.productos[0]; // Selecciona el primer producto por defecto
        }
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
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

}
