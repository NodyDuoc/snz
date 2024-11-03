import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kardex } from 'src/models/kardex';

@Injectable({
  providedIn: 'root',
})
export class KardexService {
  private apiUrl = 'http://localhost:8084/api/kardex'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {}

  getAllKardex(): Observable<Kardex[]> {
    return this.http.get<Kardex[]>(`${this.apiUrl}/getall`);
  }
}
