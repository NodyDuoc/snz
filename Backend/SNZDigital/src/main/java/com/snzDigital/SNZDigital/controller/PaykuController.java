package com.snzDigital.SNZDigital.controller;

import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import com.snzDigital.SNZDigital.controller.dto.PaykuResponse;
import com.snzDigital.SNZDigital.service.PaykuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8100") // Cambia por el origen de tu frontend
@RestController
@RequestMapping("/api/payku")
public class PaykuController {

    private static final String PAYKU_API_URL = "https://des.payku.cl/api/transaction/"; // URL de Payku para transacciones
    private static final String PAYKU_PUBLIC_TOKEN = "tkpu58d7d5f3f56c2141852d11598f89"; // Token público de Payku

    @Autowired
    private PaykuService paykuService;

    @PostMapping("/create-transaction")
    public ResponseEntity<?> createTransaction(@RequestBody PagoRequest pagoRequest) {
        try {
            // 1. Crea el payload con los datos de la transacción.
            Map<String, Object> payload = new HashMap<>();
            payload.put("email", pagoRequest.getEmail());
            payload.put("order", pagoRequest.getOrder());
            payload.put("subject", pagoRequest.getSubject());
            payload.put("amount", pagoRequest.getAmount());
            payload.put("currency", pagoRequest.getCurrency());
            payload.put("urlreturn", pagoRequest.getUrlreturn());
            payload.put("urlnotify", pagoRequest.getUrlnotify());

            // 2. Configura los headers, incluyendo el token público de Payku.
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + PAYKU_PUBLIC_TOKEN); // Usa una variable de entorno en producción
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 3. Realiza la solicitud a Payku usando RestTemplate.
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    PAYKU_API_URL, request, Map.class);

            // 4. Revisa la respuesta de Payku.
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la transacción");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }



    @PostMapping("/response")
    public ResponseEntity<Map<String, String>> handlePaykuResponse(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        if (token == null) {
            return ResponseEntity.status(400).body(Map.of("error", "El token es requerido"));
        }
        try {
            // Verifica el estado de la transacción usando el servicio de Payku
            String status = paykuService.checkTransactionStatus(token);
            if ("success".equalsIgnoreCase(status)) {
                return ResponseEntity.ok(Map.of("message", "Transacción aprobada"));
            } else {
                return ResponseEntity.status(400).body(Map.of("error", "Transacción rechazada"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error al verificar el estado de la transacción: " + e.getMessage()));
        }
    }



}
