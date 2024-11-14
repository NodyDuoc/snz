import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.page.html',
  styleUrls: ['./preguntas-frecuentes.page.scss'],
})
export class PreguntasFrecuentesPage{
  preguntas = [
    {
      titulo: '1. ¿Cómo puedo realizar un pedido?',
      respuesta: 'Para realizar un pedido, simplemente selecciona el producto que deseas, agrégalo al carrito de compras y sigue el proceso de pago. Una vez completado el pago, recibirás una confirmación en tu correo electrónico.',
      expand: false
    },
    {
      titulo: '2. ¿Cuánto tiempo tarda en llegar mi pedido?',
      respuesta: 'Los tiempos de entrega dependen de tu ubicación y del método de envío seleccionado. Generalmente, los envíos dentro de Santiago tardan entre 1 y 3 días hábiles, mientras que a otras regiones pueden tomar de 3 a 7 días hábiles.',
      expand: false
    },
    {
      titulo: '3. ¿Puedo hacer seguimiento a mi pedido?',
      respuesta: 'Sí, una vez que tu pedido ha sido despachado, recibirás un número de seguimiento en tu correo electrónico para que puedas rastrear tu paquete en todo momento.',
      expand: false
    },
    {
      titulo: '4. ¿Ofrecen garantía en los productos?',
      respuesta: 'Sí, todos nuestros productos cuentan con una garantía que cubre defectos de fábrica. La duración de la garantía depende del producto y el fabricante, pero normalmente es de 6 a 12 meses.',
      expand: false
    },
    {
      titulo: '5. ¿Qué hago si el producto llega dañado o no funciona correctamente?',
      respuesta: 'Si tu producto llega dañado o presenta fallas, contáctanos de inmediato a contacto@snzdigital.cl o por teléfono al +56 2 9876 5432. Nuestro equipo te guiará en el proceso de devolución o cambio.',
      expand: false
    },
    {
      titulo: '6. ¿Puedo cambiar o devolver un producto?',
      respuesta: 'Sí, puedes realizar cambios o devoluciones dentro de los primeros 10 días después de recibir el producto. El producto debe estar en su empaque original, sin uso y en perfectas condiciones. Consulta nuestras políticas de devolución para más detalles.',
      expand: false
    },
    {
      titulo: '7. ¿Qué métodos de pago aceptan?',
      respuesta: 'Aceptamos diversas formas de pago, incluidas tarjetas de crédito, débito, transferencias bancarias y pagos mediante plataformas electrónicas como MercadoPago y WebPay.',
      expand: false
    },
    {
      titulo: '8. ¿Puedo modificar o cancelar mi pedido?',
      respuesta: 'Si deseas modificar o cancelar tu pedido, contáctanos lo antes posible. Una vez que el pedido ha sido despachado, no es posible realizar cambios, pero te ayudaremos en lo que necesites.',
      expand: false
    },
    {
      titulo: '9. ¿Ofrecen asesoría para elegir productos?',
      respuesta: 'Sí, nuestro equipo de expertos está disponible para ayudarte a elegir el producto adecuado según tus necesidades. Escríbenos a nuestro correo o utiliza nuestro chat de atención en la página para recibir asistencia.',
      expand: false
    },
    {
      titulo: '10. ¿Cómo puedo contactarlos si tengo otra pregunta?',
      respuesta: 'Puedes contactarnos directamente a través de nuestro correo electrónico o llamando a nuestro número de atención al cliente: +56 2 9876 5432. También puedes visitar nuestra página de contacto para más detalles.',
      expand: false
    }
  ];

    // Método para alternar el estado de expansión
    toggleExpand(pregunta: any) {
      pregunta.expand = !pregunta.expand;
    }

}
