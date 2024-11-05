import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/Service/pedido.service'; // Asegúrate de que este servicio existe
import { Pedido } from 'src/models/pedido';

@Component({
  selector: 'app-maestro-despacho',
  templateUrl: './maestro-despacho.page.html',
  styleUrls: ['./maestro-despacho.page.scss'],
})
export class MaestroDespachoPage implements OnInit {
  pedidos: Pedido[] = []; // Inicializa como un array vacío
  selectedPedido?: Pedido; // Pedido seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  toastMessage: string | null = null;
  toastColor: string = 'success';

  constructor(
    private pedidoService: PedidoService, // Servicio de pedidos
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarPedidos(); // Cargar todos los pedidos al iniciar
  }

  // Cargar pedidos desde el servicio
  cargarPedidos() {
    this.pedidoService.getAllPedidos().subscribe(
      (data: Pedido[]) => {
        this.pedidos = data;

        if (this.pedidos.length > 0) {
          this.selectedPedido = this.pedidos[0]; // Selecciona el primer pedido
        } else {
          this.errorMessage = 'No hay pedidos disponibles.';
        }
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
        this.errorMessage = 'Hubo un problema al cargar los pedidos. Por favor, intenta más tarde.';
      }
    );
  }

  seleccionarPedido(pedido: Pedido) {
    this.selectedPedido = pedido; // Método para cambiar el pedido seleccionado
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
    this.toastMessage = message;
    this.toastColor = color;
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
  