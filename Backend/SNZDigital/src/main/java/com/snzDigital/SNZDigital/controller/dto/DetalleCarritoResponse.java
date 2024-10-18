package com.snzDigital.SNZDigital.controller.dto;

public class DetalleCarritoResponse {
    private Integer idDetalleCarrito;
    private String mensaje;
    private boolean exitoso;

    public DetalleCarritoResponse(Integer idDetalleCarrito, String mensaje, boolean exitoso) {
        this.idDetalleCarrito = idDetalleCarrito;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    // Getters and Setters
    public Integer getIdDetalleCarrito() {
        return idDetalleCarrito;
    }

    public void setIdDetalleCarrito(Integer idDetalleCarrito) {
        this.idDetalleCarrito = idDetalleCarrito;
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
