import { Component, OnInit } from '@angular/core';
import { EtiquetaService } from 'src/app/Service/EtiquetaService.service';
import { Etiqueta } from 'src/models/etiqueta';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private etiquetaService: EtiquetaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarEtiquetas();
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

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
