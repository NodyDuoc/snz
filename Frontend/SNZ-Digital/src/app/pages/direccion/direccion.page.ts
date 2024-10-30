import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/Service/DireccionService.service'; // Asegúrate de que este servicio existe
import { Direccion } from 'src/models/direccion';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {
  direcciones: Direccion[] = []; // Inicializa como un array vacío
  selectedDireccion?: Direccion; // Dirección seleccionada
  errorMessage: string = ''; // Variable para almacenar mensajes de error
  toastMessage: string | null = null;
  toastColor: string = 'success';
  user: any = null; // Almacenar toda la información del usuario

  constructor(
    private direccionService: DireccionService, // Cambiado a DireccionService
    private router: Router,
    private userService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user); // Verifica el contenido de this.user
          this.cargarDirecciones(); // Cargar las direcciones solo si hay un usuario
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver las direcciones.';
    }
  }

  // Nueva función para filtrar direcciones por usuarioIdUser
  filtrarPorUsuarioId(): Direccion[] {
    return this.direcciones.filter(direccion => direccion.usuarioIdUser === this.user.id);
  }

  cargarDirecciones() {
    if (!this.user) {
      this.direcciones = []; // No muestra direcciones si no hay usuario
      this.errorMessage = 'Debes iniciar sesión para ver las direcciones.';
      return;
    }

    this.direccionService.getAllDirecciones().subscribe(
      (data: Direccion[]) => {
        this.direcciones = data;

        // Filtra las direcciones para que solo incluya las del usuario
        this.direcciones = this.filtrarPorUsuarioId();

        if (this.direcciones.length > 0) {
          this.selectedDireccion = this.direcciones[0]; // Selecciona la primera dirección

        } else {
          this.errorMessage = 'No hay direcciones disponibles para este usuario.';
        }
      },
      (error) => {
        console.error('Error al obtener las direcciones', error);
        this.errorMessage = 'Hubo un problema al cargar las direcciones. Por favor, intenta más tarde.';
      }
    );
  }

  seleccionarDireccion(direccion: Direccion) {
    this.selectedDireccion = direccion; // Método para cambiar la dirección seleccionada
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
