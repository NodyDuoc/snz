import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;


  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {}

  login() {
    // Verificar si se han proporcionado correo electrónico y contraseña
    if (!this.email || !this.password) {
      // Mostrar mensaje de error si faltan correo electrónico o contraseña
      this.presentToast('Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Enviar solicitud de inicio de sesión al servicio
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Manejar la respuesta del servicio (por ejemplo, guardar el token)
        const token = response.jwt;  // Accede al token usando 'response.jwt'
        if (token) {
          localStorage.setItem('token', token);
          
          this.isLoggedIn = this.authService.isAuthenticated();
    
          if (this.isLoggedIn) {
            const userRole = this.authService.getRoleFromToken();
            
            if (userRole === 'ADMINISTRADOR') {
              this.presentToast('Usuario administrador logeado exitosamente');
              this.router.navigate(['/admin']); // Redirige a la vista de administrador
            } else if (userRole === 'EJECUTIVO') {
              this.presentToast('Usuario ejecutivo logeado exitosamente');
              this.router.navigate(['/ejecutivo']); // Redirige a la vista de ejecutivo
            } else {
              this.presentToast('Rol no reconocido. Acceso denegado.');
            }
    
            window.location.reload();
          }
        } else {
          console.error("Token no recibido.");
        }
      },
      (error) => {
        // Manejar errores de inicio de sesión (por ejemplo, mostrar mensaje de error)
        if (error.status === 401) {
          this.presentToast('Credenciales incorrectas. Por favor, verifica tu correo electrónico y contraseña.');
        } else {
          this.presentToast('Error en el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    );
    
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}


