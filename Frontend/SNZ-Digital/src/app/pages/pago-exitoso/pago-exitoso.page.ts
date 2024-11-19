import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PaykuService } from 'src/app/Service/PaykuService.service';
import { PedidoService } from 'src/app/Service/pedido.service';
import { Pedido } from 'src/models/pedido';

@Component({
    selector: 'app-pago-exitoso',
    templateUrl: './pago-exitoso.page.html',
    styleUrls: ['./pago-exitoso.page.scss'],
})
export class PagoExitosoPage implements OnInit {
    constructor(
        private paykuService: PaykuService,
        private pedidoService: PedidoService,
        private toastController: ToastController,
        private router: Router
    ) {}

    ngOnInit() {
        const transactionId = localStorage.getItem('transactionId');
        if (transactionId) {
            this.verificarEstadoPago(transactionId);
        } else {
            this.limpiarLocalStorage();
            this.presentToast('No se encontró el ID de transacción');
            this.router.navigate(['/pago-fallido']);
        }
    }

    async verificarEstadoPago(transactionId: string) {
        this.paykuService.checkTransactionStatus(transactionId).subscribe({
            next: async (response) => {
                const estado = response.message === 'Transacción aprobada' 
                    ? 'Pago Aprobado' 
                    : 'Pago Rechazado';
    
                // Crear el pedido independientemente del estado
                this.crearPedido(transactionId, estado);
    
                if (estado === 'Pago Aprobado') {
                    await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
                } else {
                    await this.presentToast('Pago rechazado. Por favor, verifica tu información.');
                    this.router.navigate(['/pago-fallido']);
                }
    
                localStorage.removeItem('transactionId');
            },
            error: async (error) => {
                console.warn('Error recibido al verificar estado:', error);
    
                // Manejo del error y creación del pedido
                if (error.error && error.error.error === 'Transacción rechazada') {
                    const estado = 'Pago Rechazado';
                    this.crearPedido(transactionId, estado);
                    await this.presentToast('Pago rechazado. Por favor, verifica tu información.');
                    this.router.navigate(['/pago-fallido']);
                } else {
                    await this.presentToast('Error inesperado al verificar la transacción.');
                    this.router.navigate(['/carrito']);
                }
    
                localStorage.removeItem('transactionId');
            },
        });
    }
    
    
    

    crearPedido(transactionId: string, estado: string) {
        console.log('Iniciando creación del pedido...');
        const pagoInfoString = localStorage.getItem('pagoInfo');
        if (!pagoInfoString) {
            this.presentToast('No se encontraron los datos del pedido en el localStorage');
            return;
        }
    
        const pagoInfo = JSON.parse(pagoInfoString);
        console.log('PagoInfo:', pagoInfo);
    
        const productos = pagoInfo.detalles.map((detalle: any) => ({
            productoId: detalle.productId || detalle.productid || detalle.productID,
            cantidad: detalle.cantidad || 0,
            precioUnitario: detalle.costoUnitario || detalle.costo_unitario || detalle.precioUnitario || 0,
            totalPrecio: detalle.costoTotal || detalle.costo_total || detalle.totalPrecio || 0,
        }));
    
        const pedido: Pedido = {
            usuarioId: pagoInfo.usuarioId || 0,
            comuna: pagoInfo.direccion?.comuna || 'Sin comuna',
            direccion: pagoInfo.direccion?.direccion || 'Sin dirección',
            detalle: 'Detalles del pedido',
            precio: pagoInfo.total || 0,
            cantidad: productos.reduce((total: number, producto: any) => total + producto.cantidad, 0),
            estado: estado,
            orderId: transactionId,
            currency: 'CLP',
            urlReturn: 'http://localhost:8100/pago-exitoso',
            urlNotify: 'http://localhost:8084/api/payku/response',
            productos: productos, // Cambiado a 'productos'
        };
    
        console.log('Payload validado para backend:', JSON.stringify(pedido, null, 2));
    
        this.pedidoService.createPedido(pedido).subscribe({
            next: async (nuevoPedido: Pedido) => {
                console.log('Pedido creado con éxito:', nuevoPedido);
                localStorage.removeItem('pagoInfo');
                await this.presentToast('Pedido creado con éxito. Gracias por tu compra.');
                this.router.navigate(['/confirmacion']);
            },
            error: async (error: any) => {
                console.error('Error al crear el pedido:', error);
                await this.presentToast('Hubo un problema al crear el pedido. Intenta nuevamente.');
            },
        });
    }

    
    

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

    limpiarLocalStorage() {
        localStorage.removeItem('transactionId');
        localStorage.removeItem('pagoInfo');
    }
}
