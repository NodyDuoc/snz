package com.snzDigital.SNZDigital.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


@Service
public class PaykuService {

    @Value("${payku.api_url}")
    private String apiUrl;

    @Value("${payku.secret_key}")
    private String secretKey;

    private final RestTemplate restTemplate;

    public PaykuService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private String generateSignature(String amount, String orderId) throws NoSuchAlgorithmException {
        String data = amount + "|" + orderId + "|" + secretKey;
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(data.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public String createTransaction(String amount, String order, String subject, String email, String currency, String urlreturn, String urlnotify) throws NoSuchAlgorithmException {
        String signature = generateSignature(amount, order);
        PaykuRequest request = new PaykuRequest(
                Integer.parseInt(amount), order, subject, email, currency, urlreturn, urlnotify, signature
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + secretKey);

        HttpEntity<PaykuRequest> entity = new HttpEntity<>(request, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);
        return response.getBody();
    }

    public String checkTransactionStatus(String token) {
        // Construye la URL para verificar el estado de la transacción usando el token
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .path("/checkTransactionStatus") // Ruta que debe coincidir con la documentación de Payku
                .queryParam("token", token)
                .toUriString();

        try {
            // Establece el encabezado de autenticación
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + secretKey);

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            // Realiza la solicitud GET para obtener el estado de la transacción
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Si la respuesta es exitosa, analiza el estado y devuélvelo
            if (response.getStatusCode().is2xxSuccessful()) {
                // Extrae y procesa la respuesta de la API (asumiendo que es JSON con campo "status")
                // Actualiza este análisis según la estructura real de la respuesta de Payku
                JSONObject jsonResponse = new JSONObject(response.getBody());
                String status = jsonResponse.optString("status");

                return status.equalsIgnoreCase("approved") ? "approved" : "rejected";
            } else {
                return "Estado de transacción desconocido";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al verificar el estado de la transacción: " + e.getMessage();
        }
    }


    // Modificación de la clase interna para asegurar que amount y orderId sean String
    public static class PaykuRequest {
        private Integer amount;
        private String order;
        private String subject;
        private String email;
        private String currency;
        private String urlreturn;
        private String urlnotify;
        private String signature;

        public PaykuRequest(Integer amount, String order, String subject, String email, String currency, String urlreturn, String urlnotify, String signature) {
            this.amount = amount;
            this.order = order;
            this.subject = subject;
            this.email = email;
            this.currency = currency;
            this.urlreturn = urlreturn;
            this.urlnotify = urlnotify;
            this.signature = signature;
        }

        // Getters y Setters
        public Integer getAmount() {
            return amount;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }

        public String getOrder() {
            return order;
        }

        public void setOrder(String order) {
            this.order = order;
        }

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getUrlreturn() {
            return urlreturn;
        }

        public void setUrlreturn(String urlreturn) {
            this.urlreturn = urlreturn;
        }

        public String getUrlnotify() {
            return urlnotify;
        }

        public void setUrlnotify(String urlnotify) {
            this.urlnotify = urlnotify;
        }

        public String getSignature() {
            return signature;
        }

        public void setSignature(String signature) {
            this.signature = signature;
        }
    }

}


