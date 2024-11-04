import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/Service/ProductoService.service';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.page.html',
  styleUrls: ['./info-producto.page.scss'],
})
export class InfoProductoPage implements OnInit {
  idProducto: number | undefined;
  producto: any; // Cambia el tipo según tu modelo
  cantidadSeleccionada: number = 1;
  precioTotal: number = 0;
  constructor(private route: ActivatedRoute, private productoService: ProductoService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.cargarProducto(this.idProducto);
    }
    this.actualizarPrecio();
    this.precioTotal = this.producto.precio; 
  }

  actualizarPrecio() {
    this.precioTotal = this.producto.precio * this.cantidadSeleccionada;
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe(data => {
      console.log(data); // Verifica la estructura aquí
      this.producto = data.data; // Asignar la propiedad correcta
    }, error => {
      console.error('Error al cargar el producto', error);
    });
  }

  agregarAlCarrito(producto: any) {
    // Implementar lógica para agregar al carrito
  }

  comprarAhora(producto: any) {
    // Implementar lógica para comprar ahora
  }
}