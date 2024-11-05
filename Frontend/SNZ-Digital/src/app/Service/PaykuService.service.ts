import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoRequest } from 'src/models/PagoRequest';
import { PagoResponse } from 'src/models/pago';

@Injectable({
  providedIn: 'root'
})
export class PaykuService {
  private apiUrl = 'http://localhost:8084/api/payku';

  constructor(private http: HttpClient) {}

  generarPago(pagoRequest: PagoRequest): Observable<PagoResponse> {
    return this.http.post<PagoResponse>(`${this.apiUrl}/pago`, pagoRequest);
  }
}
