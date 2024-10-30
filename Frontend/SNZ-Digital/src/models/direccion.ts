export interface Direccion {
    dirId?: number;           // El ID puede ser opcional
    comuna: string;           // Comuna es obligatorio
    direccion: string;        // Dirección es obligatorio
    detalle?: string;         // Detalle es opcional
    dirPrincipal: boolean;    // Es principal, obligatorio
    usuarioIdUser: number;    // ID del usuario, obligatorio
}