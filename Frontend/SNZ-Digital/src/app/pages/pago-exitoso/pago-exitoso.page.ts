import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaykuService } from 'src/app/Service/PaykuService.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.page.html',
  styleUrls: ['./pago-exitoso.page.scss'],
})
export class PagoExitosoPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private paykuService: PaykuService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Verifica el estado del pago utilizando el token de la URL
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.verificarEstadoPago(token);
    } else {
      this.presentToast('No se encontró el token de transacción');
      this.router.navigate(['/carrito']); // Redirige al carrito si falta el token
    }
  }

  async verificarEstadoPago(token: string) {
    this.paykuService.checkTransactionStatus(token).subscribe({
      next: async (status) => {
        if (status === 'approved') {
          await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
        } else {
          await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
          this.router.navigate(['/pago-fallido']); // Redirige a la página de fallo si es rechazado
        }
      },
      error: async () => {
        await this.presentToast('Error al verificar el estado de la transacción.');
        this.router.navigate(['/pago-fallido']);
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
