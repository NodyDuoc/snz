import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtiquetaProducto } from 'src/models/EtiquetaProducto';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaProductoService {
  private baseUrl = 'http://localhost:8084/api/etiqueta_producto';  // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las relaciones entre etiquetas y productos
  getAllEtiquetaProductos(): Observable<EtiquetaProducto[]> {
    return this.http.get<EtiquetaProducto[]>(`${this.baseUrl}/getall`);
  }

  // Obtener una relación entre etiqueta y producto por ID
  getEtiquetaProductoById(id: number): Observable<EtiquetaProducto> {
    return this.http.get<EtiquetaProducto>(`${this.baseUrl}/get/${id}`);
  }
}
