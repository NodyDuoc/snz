import { Direccion } from 'src/models/direccion'; // Asegúrate de ajustar la ruta si es necesario
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private baseUrl = 'http://localhost:8084/api/direcciones'; // Asegúrate de definir baseUrl aquí

  constructor(private http: HttpClient) { }

  getAllDirecciones(): Observable<Direccion[]> {
    return this.http.get<{ message: string; statusCode: number; data: Direccion[] }>(`${this.baseUrl}/getall`).pipe(
      map(response => response.data),  // Mapea para devolver solo la propiedad 'data'
      catchError((error) => {
        console.error('Error al obtener direcciones', error);
        return throwError(error);
      })
    );
  }

  getDireccionById(direccionId: number): Observable<Direccion> {
    return this.http.get<Direccion>(`${this.baseUrl}/get/${direccionId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener la dirección', error);
        return throwError(error);
      })
    );
  }
}
