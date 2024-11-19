import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/Service/pedido.service';
import { Pedido } from 'src/models/pedido';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {
  pedido: Pedido | null = null; // Objeto que contiene el pedido completo
  detallesPedido: any[] = [];   // Detalles del pedido
  fechaEstimadaEntrega: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarSoloPedido(); // Cargar solo el pedido
    this.cargarPedido();     // Cargar el pedido y sus detalles
    this.calcularFechaEntrega();

  }

  calcularFechaEntrega() {
    const hoy = new Date();
    const fechaEntrega = new Date(hoy);
    fechaEntrega.setDate(hoy.getDate() + 7); // Sumar 7 días a la fecha actual

    const opciones = { day: 'numeric', month: 'long', year: 'numeric' } as const;
    this.fechaEstimadaEntrega = fechaEntrega.toLocaleDateString('es-ES', opciones);
  }

  // Cargar solo el pedido por su ID
  cargarSoloPedido() {
    const pedidoId = Number(this.route.snapshot.paramMap.get('pedidoId'));
    if (!pedidoId) {
      console.error('Pedido ID no válido para cargar solo el pedido');
      return;
    }

    console.log('ID del pedido extraído para cargar solo el pedido:', pedidoId);

    // Llama al servicio para obtener únicamente el pedido
    this.pedidoService.getPedidoById(pedidoId).subscribe(
      (pedido) => {
        this.pedido = pedido; // Asigna el pedido completo
        console.log('Pedido cargado:', this.pedido);
      },
      (error) => {
        console.error('Error al cargar solo el pedido:', error);
      }
    );
  }

  // Cargar el pedido y sus detalles
  cargarPedido() {
    const pedidoId = Number(this.route.snapshot.paramMap.get('pedidoId'));
    if (!pedidoId) {
      console.error('Pedido ID no válido');
      return;
    }

    console.log('ID del pedido extraído de la URL:', pedidoId);

    // Llama al servicio para obtener los detalles del pedido
    this.pedidoService.getDetallesByPedidoId(pedidoId).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.detallesPedido = response; // Asigna los detalles del pedido
          console.log('Detalles del pedido cargados:', this.detallesPedido);
        } else {
          console.error('La respuesta del backend no contiene detalles válidos.');
        }
      },
      (error) => {
        console.error('Error al cargar los detalles del pedido:', error);
      }
    );
  }

  volver() {
    this.router.navigate(['/perfil']); // Navega a la página de perfil
  }
}
