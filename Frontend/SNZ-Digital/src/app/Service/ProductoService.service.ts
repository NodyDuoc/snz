import { Producto } from 'src/models/producto';   // Ajusta la ruta si es necesario
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
    private baseUrl = 'http://localhost:8084/api/productos'; // Asegúrate de definir baseUrl aquí
  
    constructor(private http: HttpClient) { }
  
    getAllProductos(): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${this.baseUrl}/getall`);
    }

}