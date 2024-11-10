// src/models/CarritoResponse.ts
export interface CarritoResponse {
    idCarrito: number | null;    // Puede ser null si se eliminó el carrito
    usuarioIdUser: number | null; // Puede ser null si no es relevante en algunas respuestas
    mensaje: string;              // Mensaje descriptivo de la operación
    exitoso: boolean;             // Indica si la operación fue exitosa o no
  }
  