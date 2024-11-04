import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaykuService {
  private baseUrl = 'https://api.payku.cl'; // Reemplaza con la URL correcta de la API de Payku
  private token = 'tkpuc6e0409e96c56484f33569329480'; // Asegúrate de tener tu token de API

  constructor(private http: HttpClient) {}

  iniciarPago(monto: number, descripcion: string): Observable<any> {
    const url = `${this.baseUrl}/pagos`; 
    const body = { monto, descripcion };

    return this.http.post(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
