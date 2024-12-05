import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { FormBuilder, FormGroup } from '@angular/forms';


import { GuideService } from 'src/app/Service/guia.service';
import { Guia } from 'src/models/guia';
import { GuiaDetalleComponent } from 'src/app/components/guia-detalle/guia-detalle.component';


import { DireccionService } from 'src/app/Service/DireccionService.service';
import { Direccion } from 'src/models/direccion';
@Component({
  selector: 'app-maestro-guia',
  templateUrl: './maestro-guia.page.html',
  styleUrls: ['./maestro-guia.page.scss'],
})
export class MaestroGuiaPage implements OnInit {
  guias: Guia[] = [];
  errorMessage: string = '';
  toastMessage: string | null = null;
  toastColor: string = 'success';
  selectedGuia?: Guia;

  nuevoDetalle: string = ''; // Nueva variable para el detalle de la guía


  searchQuery: string = '';
  direcciones: Direccion[] = [];
  selectedDireccion?: Direccion;

  usuarioActual: any;
  guiaForm: FormGroup;
  mostrarInformacionUsuario: boolean = false;

  constructor(
    private guideService: GuideService,
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalController: ModalController // Inyectar ModalController
  ) {
    this.guiaForm = this.formBuilder.group({
      GuiaId: [''],
      detalle: [''],
   
    });
  }



  ngOnInit() {
    this.cargarGuias();
  }

  goToMenu() {
    this.router.navigate(['/maestro-guia']);
  }

  eliminarGuia(guiaId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta guía?')) {
      this.guideService.deleteGuia(guiaId).subscribe(
        () => {
          this.showToast('Guía eliminada con éxito.', 'success');
          this.cargarGuias(); // Actualizar la lista de guías
        },
        (error) => {
          console.error('Error al eliminar la guía', error);
          this.showToast('Hubo un problema al eliminar la guía.', 'danger');
        }
      );
    }
  }
  


  // Adaptado
  // Agregar este método para cargar el usuario al navegar
  ionViewWillEnter() {
    this.cargarGuias(); // Cargar direcciones cada vez que la vista entra
  }

  cargarGuias() {
    this.guideService.getAllGuides().subscribe(
      (data: Guia[]) => {
        this.guias = data;
        if (this.guias.length === 0) {
          this.errorMessage = 'No hay guias disponibles.';
        }
      },
      (error) => {
        console.error('Error al obtener las guias', error);
        this.errorMessage = 'Hubo un problema al cargar las guias. Por favor, intenta más tarde.';
      }
    );
  }

  async agregarNuevaGuia() {
    if (!this.nuevoDetalle.trim()) {
      this.showToast('El detalle de la guía no puede estar vacío.', 'warning');
      return;
    }

    const nuevaGuia: Guia = { guiaId: 0, detalle: this.nuevoDetalle };

    this.guideService.createGuide(nuevaGuia).subscribe(
      (response) => {
        this.showToast('Guía agregada con éxito.', 'success');
        this.nuevoDetalle = ''; // Limpiar el textarea
        this.cargarGuias(); // Actualizar la lista de guías
      },
      (error) => {
        console.error('Error al agregar la guía', error);
        this.showToast('Hubo un problema al agregar la guía.', 'danger');
      }
    );
  }

  seleccionarGuia(guia: Guia) {
    this.selectedGuia = guia;
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

  async editarGuia(guiaId: number) {
    const guia = this.guias.find(e => e.guiaId === guiaId);
    if (!guia) {
      return;
    }

    const modal = await this.modalController.create({
      component: GuiaDetalleComponent,
      componentProps: { guia: guia, isEditing: true }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && data.updatedGuia) {
      // Actualiza la dirección en la lista si fue editada
      const index = this.guias.findIndex(e => e.detalle === data.updatedGuia.GuiaId);
      if (index !== -1) {
        this.guias[index] = data.guia;
      }

      // Redirige al perfil después de guardar los cambios
      this.router.navigate(['/maestro-guias']);
    }
  }


}
