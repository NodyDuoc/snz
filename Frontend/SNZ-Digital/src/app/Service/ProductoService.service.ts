import { Producto } from 'src/models/producto';   // Ajusta la ruta si es necesario
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  getProductById(productId: number) {
    return this.http.get<Producto>(`${this.baseUrl}/get/${productId}`);
  }
    private baseUrl = 'http://localhost:8084/api/productos'; // Asegúrate de definir baseUrl aquí
  
    constructor(private http: HttpClient) { }
  
    getAllProductos(): Observable<Producto[]> {
      return this.http.get<{ message: string; statusCode: number; data: Producto[] }>(`${this.baseUrl}/getall`).pipe(
        map(response => response.data),  // Mapea para devolver solo la propiedad 'data'
        catchError((error) => {
          console.error('Error al obtener productos', error);
          return throwError(error);
        })
      );
    }
    
    getProductosByCategoria(categoriaId: number): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${this.baseUrl}/categoria/${categoriaId}`);
  }

}
