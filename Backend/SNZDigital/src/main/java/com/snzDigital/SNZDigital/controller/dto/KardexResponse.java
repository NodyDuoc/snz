package com.snzDigital.SNZDigital.controller.dto;

public class KardexResponse {
    private Integer kardexId;
    private String mensaje;
    private boolean exitoso;

    public KardexResponse(Integer kardexId, String mensaje, boolean exitoso) {
        this.kardexId = kardexId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    // Getters and Setters
    public Integer getKardexId() {
        return kardexId;
    }

    public void setKardexId(Integer kardexId) {
        this.kardexId = kardexId;
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
