export interface CrearPedidoRequest {
    usuarioId: number;
    comuna: string;
    direccion: string;
    detalle: string;
    productoIds: number[];
    cantidades: number[];
    precio: number;
    currency: string;
    estado: string;
    urlReturn: string;
    urlNotify: string;
  }
  