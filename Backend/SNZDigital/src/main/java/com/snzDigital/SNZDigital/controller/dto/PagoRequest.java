package com.snzDigital.SNZDigital.controller.dto;

public class PagoRequest {
    private Integer amount;
    private String order;
    private String subject;
    private String email;
    private String currency;
    private String urlreturn;
    private String urlnotify;

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

    // Getters y setters para todos los campos
    // (O utiliza Lombok para evitar escribirlos manualmente)
}
