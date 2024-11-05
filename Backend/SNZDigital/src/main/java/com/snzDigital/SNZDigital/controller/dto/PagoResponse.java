package com.snzDigital.SNZDigital.controller.dto;

public class PagoResponse {
    private String id;
    private String status;
    private String paymentUrl;

    // Constructor por defecto
    public PagoResponse() {}

    // Constructor con parámetros
    public PagoResponse(String id, String status, String paymentUrl) {
        this.id = id;
        this.status = status;
        this.paymentUrl = paymentUrl;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentUrl() {
        return paymentUrl;
    }

    // (Opcional) Método toString para facilitar la depuración
    @Override
    public String toString() {
        return "PagoResponse{" +
                "id='" + id + '\'' +
                ", status='" + status + '\'' +
                ", paymentUrl='" + paymentUrl + '\'' +
                '}';
    }
}