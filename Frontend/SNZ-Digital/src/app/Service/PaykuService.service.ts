import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoRequest } from 'src/models/PagoRequest';

@Injectable({
  providedIn: 'root'
})
export class PaykuService {
  private baseUrl = 'http://localhost:8084/api/payku';

  constructor(private http: HttpClient) {}

  createTransaction(pagoRequest: PagoRequest): Observable<string> {
    // Accede directamente a la URL de create-transaction
    return this.http.post<string>(`${this.baseUrl}/create-transaction`, pagoRequest);
  }
}
