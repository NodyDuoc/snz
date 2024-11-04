import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/Service/DireccionService.service';
import { Direccion } from 'src/models/direccion';
import { AuthService } from 'src/app/Service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {
  searchQuery: string = '';
  direcciones: Direccion[] = [];
  selectedDireccion?: Direccion;
  errorMessage: string = '';
  toastMessage: string | null = null;
  toastColor: string = 'success';
  user: any = null;
  usuarioActual: any;
  usuarioForm: FormGroup;
  mostrarInformacionUsuario: boolean = false;

  constructor(
    private direccionService: DireccionService,
    private router: Router,
    private userService: AuthService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      firstName: [''],
      secondName: [''],
      firstLastName: [''],
      secondLastName: [''],
      email: [''],
      phone: [''],
      roleListName: [''],
      isActivated: [false]
    });
  }

  ngOnInit() {
    const encryptedId = this.route.snapshot.paramMap.get('id');
    if (encryptedId) {
      const userId = this.decryptId(encryptedId);
      this.buscarUsuarioPorId(+userId);
    }
    this.loadUser();
  }

  buscarUsuarioPorId(id: number) {
    this.userService.getUserById(id).subscribe(
      (usuario) => {
        if (usuario && usuario.role && usuario.role.roleEnum) {
          this.usuarioActual = { ...usuario, id: usuario.id };
          this.usuarioForm.patchValue({
            firstName: usuario.firstName,
            secondName: usuario.secondName,
            firstLastName: usuario.firstLastName,
            secondLastName: usuario.secondLastName,
            email: usuario.email,
            phone: usuario.phone,
            roleListName: usuario.role.roleEnum,
            isActivated: usuario.isActivated
          });
          this.mostrarInformacionUsuario = true;
        } else {
          this.mostrarAlerta('Error en la respuesta', 'No se encontró un rol válido para el usuario.');
        }
      },
      (error) => {
        this.mostrarAlerta('Error', 'No se pudo obtener el usuario.');
      }
    );
  }

  loadUser() {
    const email = this.userService.getEmailFromToken();
    if (email) {
      this.userService.searchByEmail(email).subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario cargado:', this.user);
          this.cargarDirecciones();
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.errorMessage = 'Debes iniciar sesión para ver las direcciones.';
    }
  }

  filtrarPorUsuarioId(): Direccion[] {
    return this.direcciones.filter(direccion => direccion.usuarioIdUser === this.user.id);
  }

  cargarDirecciones() {
    if (!this.user) {
      this.direcciones = [];
      this.errorMessage = 'Debes iniciar sesión para ver las direcciones.';
      return;
    }

    this.direccionService.getAllDirecciones().subscribe(
      (data: Direccion[]) => {
        this.direcciones = this.filtrarPorUsuarioId();
        if (this.direcciones.length > 0) {
          this.selectedDireccion = this.direcciones[0];
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
    this.selectedDireccion = direccion;
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

  decryptId(encryptedId: string): string {
    const decoded = atob(encryptedId);
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(decoded.charCodeAt(i) - (i % 10));
    }
    return decrypted.replace(environment.secretKey, '');
  }

  mostrarAlerta(titulo: string, mensaje: string) {
    console.error(`${titulo}: ${mensaje}`);
  }
}
