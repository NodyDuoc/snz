package com.snzDigital.SNZDigital.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;


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


