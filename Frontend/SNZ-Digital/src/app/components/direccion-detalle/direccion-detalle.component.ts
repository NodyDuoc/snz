import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/Service/DireccionService.service';
import { Direccion } from 'src/models/direccion';

@Component({
  selector: 'app-direccion-detalle',
  templateUrl: './direccion-detalle.component.html',
  styleUrls: ['./direccion-detalle.component.scss'],
})
export class DireccionDetalleComponent {
  @Input() direccion: Direccion | undefined;
  @Input() isEditing: boolean = false;

  constructor(
    private direccionService: DireccionService,
    private modalController: ModalController,
    private toastController: ToastController // Añadimos ToastController
  ) {}

  async saveChanges() {
    if (this.direccion && this.direccion.dirId) {
      this.direccionService.updateDireccion(this.direccion.dirId, this.direccion).subscribe(
        async response => {
          console.log('Dirección actualizada con éxito:', response);
          await this.showToast('Dirección actualizada con éxito', 'success'); // Muestra el toast de éxito
          this.modalController.dismiss({ updatedDireccion: response }); // Cierra el modal y envía la dirección actualizada
        },
        error => {
          console.error('Error al actualizar la dirección:', error);
        }
      );
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  close() {
    this.modalController.dismiss();
  }
}
