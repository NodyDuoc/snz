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

  constructor(private http: HttpClient) { }

  // Obtener valoraciones para un producto específico
  getValoracionesByProductoId(productoId: number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.baseUrl}/producto/${productoId}`);
  }

  // Crear una nueva valoración
  createValoracion(valoracion: Valoracion): Observable<Valoracion> {
    return this.http.post<Valoracion>(`${this.baseUrl}/create`, valoracion);
  }

  // Actualizar valoración existente
  updateValoracion(id: number, valoracion: Valoracion): Observable<Valoracion> {
    return this.http.put<Valoracion>(`${this.baseUrl}/update/${id}`, valoracion);
  }

  // src/app/Service/ValoracionService.service.ts
  deleteValoracion(valoracionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${valoracionId}`);
  }
}
