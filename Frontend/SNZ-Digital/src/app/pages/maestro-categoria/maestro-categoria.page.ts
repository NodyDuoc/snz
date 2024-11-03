import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { Categoria } from 'src/models/categoria';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-maestro-categoria',
  templateUrl: './maestro-categoria.page.html',
  styleUrls: ['./maestro-categoria.page.scss'],
})
export class MaestroCategoriaPage implements OnInit {
  categorias: Categoria[] = [];
  errorMessage: string = '';
  toastMessage: string | null = null;
  toastColor: string = 'success';

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
        if (this.categorias.length === 0) {
          this.errorMessage = 'No hay categorías disponibles.';
        }
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
        this.errorMessage = 'Hubo un problema al cargar las categorías. Por favor, intenta más tarde.';
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
