package com.snzDigital.SNZDigital.service;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.snzDigital.SNZDigital.controller.dto.PagoRequest;
import com.snzDigital.SNZDigital.controller.dto.PagoResponse;
@Service
public class PaykuService {

    private final String paykuUrl = "https://api.payku.cl"; // URL base de Payku
    private final String token = "tkpuc6e0409e96c56484f33569329480";

    public String generarPago(PagoRequest pagoRequest) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");

        HttpEntity<PagoRequest> entity = new HttpEntity<>(pagoRequest, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                paykuUrl + "/payments", HttpMethod.POST, entity, String.class
        );

        return response.getBody();
    }
}
