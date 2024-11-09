import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EtiquetaService } from 'src/app/Service/EtiquetaService.service';
import { Etiqueta } from 'src/models/etiqueta';

@Component({
  selector: 'app-etiqueta-detalle',
  templateUrl: './etiqueta-detalle.component.html',
  styleUrls: ['./etiqueta-detalle.component.scss'],
})
export class EtiquetaDetalleComponent {
  @Input() etiqueta: Etiqueta | undefined;
  @Input() isEditing: boolean = false;

  constructor(
    private etiquetaService: EtiquetaService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async saveChanges() {
    if (this.etiqueta && this.etiqueta.etiquetaId) {
      this.etiquetaService.updateEtiqueta(this.etiqueta.etiquetaId, this.etiqueta).subscribe(
        async response => {
          console.log('Etiqueta actualizada con éxito:', response);
          await this.showToast('Etiqueta actualizada con éxito', 'success');
          this.modalController.dismiss({ updatedEtiqueta: response });
        },
        error => {
          console.error('Error al actualizar la etiqueta:', error);
          
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
