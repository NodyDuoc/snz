import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:8084/api/pedidos';

  constructor(private http: HttpClient) {}

  createPedido(pedido: Pedido): Observable<Pedido> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Pedido>(`${this.baseUrl}/crear`, pedido, { headers });
  }

  // Método para obtener todos los pedidos
  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}`);
  }

  // Método para obtener los pedidos de un usuario por ID
  getPedidosByUsuarioId(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  // Método para obtener los detalles de un pedido por ID
  getDetallesByPedidoId(pedidoId: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${pedidoId}/detalles`);
  }
  
  // Método para obtener un pedido por ID
  getPedidoById(pedidoId: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/get/${pedidoId}`);
  }
  
}