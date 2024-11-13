



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtiquetaService } from 'src/app/Service/EtiquetaService.service';
import { Etiqueta } from 'src/models/etiqueta';
import { EtiquetaDetalleComponent } from 'src/app/components/etiqueta-detalle/etiqueta-detalle.component';
import { DireccionDetalleComponent } from 'src/app/components/direccion-detalle/direccion-detalle.component';
import { DireccionService } from 'src/app/Service/DireccionService.service';
import { Direccion } from 'src/models/direccion';
@Component({
  selector: 'app-maestro-etiqueta',
  templateUrl: './maestro-etiqueta.page.html',
  styleUrls: ['./maestro-etiqueta.page.scss'],
})
export class MaestroEtiquetaPage implements OnInit {
  etiquetas: Etiqueta[] = [];
  errorMessage: string = '';
  toastMessage: string | null = null;
  toastColor: string = 'success';
  selectedEtiqueta?: Etiqueta;


  searchQuery: string = '';
  direcciones: Direccion[] = [];
  selectedDireccion?: Direccion;
 
  usuarioActual: any;
  usuarioForm: FormGroup;
  mostrarInformacionUsuario: boolean = false;

  constructor(
    private direccionService: DireccionService,
    private router: Router,
    private etiquetaService: EtiquetaService,
    private userService: AuthService,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalController: ModalController // Inyectar ModalController
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
    this.cargarEtiquetas();
  }

  goToMenu() {
    this.router.navigate(['/maestro-producto']);
  }
 

  // Adaptado
 // Agregar este método para cargar el usuario al navegar
 ionViewWillEnter() {
  this.cargarEtiquetas(); // Cargar direcciones cada vez que la vista entra
}

cargarEtiquetas() {
  this.etiquetaService.getAllEtiquetas().subscribe(
    (data: Etiqueta[]) => {
      this.etiquetas = data;
      if (this.etiquetas.length === 0) {
        this.errorMessage = 'No hay etiquetas disponibles.';
      }
    },
    (error) => {
      console.error('Error al obtener las etiquetas', error);
      this.errorMessage = 'Hubo un problema al cargar las etiquetas. Por favor, intenta más tarde.';
    }
  );
}



seleccionarEtiqueta(etiqueta: Etiqueta) {
  this.selectedEtiqueta = etiqueta;
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

navigateToCrearEtiqueta() {
  this.router.navigate(['/maestro-etiqueta-crear']);
}

async editarEtiqueta(etiquetaId: number) {
  const etiqueta = this.etiquetas.find(e => e.etiquetaId === etiquetaId);
  if (!etiqueta) {
    return;
  }

  const modal = await this.modalController.create({
    component: EtiquetaDetalleComponent,
    componentProps: { etiqueta: etiqueta, isEditing: true }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();
  if (data && data.updatedEtiqueta) {
    // Actualiza la dirección en la lista si fue editada
    const index = this.etiquetas.findIndex(e => e.detalleEtiqueta === data.updatedEtiqueta.dirId);
    if (index !== -1) {
      this.direcciones[index] = data.updatedDireccion;
    }
    
    // Redirige al perfil después de guardar los cambios
    this.router.navigate(['/maestro-etiqueta']);
  }
}


}
