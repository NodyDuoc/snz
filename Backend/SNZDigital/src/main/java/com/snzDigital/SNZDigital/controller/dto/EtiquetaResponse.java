package com.snzDigital.SNZDigital.controller.dto;

public class EtiquetaResponse {
    private Integer etiquetaId;
    private String mensaje;
    private boolean exitoso;

    // Constructor, getters y setters
    public EtiquetaResponse(Integer etiquetaId, String mensaje, boolean exitoso) {
        this.etiquetaId = etiquetaId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    public Integer getEtiquetaId() {
        return etiquetaId;
    }

    public void setEtiquetaId(Integer etiquetaId) {
        this.etiquetaId = etiquetaId;
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
