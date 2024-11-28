package com.snzDigital.SNZDigital.controller.dto;

public class GuiaResponse {
    private Integer guiaId;
    private String mensaje;
    private boolean exitoso;

    // Constructor, getters y setters
    public GuiaResponse(Integer guiaId, String mensaje, boolean exitoso) {
        this.guiaId = guiaId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    public Integer getGuiaId() {
        return guiaId;
    }

    public void setGuiaId(Integer guiaId) {
        this.guiaId = guiaId;
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
