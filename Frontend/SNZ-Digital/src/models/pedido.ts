export interface Pedido {
  pedidoId: number;
  usuariosUserId: number;
  productoProductId: number;
  comuna: string;
  direccion: string;
  detalle: string;
  precio?: number;
  cantidad?: number;
  estado?: string;
}
 