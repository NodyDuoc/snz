// src/app/pages/info-producto/info-producto.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { ValoracionService } from 'src/app/Service/valoracion.service';
import { Valoracion } from 'src/models/valoracion';

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
  valoraciones: Valoracion[] = []; // Almacena las valoraciones del producto

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private valoracionService: ValoracionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.cargarProducto(this.idProducto);
      this.cargarValoraciones(this.idProducto);
    }
    this.actualizarPrecio();
  }

  actualizarPrecio() {
    if (this.producto) {
      this.precioTotal = this.producto.precio * this.cantidadSeleccionada;
    }
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe(data => {
      this.producto = data.data;
    }, error => {
      console.error('Error al cargar el producto', error);
    });
  }

  cargarValoraciones(idProducto: number) {
    this.valoracionService.getValoracionesByProductoId(idProducto).subscribe(data => {
      this.valoraciones = data.filter(valoracion => valoracion.productoProductId === idProducto);
    }, error => {
      console.error('Error al cargar las valoraciones', error);
    });
  }

  agregarAlCarrito(producto: any) {
    // Implementar lógica para agregar al carrito
  }

  comprarAhora(producto: any) {
    // Implementar lógica para comprar ahora
  }
}
