export interface Kardex {
    kardexId: number;
    fecha: Date;
    hora: string;
    entrada: number;
    salida: number;
    saldo: number;
    precioUnitario: number;
    precioActualizado: number;
    movimientoKarMovId: number;
    productoProductId: number;
  }
  