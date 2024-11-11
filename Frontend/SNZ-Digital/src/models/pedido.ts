export interface Pedido {
  pedidoId: number;
  usuariosUserId: number;
  productoProductId: number[]; // Si tienes productos como array de IDs
  comuna: string;
  direccion: string;
  detalle: string;
  precio: number;
  cantidad: number;
  estado: string;
  orderId?: string;     // Agregar esta propiedad
  currency?: string;    // Agregar esta propiedad
  urlReturn?: string;   // Agregar esta propiedad
  urlNotify?: string;   // Agregar esta propiedad
}
