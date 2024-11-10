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

  // Cambia el tipo de retorno a Observable<{ url: string }>
  createTransaction(pagoRequest: PagoRequest): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(`${this.baseUrl}/create-transaction`, pagoRequest);
  }

  // Cambia el tipo de retorno de checkTransactionStatus a Observable<string>
  checkTransactionStatus(token: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/checkTransactionStatus?token=${token}`);
  }

}
