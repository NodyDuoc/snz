import { Component, OnInit } from '@angular/core';
import { PaykuService } from 'src/app/Service/PaykuService.service'; // Asegúrate de tener el servicio Payku configurado
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-test',
  templateUrl: './pago-test.page.html',
  styleUrls: ['./pago-test.page.scss'],
})
export class PagoTestPage implements OnInit {
  montoPago: number = 0;
  descripcionPago: string = '';

  constructor(private paykuService: PaykuService, private router: Router) {}

  ngOnInit(): void {}

  iniciarPago(): void {
    // Validar que el monto y la descripción estén completos
    if (this.montoPago <= 0 || !this.descripcionPago.trim()) {
      console.error('Por favor ingresa un monto y descripción válidos.');
      return;
    }

    // Llamar al servicio para iniciar el pago en Payku
    this.paykuService.iniciarPago(this.montoPago, this.descripcionPago).subscribe({
      next: (data: any) => {  
        if (data.url) {
          // Redirigir a la URL de pago proporcionada por Payku
          window.location.href = data.url;
        } else {
          console.error('No se recibió URL de pago.');
        }
      },
      error: (error) => {
        console.error('Error al iniciar el pago:', error);
      },
    });
  }
}
