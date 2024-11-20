import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';

@Component({
  selector: 'app-maestro-producto-crear',
  templateUrl: './maestro-producto-crear.page.html',
  styleUrls: ['./maestro-producto-crear.page.scss'],
})
export class MaestroProductoCrearPage implements OnInit {

  productoForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = 'assets/img/default.jpg'; // Imagen por defecto
  toastMessage: string | null = null;
  toastColor: string = 'success'; // Color por defecto para el toast
  imagenFile: File | null = null; 
  categoriaId!: number; // Variable para almacenar el id de la categoría

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

ngOnInit() {
    this.categoriaId = +this.route.snapshot.paramMap.get('categoryId')!;
    console.log('ID de la categoría recibida:', this.categoriaId);

    this.productoForm = this.formBuilder.group({
      productName: ['', Validators.required],
      descripcion: [''],
      status: [''],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      imagen: [''],
      marca: [''] // Campo de marca
    });
}


  onSubmit() {
    if (this.productoForm.valid) {
      // Asignar el id de la categoría al objeto productoData
      const productoData: Producto = {
        ...this.productoForm.value,
        categoriaCatId: this.categoriaId // Asegúrate de que `categoriaId` esté inicializado en ngOnInit()
      };
  
      console.log('Datos del producto a enviar:', productoData); // Log para verificar datos antes de enviar
  
      // Elimina el campo 'imagen' del productoData, ya que se enviará como archivo aparte
      delete productoData.imagen;
  
      // Llamada al servicio para crear el producto
      this.productoService.createProducto(productoData, this.imagenFile).subscribe(
        async (response) => {
          console.log('Respuesta del servidor:', response); // Log para verificar respuesta del servidor
          if (response && response.statusCode === 201) { // Verifica el estado de éxito con statusCode
            this.toastMessage = response.message || "Producto creado exitosamente";
            this.toastColor = 'success';
  
            // Mostrar el toast y luego redirigir
            await this.presentToast();
  
            // Redirigir a la lista de productos y refrescar la página
            this.router.navigateByUrl('/maestro-producto', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/maestro-producto'], { queryParams: { refresh: true } });
            });
  
            // Resetear el formulario e imagen solo en caso de éxito
            this.productoForm.reset();
            this.imagePreview = 'assets/img/default.jpg'; // Establecer imagen predeterminada
            this.imagenFile = null;
          } else {
            this.toastMessage = response?.message || "No se pudo crear el producto.";
            this.toastColor = 'danger';
            this.presentToast();
          }
        },
        async (error) => {
          console.error('Error al crear el producto:', error);
          this.toastMessage = "Error al crear el producto. Verifique los campos.";
          this.toastColor = 'danger';
          await this.presentToast();
        }
      );
    }
  }
  
  
  
  
  validatePositiveNumber(controlName: string) {
    const control = this.productoForm.get(controlName);
    if (control) {
      if (control.value < 0) {
        control.setErrors({ 'min': true });
      } else {
        control.setErrors(null);
      }
    }
  }

  preventNonNumericInput(event: KeyboardEvent) {
    if (!/[0-9.]/.test(event.key)) {
      event.preventDefault();
    }
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
        this.presentToast();
      }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.toastMessage || '',
      color: this.toastColor,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
