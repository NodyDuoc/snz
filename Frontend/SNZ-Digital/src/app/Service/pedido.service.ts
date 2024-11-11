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

  getAllPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/getall`);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

    // Método para crear un pedido con información de pago
    crearPedidoConPago(pedido: Pedido): Observable<Pedido> {
      return this.http.post<Pedido>(`${this.baseUrl}/crear-pedido-con-pago`, pedido, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      });
    }
  
    // Método para actualizar el estado de un pedido
    actualizarEstadoPedido(pedidoId: number, nuevoEstado: string): Observable<Pedido> {
      return this.http.put<Pedido>(`${this.baseUrl}/${pedidoId}/actualizar-estado`, null, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        params: { nuevoEstado }
      });
    }
    
    createPedido(pedido: Pedido): Observable<Pedido> {
      return this.http.post<Pedido>(`${this.baseUrl}/crear-pedido-con-pago`, pedido);
    }

}
