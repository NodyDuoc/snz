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
  if (!this.user) {
    this.pedidos = []; // No muestra pedidos si no hay usuario
    this.errorMessage = 'Debes iniciar sesión para ver los pedidos.';
    return;
  }

  this.pedidoService.getAllPedidos().subscribe(
    (data: Pedido[]) => {
      console.log('Pedidos obtenidos del servicio:', data); // Mostrar todos los pedidos obtenidos
      this.pedidos = data;

      // Filtra los pedidos para que solo incluya los del usuario logeado
      this.pedidos = this.filtrarPorUsuarioId();
      console.log('Pedidos filtrados por usuario:', this.pedidos); // Mostrar los pedidos después de filtrar por usuario

      if (this.pedidos.length > 0) {
        this.selectedPedido = this.pedidos[0]; // Selecciona el primer pedido
        console.log('Primer pedido seleccionado:', this.selectedPedido); // Mostrar el primer pedido seleccionado
      } else {
        this.errorMessage = 'No hay pedidos disponibles para este usuario.';
        console.log(this.errorMessage);
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