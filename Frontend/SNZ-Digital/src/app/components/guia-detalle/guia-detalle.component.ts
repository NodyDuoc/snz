import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { GuideService } from 'src/app/Service/guia.service';
import { Guia } from 'src/models/guia';

@Component({
  selector: 'app-guia-detalle',
  templateUrl: './guia-detalle.component.html',
  styleUrls: ['./guia-detalle.component.scss'],
})
export class GuiaDetalleComponent {
  @Input() guia: Guia | undefined;
  @Input() isEditing: boolean = false;

  constructor(
    private guideService: GuideService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async saveChanges() {
    if (this.guia && this.guia.guiaId) {
      this.guideService.updateGuia(this.guia.guiaId, this.guia).subscribe(
        async (response: any) => { 
          console.log('Guia actualizada con éxito:', response);
          await this.showToast('Guia actualizada con éxito', 'success');
          this.modalController.dismiss({ updatedEtiqueta: response });
        },
        (error: any) => {
          console.error('Error al actualizar la guia:', error);
          
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
