import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaService } from 'src/app/Service/categoria.service';

@Component({
  selector: 'app-maestro-categoria-crear',
  templateUrl: './maestro-categoria-crear.page.html',
  styleUrls: ['./maestro-categoria-crear.page.scss'],
})
export class MaestroCategoriaCrearPage implements OnInit {
  categoriaForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = 'assets/img/default.jpg'; // Imagen por defecto
  toastMessage: string | null = null;
  toastColor: string = 'success'; // Color por defecto para el toast
  imagenFile: File | null = null; // Archivo de la imagen seleccionada

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.categoriaForm = this.formBuilder.group({
      catName: ['', Validators.required], // Control para el nombre
      catDetalle: ['', Validators.required], // Control para la descripción
      imagen: [null] // Control para la imagen (opcional)
    });
  }
  

  onImageChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        this.imagenFile = file; // Guardar la imagen seleccionada
      } else {
        this.presentToast('Solo se permiten archivos JPG o PNG.', 'danger');
      }
    }
  }

  onSubmit() {
    if (this.categoriaForm.invalid) {
      this.presentToast('Por favor, completa todos los campos obligatorios.', 'danger');
      return;
    }
  
    const categoriaData = {
      catName: this.categoriaForm.value.catName,
      catDetalle: this.categoriaForm.value.catDetalle,
    };
  
    // Llamada al servicio para crear la categoría, pasando los tres argumentos
    this.categoriaService.createCategoria(
      categoriaData.catName,
      categoriaData.catDetalle,
      this.imagenFile // Pasar la imagen seleccionada como tercer argumento
    ).subscribe({
      next: (response) => {
        this.presentToast('Categoría registrada exitosamente.', 'success');
        this.router.navigate(['/maestro-categoria']).then(() => {
          window.location.reload(); // Forzar la recarga de la página
        })
      },
      error: () => {
        this.presentToast('Ocurrió un error al registrar la categoría.', 'danger');
      }
    });
  }
  

  resetForm() {
    this.categoriaForm.reset();
    this.imagePreview = 'assets/img/default.jpg'; // Restablecer imagen predeterminada
    this.imagenFile = null; // Limpiar archivo seleccionado
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
        this.imagenFile = file; // Guarda el archivo seleccionado
      } else {
        this.toastMessage = "Solo se permiten archivos JPG o PNG.";
        this.toastColor = 'danger';
        this.presentToast1();
      }
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

  async presentToast1() {
    const toast = await this.toastController.create({
      message: this.toastMessage || '',
      color: this.toastColor,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
