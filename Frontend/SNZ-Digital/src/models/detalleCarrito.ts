export interface DetalleCarrito {
    idDetalleCarrito: number;
    idCarrito: number;
    productId: number;
    cantidad: number;
    costoUnitario: number;
    costoTotal: number;
    productName?: string;  // Agrega esta propiedad opcional
    imagen?: string;  // Asegúrate de agregar esta línea

}
