export interface Pedido {
  pedidoId?: number;            // ID del pedido, generado por el backend
  usuarioId?: number;      // ID del usuario que realizó el pedido
  comuna?: string;              // Comuna de envío
  direccion?: string;           // Dirección de envío
  detalle?: string;             // Detalles adicionales del pedido
  precio?: number;              // Precio total del pedido
  cantidad?: number;            // Cantidad total de productos
  estado?: string;              // Estado del pedido (Ejemplo: "Pago exitoso", "Pendiente")
  orderId?: string;            // ID de la orden generada por el sistema de pago (opcional)
  currency?: string;           // Moneda del pedido (opcional, por defecto CLP)
  urlReturn?: string;          // URL de retorno después del pago (opcional)
  urlNotify?: string;          // URL para notificaciones del sistema de pago (opcional)
  productos?: {
    productoId?: number;
    cantidad?: number;
    precioUnitario?: number;
    totalPrecio?: number;
  }[]; // Arreglo de detalles del pedido
}
