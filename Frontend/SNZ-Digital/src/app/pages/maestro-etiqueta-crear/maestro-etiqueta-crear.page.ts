import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EtiquetaService } from 'src/app/Service/EtiquetaService.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-maestro-etiqueta-crear',
  templateUrl: './maestro-etiqueta-crear.page.html',
  styleUrls: ['./maestro-etiqueta-crear.page.scss'],
})
export class MaestroEtiquetaCrearPage implements OnInit {
  etiquetaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController,
    private etiquetaService: EtiquetaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.etiquetaForm = this.formBuilder.group({
      etiquetaId: [null],              // El ID se puede dejar como nulo por defecto, ya que probablemente se asignará al crear
      nombreEtiqueta: ['', Validators.required],  // Nombre de la etiqueta (requerido)
      detalleEtiqueta: ['']           // Descripción de la etiqueta (opcional)
    });
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
    if (this.etiquetaForm.invalid) {
      console.log('Formulario inválido. Campos y errores:', this.etiquetaForm.controls);
      this.presentToast('Por favor, completa todos los campos obligatorios.', 'danger');
      return;
    }

    const etiquetaData = this.etiquetaForm.value;
    console.log('Datos de la etiqueta a enviar:', etiquetaData);

    this.etiquetaService.createEtiqueta(etiquetaData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.presentToast('Etiqueta registrada exitosamente.', 'success');
        this.router.navigate(['/maestro-etiqueta']);
      },
      error: (error) => {
        console.error('Error al crear etiqueta:', error);
        this.presentToast('Ocurrió un error al registrar la etiqueta.', 'danger');
      }
    });
  }
}
