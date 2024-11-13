import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PaykuService } from 'src/app/Service/PaykuService.service';

@Component({
    selector: 'app-pago-exitoso',
    templateUrl: './pago-exitoso.page.html',
    styleUrls: ['./pago-exitoso.page.scss'],
})
export class PagoExitosoPage implements OnInit {
    constructor(
        private paykuService: PaykuService,
        private toastController: ToastController,
        private router: Router
    ) {}

    ngOnInit() {
        const transactionId = localStorage.getItem('transactionId');
        if (transactionId) {
            this.verificarEstadoPago(transactionId);
        } else {
            this.presentToast('No se encontró el ID de transacción');
            this.router.navigate(['/carrito']);
        }
    }

    async verificarEstadoPago(transactionId: string) {
      this.paykuService.checkTransactionStatus(transactionId).subscribe({
          next: async (response) => {
              if (response.message === 'Transacción aprobada') {
                  await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
                  localStorage.removeItem('transactionId'); // Eliminar el ID después de su uso
                  this.router.navigate(['/pago-exitoso']);
              } else {
                  await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
                  localStorage.removeItem('transactionId'); // Eliminar el ID después de su uso
                  this.router.navigate(['/pago-fallido']);
              }
          },
          error: async (error) => {
              console.error('Error al verificar el estado de la transacción:', error);
              await this.presentToast('Error al verificar el estado de la transacción.');
              localStorage.removeItem('transactionId'); // Eliminar el ID después de su uso
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
