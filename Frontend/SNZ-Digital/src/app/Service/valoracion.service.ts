// src/app/Service/ValoracionService.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valoracion } from 'src/models/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private baseUrl = 'http://localhost:8084/api/valoraciones';

  constructor(private http: HttpClient) {}

  // Obtener todas las valoraciones de un producto específico
  getValoracionesByProductoId(productoId: number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.baseUrl}/getall`);
  }
}
