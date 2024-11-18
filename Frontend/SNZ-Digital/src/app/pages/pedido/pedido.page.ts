import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PedidoService } from 'src/app/Service/pedido.service'; // Asegúrate de que este servicio existe
import { Pedido } from 'src/models/pedido';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  pedidos: Pedido[] = []; // Inicializa como un array vacío
  selectedPedido?: Pedido; // Pedido seleccionado
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  toastMessage: string | null = null;
  toastColor: string = 'success';
  user: any = null; // Almacenar toda la información del usuario
  detallesPedido: any[] = []; // Para almacenar los detalles del pedido seleccionado

  constructor(
    private pedidoService: PedidoService, // Servicio de pedidos
    private router: Router,
    private authService: AuthService, // Servicio de autenticación
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  // Cargar información del usuario logeado
  loadUser() {
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.authService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user);
          this.cargarPedidos(); // Cargar pedidos solo si hay un usuario
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver los pedidos.';
    }
  }

  // Función para filtrar pedidos por usuarioId
  filtrarPorUsuarioId(): Pedido[] {
    return this.pedidos.filter(pedido => pedido.usuarioId === this.user.id);
  }

// Cargar pedidos desde el servicio
cargarPedidos() {
  if (!this.user || !this.user.id) {
    this.pedidos = []; // No muestra pedidos si no hay usuario
    this.errorMessage = 'Debes iniciar sesión para ver los pedidos.';
    return;
  }

  this.pedidoService.getPedidosByUsuarioId(this.user.id).subscribe(
    (pedidos) => {
      console.log('Pedidos del usuario:', pedidos);
      this.pedidos = pedidos; // Asigna los pedidos a tu variable en el componente
    },
    (error) => {
      console.error('Error al obtener los pedidos del usuario:', error);
      this.showToast('Error al cargar los pedidos.', 'danger');
    }
  );
}


cargarDetalles(pedidoId: number) {
  this.pedidoService.getDetallesByPedidoId(pedidoId).subscribe(
    (detalles) => {
      console.log('Detalles del pedido:', detalles);
      this.detallesPedido = detalles.productos || []; // Asigna los productos al array de detalles
      this.showToast('Detalles cargados correctamente', 'success');
    },
    (error) => {
      console.error('Error al obtener los detalles del pedido:', error);
      this.showToast('Error al cargar los detalles del pedido', 'danger');
    }
  );
}


seleccionarPedido(pedido: Pedido) {
  if (pedido.pedidoId) {
    this.router.navigate(['/pedido-detalle', pedido.pedidoId]); // Redirige a pedido-detalle con el pedidoId
  }
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