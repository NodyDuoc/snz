import { Component } from '@angular/core';
import { PaykuService } from '../../Service/PaykuService.service';
import { PagoRequest, PagoResponse } from '../../../models/pago';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent {
  pagoRequest: PagoRequest = { amount: '1000', currency: 'CLP', description: 'Pago Test' };
  pagoResponse: PagoResponse | null = null;

  constructor(private paykuService: PaykuService) {}

  generarPago(): void {
    this.paykuService.generarPago(this.pagoRequest).subscribe(response => {
      this.pagoResponse = response;
      window.location.href = response.paymentUrl; // Redirige a la URL de pago
    });
  }
}