package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PagoResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.snzDigital.SNZDigital.service.PaykuService;
import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import org.springframework.web.client.RestClientException;

import java.util.Collections;

@RestController
@RequestMapping("/api/payku")
public class PaykuController {

    private final PaykuService paykuService;

    public PaykuController(PaykuService paykuService) {
        this.paykuService = paykuService;
    }

    @PostMapping("/pago")
    public ResponseEntity<?> generarPago(@RequestBody PagoRequest pagoRequest) {
        try {
            PagoResponse pagoResponse = paykuService.generarPago(pagoRequest);
            return ResponseEntity.ok(Collections.singletonMap("paymentUrl", pagoResponse.getPaymentUrl())); // Asegúrate de que esto coincida con el campo correcto de la respuesta.
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al procesar el pago: " + e.getMessage());
        }
    }
}