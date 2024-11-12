import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoRequest } from 'src/models/PagoRequest';

export interface PaykuResponse {
  url: string;
  id: string; // Cambiado de token a id
}

@Injectable({
  providedIn: 'root'
})
export class PaykuService {
  private baseUrl = 'http://localhost:8084/api/payku';

  constructor(private http: HttpClient) {}

  createTransaction(pagoRequest: PagoRequest): Observable<PaykuResponse> {
    return this.http.post<PaykuResponse>(`${this.baseUrl}/create-transaction`, pagoRequest);
  }

  checkTransactionStatus(transactionId: string): Observable<any> {
    const url = `${this.baseUrl}/response`;
    return this.http.post<any>(url, { token: transactionId }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
