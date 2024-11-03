import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { KardexService } from 'src/app/Service/KardexService.service';
import { Kardex } from 'src/models/kardex';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.page.html',
  styleUrls: ['./kardex.page.scss'],
})
export class KardexPage implements OnInit {
  kardexRecords: Kardex[] = [];
  errorMessage: string = '';
  toastMessage: string | null = null;
  toastColor: string = 'success';

  constructor(
    private kardexService: KardexService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarKardex();
  }

  cargarKardex() {
    this.kardexService.getAllKardex().subscribe(
      (data: Kardex[]) => {
        this.kardexRecords = data;
        if (this.kardexRecords.length === 0) {
          this.errorMessage = 'No hay registros de kardex disponibles.';
        }
      },
      (error) => {
        console.error('Error al obtener los registros de kardex', error);
        this.errorMessage = 'Hubo un problema al cargar los registros de kardex. Por favor, intenta más tarde.';
      }
    );
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
}
