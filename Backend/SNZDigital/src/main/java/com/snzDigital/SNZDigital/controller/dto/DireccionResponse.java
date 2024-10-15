package com.snzDigital.SNZDigital.controller.dto;

public class DireccionResponse {
    private Long dirId;
    private String mensaje;
    private boolean exitoso;

    // Constructor, getters y setters
    public DireccionResponse(Long dirId, String mensaje, boolean exitoso) {
        this.dirId = dirId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    public Long getDirId() {
        return dirId;
    }

    public void setDirId(Long dirId) {
        this.dirId = dirId;
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
