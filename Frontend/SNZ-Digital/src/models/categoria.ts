// src/app/models/categoria.model.ts
export interface Categoria {
    catId: number;
    catName: string;
    catDetalle: string;
    imagen?: string; // Si decides manejar la imagen como URL o base64
    status: number; // 1 para activo, 0 para inactivo

}
