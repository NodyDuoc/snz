import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtiquetaProducto } from 'src/models/EtiquetaProducto';
import { Etiqueta } from 'src/models/etiqueta';
import { Producto } from 'src/models/producto';
import { EtiquetaProductoEnvio } from 'src/models/EtiquetaProductoEnvio';

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

  // Crear una nueva Etiqueta producto
  createEtiquetaProducto(productId: number, etiquetaId: number): Observable<any> {
    const etiqueta: EtiquetaProductoEnvio = {
      etiquetaId: etiquetaId,
      productId: productId,
    };
    return this.http.post(`${this.baseUrl}/create`, etiqueta);
  }
  

  updateEtiquetaProducto(id: number, etiqueta: EtiquetaProducto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, etiqueta);
  }

  deleteEtiquetaProducto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


  // Verificar si existe una relación entre etiqueta y producto
  verificarEtiquetaProducto(productId: number, etiquetaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar/${productId}/${etiquetaId}`);
  }

  // Eliminar una relación entre etiqueta y producto por IDs
  eliminarEtiquetaProducto(productId: number, etiquetaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${productId}/${etiquetaId}`);
  }

    // Obtener los productos detallados por etiquetaId
    getProductosDetalleByEtiquetaId(etiquetaId: number): Observable<Producto[]> {
      return this.http.get<Producto[]>(`${this.baseUrl}/etiqueta/${etiquetaId}/detalles`);
    }

    // Obtener las etiquetas detalladas por productId
    getEtiquetaDetallesByProductId(productId: number): Observable<Etiqueta[]> {
      return this.http.get<Etiqueta[]>(`${this.baseUrl}/producto/${productId}/detalles`);
    }
  
}

