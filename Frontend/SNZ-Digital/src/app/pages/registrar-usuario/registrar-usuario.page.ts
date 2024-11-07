import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({}); // Inicializar como FormGroup vacío
  userData = {
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    password: '',
    phone: ''
  };
  errorMessage: string = ''; // Inicialización directa
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      phone: ['+', [Validators.required, Validators.pattern(/^\+?[0-9]*$/)]],
      authCreateRoleRequest: this.formBuilder.group({
        roleListName: [['USUARIO'], Validators.required] // Cambia a "USUARIO"
      }),
      isActivated: [true, Validators.required]
    });
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

  onRegister() {
    if (this.registerForm.invalid) {
      this.presentToast('Por favor, completa todos los campos requeridos correctamente.', 'danger');
      return;
    }
  
    const userData = this.registerForm.value; // Obtén los datos del formulario
    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log(response); // Imprime la respuesta para depurar
        // Ajusta la lógica según la respuesta
        if (response && response.status) {
          this.presentToast(response.message || 'Registro exitoso', 'success');
          this.router.navigate(['/login']); // Redirigir después del registro
        } else {
          this.errorMessage = response.message || 'No se pudo completar el registro';
          this.presentToast(this.errorMessage, 'danger');
        }
      },
      error: (error) => {
        console.error(error); // Imprime el error para depurar
        this.errorMessage = error.error?.message || 'Ocurrió un error durante el registro.';
        this.presentToast(this.errorMessage, 'danger');
      }
    });
  }
  
  

  onLogin() {
    this.router.navigate(['/login']);
  }

  onPhoneInput(event: any) {
    const inputValue = event.target.value;

    if (!inputValue.startsWith('+')) {
      event.target.value = '+' + inputValue.replace(/\D/g, '');
    } else {
      event.target.value = '+' + inputValue.slice(1).replace(/\D/g, '');
    }

    // Actualiza el valor del campo 'phone' en el formulario
    this.registerForm.controls['phone'].setValue(event.target.value);
  }
}
