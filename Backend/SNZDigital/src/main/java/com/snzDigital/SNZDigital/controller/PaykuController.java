package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import com.snzDigital.SNZDigital.service.PaykuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8100") // Cambia por el origen de tu frontend
@RestController
@RequestMapping("/api/payku")
public class PaykuController {

    @Autowired
    private PaykuService paykuService;

    @PostMapping("/create-transaction")
    public ResponseEntity<String> createTransaction(@RequestBody PagoRequest pagoRequest) {
        try {
            String paykuResponse = paykuService.createTransaction(
                    pagoRequest.getAmount().toString(),
                    pagoRequest.getOrder(),
                    pagoRequest.getSubject(),
                    pagoRequest.getEmail(),
                    pagoRequest.getCurrency(),
                    pagoRequest.getUrlreturn(),
                    pagoRequest.getUrlnotify()
            );
            return ResponseEntity.ok(paykuResponse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // Endpoint para manejar la respuesta de Payku
    @PostMapping("/response")
    public ResponseEntity<String> handlePaykuResponse(@RequestParam("token") String token) {
        try {
            // Verifica el estado de la transacción usando el token
            String status = paykuService.checkTransactionStatus(token);

            if ("approved".equalsIgnoreCase(status)) {
                return ResponseEntity.ok("Transacción aprobada");
            } else if ("rejected".equalsIgnoreCase(status)) {
                return ResponseEntity.status(400).body("Transacción rechazada");
            } else {
                return ResponseEntity.status(400).body("Estado de transacción desconocido");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al verificar el estado de la transacción: " + e.getMessage());
        }
    }
}