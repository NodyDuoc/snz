package com.snzDigital.SNZDigital.service;
import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import org.springframework.stereotype.Service;

@Service
public class WebpayService {
    public String generarPago(PagoRequest pagoRequest) {
        // Aquí implementa la lógica para interactuar con Webpay
        // Por ejemplo, prepara la solicitud y llama a la API de Webpay

        // Devuelve la URL de pago generada
        return "https://url-de-pago.webpay.cl"; // Cambia esto según tu lógica
    }
}
