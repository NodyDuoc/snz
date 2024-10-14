package com.snzDigital.SNZDigital.controller.dto;

public class CategoriaResponse {
    private Integer catId;
    private String mensaje;
    private boolean exitoso;

    // Constructor, getters y setters
    public CategoriaResponse(Integer catId, String mensaje, boolean exitoso) {
        this.catId = catId;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    public Integer getCatId() {
        return catId;
    }

    public void setCatId(Integer catId) {
        this.catId = catId;
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
