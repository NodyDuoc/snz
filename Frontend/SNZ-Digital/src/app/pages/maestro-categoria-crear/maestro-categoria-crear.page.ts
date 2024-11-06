import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaService } from 'src/app/Service/categoria.service'; // Cambié a CategoriaService

@Component({
  selector: 'app-maestro-categoria-crear',
  templateUrl: './maestro-categoria-crear.page.html',
  styleUrls: ['./maestro-categoria-crear.page.scss'],
})
export class MaestroCategoriaCrearPage implements OnInit {
  categoriaForm!: FormGroup;
  selectedImage: File | null = null; // Variable para almacenar la imagen seleccionada

  // Definir las propiedades para el formulario
  catName: string = '';
  catDetalle: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private toastController: ToastController,
    private categoriaService: CategoriaService // Cambié a CategoriaService
  ) {}

  ngOnInit() {
    this.initializeForm();
    
  }

  initializeForm() {
    this.categoriaForm = this.formBuilder.group({
      catName: ['', Validators.required],
      catDetalle: ['', Validators.required],
      imagen: [null]  // Agregar imagen al formulario
    });
  }

  onImageChange(event: any) {
    // Captura la imagen seleccionada
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  onSubmit() {
    if (this.categoriaForm.invalid) {
      this.presentToast('Por favor, completa todos los campos obligatorios.', 'danger');
      return;
    }

    const { catName, catDetalle } = this.categoriaForm.value;

    // Llamada al servicio para crear la categoría, incluyendo la imagen
    this.categoriaService.createCategoria(catName, catDetalle, this.selectedImage).subscribe({
      next: (response) => {
        this.presentToast('Categoría registrada exitosamente.', 'success');
        this.router.navigate(['/perfil']); // Redirigir a perfil después de éxito
      },
      error: (error) => {
        this.presentToast('Ocurrió un error al registrar la categoría.', 'danger');
      }
    });
  }
}
