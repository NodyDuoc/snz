import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/Service/carrito.service';
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';

@Component({
  selector: 'app-carritotesting',
  templateUrl: './carritotesting.page.html',
  styleUrls: ['./carritotesting.page.scss'],
})
export class CarritotestingPage implements OnInit {
  carrito: Carrito | undefined;
  detalles: DetalleCarrito[] = [];
  usuarioId = 1; // Reemplaza este ID por el ID del usuario autenticado

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carritoService.getAllCarritos().subscribe(
      (carritos) => {
        // Filtra los carritos para encontrar el del usuario actual
        this.carrito = carritos.find(c => c.usuarioIdUser === this.usuarioId);

        if (this.carrito) {
          this.cargarDetallesCarrito(this.carrito.idCarrito);
        }
      },
      (error) => {
        console.error('Error al obtener los carritos:', error);
      }
    );
  }

  cargarDetallesCarrito(carritoId: number) {
    this.carritoService.getAllDetallesCarrito().subscribe(
      (detalles) => {
        // Filtra los detalles que pertenecen al carrito del usuario actual
        this.detalles = detalles.filter(d => d.idCarrito === carritoId);
      },
      (error) => {
        console.error('Error al obtener los detalles del carrito:', error);
      }
    );
  }
}