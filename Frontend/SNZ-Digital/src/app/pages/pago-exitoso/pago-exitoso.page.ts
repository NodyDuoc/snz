import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PaykuService } from 'src/app/Service/PaykuService.service';
import { PedidoService } from 'src/app/Service/pedido.service';
import { CrearPedidoRequest } from 'src/models/CrearPedidoRequest';

@Component({
    selector: 'app-pago-exitoso',
    templateUrl: './pago-exitoso.page.html',
    styleUrls: ['./pago-exitoso.page.scss'],
})
export class PagoExitosoPage implements OnInit {
    constructor(
        private paykuService: PaykuService,
        private toastController: ToastController,
        private router: Router,
        private pedidoService: PedidoService, // Inyectar PedidoService

    ) {}

    ngOnInit() {
        const transactionId = localStorage.getItem('transactionId');
        if (transactionId) {
            this.verificarEstadoPago(transactionId);
        } else {
            this.presentToast('No se encontró el ID de transacción');
            this.router.navigate(['/carrito']);
        }
    }

        // Método para crear el pedido con el estado especificado
        crearPedido(estado: string) {
            const pedidoData = JSON.parse(localStorage.getItem('pedidoData') || '{}') as CrearPedidoRequest;
    
            if (pedidoData && pedidoData.usuarioId) {
                // Establece el estado del pedido basado en el resultado de la transacción
                pedidoData.estado = estado;
    
                this.pedidoService.crearPedido(pedidoData).subscribe({
                    next: async (pedidoResponse) => {
                        console.log('Pedido creado:', pedidoResponse);
                        await this.presentToast('Pedido creado exitosamente con estado: ' + estado);
    
                        // Limpiar el local storage después de crear el pedido
                        localStorage.removeItem('pedidoData');
                        localStorage.removeItem('transactionId');
    
                        // Redirige a la página de éxito final
                        this.router.navigate(['/pago-exitoso']);
                    },
                    error: async (error) => {
                        console.error('Error al crear el pedido:', error);
                        await this.presentToast('Hubo un error al crear el pedido');
                        this.router.navigate(['/pago-fallido']);
                    }
                });
            } else {
                console.warn('No se encontraron datos del pedido en el local storage');
                this.router.navigate(['/pago-fallido']);
            }
        }

        
        async verificarEstadoPago(transactionId: string) {
            let estadoPedido = 'Pendiente';
    
            this.paykuService.checkTransactionStatus(transactionId).subscribe({
                next: async (response) => {
                    if (response.message === 'Transacción aprobada') {
                        estadoPedido = 'Aprobado';
                        await this.presentToast('Pago aprobado. ¡Gracias por tu compra!');
                        localStorage.removeItem('transactionId'); // Eliminar el ID después de su uso

                    } else {
                        estadoPedido = 'Rechazado';
                        await this.presentToast('Pago rechazado. Por favor, intenta nuevamente.');
                        localStorage.removeItem('transactionId'); // Eliminar el ID después de su uso

                    }
    
                    // Crear el pedido en el backend con el estado determinado
                    this.crearPedido(estadoPedido);
                },
                error: async (error) => {
                    console.error('Error al verificar el estado de la transacción:', error);
                    estadoPedido = 'Rechazado';
                    await this.presentToast('Error al verificar el estado de la transacción. Creando pedido como rechazado.');
    
                    // Crear el pedido en el backend con estado "Rechazado" en caso de error
                    this.crearPedido(estadoPedido);
                }
            });
        }
  

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }
}
