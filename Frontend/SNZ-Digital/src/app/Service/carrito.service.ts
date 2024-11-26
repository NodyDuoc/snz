import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';
import { CarritoResponse } from '../../models/CarritoResponse';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = 'http://localhost:8084/api/carritos';
  private detalleCarritoUrl = 'http://localhost:8084/api/detallecarritos';

  constructor(private http: HttpClient) { }

  agregarAlCarrito(detalle: DetalleCarrito): Observable<any> {
    return this.http.post(`${this.detalleCarritoUrl}/create`, detalle);
  }

  // Obtener todos los carritos
  getAllCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.baseUrl}/getall`);
  }

  // Obtener todos los detalles del carrito
  getAllDetallesCarrito(): Observable<DetalleCarrito[]> {
    return this.http.get<DetalleCarrito[]>(`${this.detalleCarritoUrl}/getall`);
  }

  // Obtener un carrito por ID
  getCarritoById(id: number): Observable<CarritoResponse> {
    return this.http.get<CarritoResponse>(`${this.baseUrl}/get/${id}`);
  }

  // Crear un nuevo carrito
  createCarrito(carrito: Carrito): Observable<CarritoResponse> {
    return this.http.post<CarritoResponse>(`${this.baseUrl}/create`, carrito);
  }

  // Actualizar un carrito existente
  updateCarrito(id: number, carrito: Carrito): Observable<CarritoResponse> {
    return this.http.put<CarritoResponse>(`${this.baseUrl}/update/${id}`, carrito);
  }

  // Eliminar un carrito por ID
  deleteCarrito(id: number): Observable<CarritoResponse> {
    return this.http.delete<CarritoResponse>(`${this.baseUrl}/delete/${id}`);
  }

  // Actualizar un detalle del carrito (cantidad, por ejemplo)
  updateDetalleCarrito(idDetalleCarrito: number, detalle: Partial<DetalleCarrito>): Observable<DetalleCarrito> {
    return this.http.put<DetalleCarrito>(`${this.detalleCarritoUrl}/update/${idDetalleCarrito}`, detalle);
  }

  // Eliminar un detalle del carrito por ID
  deleteDetalleCarrito(idDetalleCarrito: number): Observable<void> {
    return this.http.delete<void>(`${this.detalleCarritoUrl}/delete/${idDetalleCarrito}`);
  }

  getDetallesCarritoByUser(userId: number): Observable<DetalleCarrito[]> {
    return this.http.get<DetalleCarrito[]>(`${this.detalleCarritoUrl}/getbyuser/${userId}`);
}

  
}
