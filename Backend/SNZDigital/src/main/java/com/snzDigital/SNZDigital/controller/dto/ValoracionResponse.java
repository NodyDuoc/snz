package com.snzDigital.SNZDigital.controller.dto;

public class ValoracionResponse {
    private Integer valid;
    private String mensaje;
    private boolean exitoso;

    // Getters and Setters
    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public boolean isExitoso() {
        return exitoso;
    }

    public void setExitoso(boolean exitoso) {
        this.exitoso = exitoso;
    }
}
