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

    // Método para obtener productos por categoría
    getProductosByCategoriaPaginado(categoriaCatId: number, page: number = 0, size: number = 5): Observable<Producto> {
      // Configurar los parámetros de la solicitud
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      // Corregir la URL para incluir la categoría
      return this.http.get<Producto>(`${this.baseUrl}/categoria/${categoriaCatId}`, { params });
    }

      // Método para obtener un producto por ID
  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`); // Ajusta la URL según tu API
  }
}
