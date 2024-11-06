export interface DetalleCarrito {
    idDetalleCarrito: number;
    usuarioIdUser: number;  // Cambiado de idCarrito a usuarioIdUser
    productId: number;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    productName?: string;  // Propiedad opcional para el nombre del producto
    imagen?: string;  // Propiedad opcional para la imagen del producto
}