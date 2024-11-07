export interface EtiquetaProducto {
    etiquetaProductoId: number;  // ID único para la relación entre la etiqueta y el producto
    etiquetaId: number;          // ID de la etiqueta
    productId: number;          // ID del producto al que se asigna la etiqueta
}
