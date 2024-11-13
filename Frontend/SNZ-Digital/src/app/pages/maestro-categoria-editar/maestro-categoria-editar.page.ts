import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { Categoria } from 'src/models/categoria';

@Component({
  selector: 'app-maestro-categoria-editar',
  templateUrl: './maestro-categoria-editar.page.html',
  styleUrls: ['./maestro-categoria-editar.page.scss'],
})
export class MaestroCategoriaEditarPage implements OnInit {
  categoriaForm: FormGroup;
  imagePreview: string | null = null;
  toastMessage: string | null = null;
  toastColor: string = 'success';
  categoriaId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.formBuilder.group({
      catName: ['', Validators.required],
      catDetalle: ['', Validators.required],
      status: [1, Validators.required],
    });
  }

  ngOnInit() {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoriaId) {
      this.cargarCategoria();
    }
  }

  cargarCategoria() {
    this.categoriaService.getCategoriaById(this.categoriaId).subscribe(
      (categoria: Categoria) => {
        this.categoriaForm.patchValue({
          catName: categoria.catName,
          catDetalle: categoria.catDetalle,
          status: categoria.status,
        });

        if (categoria.imagen) {
          this.imagePreview = 'data:image/png;base64,' + categoria.imagen;
        }
      },
      (error) => {
        console.error('Error al cargar la categoría', error);
        this.showToast('Error al cargar la categoría', 'danger');
      }
    );
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onSubmit() {
    if (this.categoriaForm.invalid) {
      return;
    }
  
    const categoria: Categoria = {
      catId: this.categoriaId,
      catName: this.categoriaForm.value.catName,
      catDetalle: this.categoriaForm.value.catDetalle,
      imagen: this.imagePreview ? this.imagePreview.split(',')[1] : undefined,
      status: this.categoriaForm.value.status ? 1 : 0,
    };
  
    this.categoriaService.updateCategoria(this.categoriaId, categoria).subscribe(
      async () => {
        this.showToast('Categoría actualizada con éxito', 'success');
        // Recargar la página de categorías
        this.router.navigate(['/maestro-categoria']).then(() => {
          window.location.reload(); // Forzar la recarga de la página
        });
      },
      (error) => {
        console.error('Error al actualizar la categoría', error);
        this.showToast('Error al actualizar la categoría', 'danger');
      }
    );
  }
  
  
  

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
