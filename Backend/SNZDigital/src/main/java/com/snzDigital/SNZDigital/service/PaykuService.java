package com.snzDigital.SNZDigital.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import com.snzDigital.SNZDigital.controller.dto.PagoResponse;

@Service
public class PaykuService {

    private final String paykuUrl = "https://api.payku.cl"; // URL base de Payku
    private final String token = "tkpu91a3b9635aee360ad5a3b4a7f73e";

    public PagoResponse generarPago(PagoRequest pagoRequest) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");

        HttpEntity<PagoRequest> entity = new HttpEntity<>(pagoRequest, headers);

        try {
            ResponseEntity<PagoResponse> response = restTemplate.exchange(
                    paykuUrl + "/payments", HttpMethod.POST, entity, PagoResponse.class
            );

            return response.getBody(); // Puedes regresar el objeto PagoResponse completo
        } catch (RestClientException e) {
            // Maneja el error adecuadamente
            throw new RuntimeException("Error al comunicarse con Payku: " + e.getMessage(), e);
        }
    }
}