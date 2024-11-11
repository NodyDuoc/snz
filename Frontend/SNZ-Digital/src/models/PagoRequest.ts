export class PagoRequest {
  amount: string;
  currency: string;
  subject: string;
  email: string;
  order: string;
  urlreturn: string;
  urlnotify: string;
  direccion: string; // Nueva propiedad para la dirección

  constructor(
    amount: string,
    currency: string,
    subject: string,
    email: string,
    order: string,
    urlreturn: string,
    urlnotify: string,
    direccion: string // Agrega el parámetro direccion aquí
  ) {
    this.amount = amount;
    this.currency = currency;
    this.subject = subject;
    this.email = email;
    this.order = order;
    this.urlreturn = urlreturn;
    this.urlnotify = urlnotify;
    this.direccion = direccion; // Asigna el valor de direccion
  }
}
