import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/Service/ProductoService.service';
import { Producto } from 'src/models/producto';

@Component({
  selector: 'app-maestro-producto-editar',
  templateUrl: './maestro-producto-editar.page.html',
  styleUrls: ['./maestro-producto-editar.page.scss'],
})
export class MaestroProductoEditarPage implements OnInit {
  productoForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = 'assets/images/default.jpg';
  toastMessage: string | null = null;
  toastColor: string = 'success'; 
  imagenFile: File | null = null;
  isLoading: boolean = true;

  productId!: number;
  categoryId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener ambos parámetros de la URL
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;

    console.log('ID del producto recibido para edición:', this.productId);

    this.productoForm = this.formBuilder.group({
      productName: ['', Validators.required],
      descripcion: [''],
      status: [''],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      imagen: [''],
      marca: ['']
    });
    
    this.loadProducto();
  }

  loadProducto() {
    console.log('Cargando datos del producto con ID:', this.productId);
    
    this.productoService.getProductoById(this.productId).subscribe({
      next: (productoResponse) => {
        const producto = productoResponse.data;
        
        console.log('Producto cargado:', producto);
        
        this.productoForm.patchValue({
          productName: producto.productName,
          descripcion: producto.descripcion,
          status: producto.status,
          precio: producto.precio,
          marca: producto.marca,
        });

        this.imagePreview = producto.imagen ? `data:image/png;base64,${producto.imagen}` : 'assets/images/default.jpg';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.toastMessage = 'No se pudo cargar el producto';
        this.toastColor = 'danger';
        this.presentToast();
        this.isLoading = false;
      }
    });
  }
  
  onSubmit() {
    if (this.productoForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.productoForm.get('productName')?.value);
      formData.append('descripcion', this.productoForm.get('descripcion')?.value);
      formData.append('status', this.productoForm.get('status')?.value);
      formData.append('precio', this.productoForm.get('precio')?.value.toString());
      formData.append('marca', this.productoForm.get('marca')?.value);

      if (this.imagenFile) {
        formData.append('imagen', this.imagenFile);
      }

      console.log('Datos del producto a actualizar:', formData); // Para depuración
  
      this.productoService.updateProducto(this.productId, formData).subscribe(
        async (response) => {
          if (response && response.statusCode === 200) {
            this.toastMessage = "Producto actualizado exitosamente";
            this.toastColor = 'success';
            // Mostrar el toast y luego redirigir
            await this.presentToast();
  
            // Redirigir a la lista de productos y refrescar la página
            this.router.navigateByUrl('/maestro-producto', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/maestro-producto'], { queryParams: { refresh: 'true' } });
            });
          } else {
            this.toastMessage = response?.message || "No se pudo actualizar el producto.";
            this.toastColor = 'danger';
            this.presentToast();
          }
        },
        async (error) => {
          console.error('Error al actualizar el producto:', error);
          this.toastMessage = "Error al actualizar el producto.";
          this.toastColor = 'danger';
          await this.presentToast();
        }
      );
    }
  }

  validatePositiveNumber(controlName: string) {
    const control = this.productoForm.get(controlName);
    if (control && control.value < 0) {
      control.setErrors({ 'min': true });
    }
    console.log(`Validando campo ${controlName}, valor:`, control?.value);
  }

  preventNonNumericInput(event: KeyboardEvent) {
    if (!/[0-9.]/.test(event.key)) {
      event.preventDefault();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
          console.log('Vista previa de la imagen cargada');
        };
        reader.readAsDataURL(file);
        this.imagenFile = file;
      } else {
        this.toastMessage = "Solo se permiten archivos JPG o PNG.";
        this.toastColor = 'danger';
        this.presentToast();
      }
    }
  }

  async presentToast() {
    console.log('Mostrando toast con mensaje:', this.toastMessage);
    const toast = await this.toastController.create({
      message: this.toastMessage || '',
      color: this.toastColor,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
