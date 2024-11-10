export class PagoRequest {
    amount: string;
    currency: string;
    subject: string;
    email: string;
    order: string;
    urlreturn: string; // Añadir esta propiedad
    urlnotify: string; // Añadir esta propiedad
  
    constructor(
      amount: string,
      currency: string,
      subject: string,
      email: string,
      order: string,
      urlreturn: string,
      urlnotify: string
    ) {
      this.amount = amount;
      this.currency = currency;
      this.subject = subject;
      this.email = email;
      this.order = order;
      this.urlreturn = urlreturn;
      this.urlnotify = urlnotify;
    }
  }
  