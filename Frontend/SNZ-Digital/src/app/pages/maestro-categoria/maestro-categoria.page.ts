import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { Categoria } from 'src/models/categoria';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private toastController: ToastController,
    private router: Router // Importamos Router para navegación
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

  modificarCategoria(catId: number) {
    // Navega a la página de edición con el ID de la categoría
    this.router.navigate([`/maestro-categoria-editar`, catId]);
  }
  
  eliminarCategoria(catId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriaService.deleteCategoria(catId).subscribe(
        () => {
          this.showToast('Categoría eliminada con éxito.', 'success');
          this.cargarCategorias(); // Actualiza la lista de categorías
        },
        (error) => {
          console.error('Error al eliminar la categoría', error);
          this.showToast('Hubo un problema al eliminar la categoría.', 'danger');
        }
      );
    }
  }
}
