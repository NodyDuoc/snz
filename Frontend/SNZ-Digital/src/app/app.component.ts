import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole: string | null = null;
  isLoggedIn:boolean=false;
  constructor(private authService: AuthService, private router: Router,private alertController: AlertController) {}
  ngOnInit() {
    this.getUserRole();
    this.checkTokenExpiration();
  }
  getUserRole() {
    this.isLoggedIn=this.authService.isAuthenticated()
    if (this.isLoggedIn) {
      this.userRole = this.authService.getRoleFromToken();
    }
    else{

    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sesión Expirada',
      message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
      buttons: [{
        text: 'OK',
        handler: () => {
          localStorage.removeItem('token');  // Eliminar el token del almacenamiento local
          this.router.navigate(['/login']).then(() => {
            window.location.reload();  // Redirigir a la página de login y recargar la aplicación
          });
        }
      }],
      backdropDismiss: false,  // Impide que se cierre al hacer clic fuera de la alerta
      cssClass: 'custom-alert',  // Clase personalizada para el estilo del mensaje
    });
  
    await alert.present();
  }
  
  checkTokenExpiration() {
    setInterval(() => {
      const token = localStorage.getItem('token');  // Verificar si hay un token en localStorage
      if (token && this.authService.isTokenExpired()) {  // Solo si hay un token y está expirado
        this.presentAlert();  // Mostrar alerta si el token ha expirado
      }
    }, 60000);  // Verificar cada 60 segundos
  }
  
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(() => {
      // Después de redirigir, recarga la página
      window.location.reload();
    });
  }

}
