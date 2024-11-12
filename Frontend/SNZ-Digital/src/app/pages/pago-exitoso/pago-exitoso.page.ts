import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { PaykuService } from 'src/app/Service/PaykuService.service';

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
    const transactionId = this.route.snapshot.queryParamMap.get('transactionId');
    if (transactionId) {
      this.verificarEstadoPago(transactionId);
    } else {
      this.presentToast('No se encontró el transactionId de la transacción');
      this.router.navigate(['/carrito']);
    }
  }

  verificarEstadoPago(transactionId: string) {
    this.paykuService.checkTransactionStatus(transactionId).subscribe({
      next: async (status: string) => {
        if (status.toLowerCase() === 'transacción aprobada') { // Verifica el mensaje
          await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
        } else {
          await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
          this.router.navigate(['/pago-fallido']);
        }
      },
      error: async (error: HttpErrorResponse) => {
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
