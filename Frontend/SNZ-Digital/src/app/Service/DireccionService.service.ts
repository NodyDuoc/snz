import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direccion } from 'src/models/direccion';  // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private baseUrl = 'http://localhost:8084/api/direcciones'; // URL base de la API

  constructor(private http: HttpClient) { }

  getAllDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.baseUrl}/getall`);
  }

  // Crear una nueva dirección
  createDireccion(direccion: Direccion): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, direccion);
  }

  updateDireccion(id: number, direccion: Direccion): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, direccion);
  }

  
}
