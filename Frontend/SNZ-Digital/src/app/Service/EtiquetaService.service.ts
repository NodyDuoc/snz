import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etiqueta } from 'src/models/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  private baseUrl = 'http://localhost:8084/api/etiquetas';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las etiquetas
  getAllEtiquetas(): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(`${this.baseUrl}/getall`);
  }

  // Obtener una etiqueta por ID
  getEtiquetaById(id: number): Observable<Etiqueta> {
    return this.http.get<Etiqueta>(`${this.baseUrl}/get/${id}`);
  }

  // Crear una nueva dirección
  createEtiqueta(etiqueta: Etiqueta): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, etiqueta);
  }

  updateEtiqueta(id: number, etiqueta: Etiqueta): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, etiqueta);
  }

  deleteEtiqueta(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
