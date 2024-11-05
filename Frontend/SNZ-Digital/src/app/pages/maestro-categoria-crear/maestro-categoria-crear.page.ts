import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/Service/DireccionService.service';
import { AuthService } from 'src/app/Service/auth.service';
import { Direccion } from 'src/models/direccion';

@Component({
  selector: 'app-maestro-categoria-crear',
  templateUrl: './maestro-categoria-crear.page.html',
  styleUrls: ['./maestro-categoria-crear.page.scss'],
})
export class MaestroCategoriaCrearPage implements OnInit {
  direccionForm!: FormGroup;
  userId!: number | null;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController,
    private direccionService: DireccionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchUserId();  // Llama a la función para obtener el userId al cargar la página
  }

  initializeForm() {
    this.direccionForm = this.formBuilder.group({
      comuna: ['', Validators.required],
      direccion: ['', Validators.required],
      detalle: [''],
      dirPrincipal: [false],
      usuarioIdUser: [null, Validators.required]
    });
  }

  fetchUserId() {
    const userEmail = this.authService.getEmailFromToken();
    if (userEmail) {
      this.authService.searchByEmail(userEmail).subscribe({
        next: (user) => {
          this.userId = user.id;  // Asigna el userId obtenido
          this.direccionForm.get('usuarioIdUser')?.setValue(this.userId); // Actualiza el formulario con userId
          console.log('User ID obtenido desde el email:', this.userId);
        },
        error: (error) => {
          console.error('Error al obtener el userId:', error);
          this.presentToast('Error al obtener el usuario. Intente nuevamente.', 'danger');
        }
      });
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  onSubmit() {
    if (this.direccionForm.invalid) {
      console.log('Formulario inválido. Campos y errores:', this.direccionForm.controls);
      console.log('Errores en el campo usuarioIdUser:', this.direccionForm.get('usuarioIdUser')?.errors);
      this.presentToast('Por favor, completa todos los campos obligatorios.', 'danger');
      return;
    }

    const direccionData: Direccion = this.direccionForm.value;
    console.log('Datos de la dirección a enviar:', direccionData);

    this.direccionService.createDireccion(direccionData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.presentToast('Dirección registrada exitosamente.', 'success');
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Error al crear dirección:', error);
        this.presentToast('Ocurrió un error al registrar la dirección.', 'danger');
      }
    });
  }
}
