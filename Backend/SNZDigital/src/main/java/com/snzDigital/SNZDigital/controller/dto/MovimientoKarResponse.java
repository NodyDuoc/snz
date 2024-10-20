package com.snzDigital.SNZDigital.controller.dto;

public class MovimientoKarResponse {
    private Integer movId;
    private String mensaje;
    private boolean exitoso;

    public MovimientoKarResponse(Integer movId, String mensaje, boolean exitoso) {
        this.movId = movId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    // Getters and Setters
    public Integer getMovId() {
        return movId;
    }

    public void setMovId(Integer movId) {
        this.movId = movId;
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
