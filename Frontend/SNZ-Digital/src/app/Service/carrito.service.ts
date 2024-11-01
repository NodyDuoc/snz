import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from 'src/models/carrito';
import { DetalleCarrito } from 'src/models/detalleCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoUrl = 'http://localhost:8084/api/carritos/getall';
  private detalleCarritoUrl = 'http://localhost:8084/api/detallecarritos/getall';

  constructor(private http: HttpClient) { }

  getAllCarritos(): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(this.carritoUrl);
  }

  getAllDetallesCarrito(): Observable<DetalleCarrito[]> {
    return this.http.get<DetalleCarrito[]>(this.detalleCarritoUrl);
  }
}
