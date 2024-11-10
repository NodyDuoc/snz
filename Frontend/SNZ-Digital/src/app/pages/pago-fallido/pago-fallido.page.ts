import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  templateUrl: './pago-fallido.page.html',
  styleUrls: ['./pago-fallido.page.scss'],
})
export class PagoFallidoPage {

  constructor(private router: Router) {}

  reintentarPago() {
    this.router.navigate(['/carrito']); // Aquí puedes redirigir de nuevo al flujo de pago si así lo deseas
  }

  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }
}
