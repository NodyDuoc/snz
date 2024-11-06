export class PagoRequest {
    amount: string;
    currency: string;
    description: string;
    email: string;
    order: string;
    subject: string;

    constructor(amount: string, currency: string, description: string, email: string, order: string, subject: string) {
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.email = email;
        this.order = order;
        this.subject = subject;
    }
}
