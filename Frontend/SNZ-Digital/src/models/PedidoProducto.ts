export interface PedidoProducto {
    id: number; // ID del detalle
    productoId: number; // ID del producto
    cantidad: number; // Cantidad del producto
    precioUnitario: number; // Precio unitario del producto
    totalPrecio: number; // Precio total por esta línea
  }
  