package com.snzDigital.SNZDigital.controller.dto;

public class EtiquetaProductoResponse {
    private Integer etiquetaProductoId;
    private String mensaje;
    private boolean exitoso;

    // Constructor, getters y setters
    public EtiquetaProductoResponse(Integer etiquetaProductoId, String mensaje, boolean exitoso) {
        this.etiquetaProductoId = etiquetaProductoId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    public Integer getEtiquetaProductoId() {
        return etiquetaProductoId;
    }

    public void setEtiquetaProductoId(Integer etiquetaProductoId) {
        this.etiquetaProductoId = etiquetaProductoId;
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
