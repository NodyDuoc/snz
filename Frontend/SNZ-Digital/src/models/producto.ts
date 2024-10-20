export interface Producto {
    productId?: number;        // El ID puede ser opcional
    productName: string;       // Nombre del producto
    descripcion?: string;      // Descripción opcional
    precio: number;            // Precio del producto
    categoriaCatId: number;    // ID de la categoría
  }
  