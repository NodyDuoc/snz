package com.snzDigital.SNZDigital.controller.dto;

public class CarritoResponse {

    private Integer idCarrito; // Cambiado a Integer
    private Integer usuarioIdUser; // Cambiado a Integer
    private String mensaje;
    private boolean exitoso;

    // Constructor
    public CarritoResponse(Integer idCarrito, Integer usuarioIdUser, String mensaje, boolean exitoso) {
        this.idCarrito = idCarrito;
        this.usuarioIdUser = usuarioIdUser;
        this.mensaje = mensaje;
        this.exitoso = exitoso;
    }

    // Getters and Setters
    public Integer getIdCarrito() {
        return idCarrito;
    }

    public void setIdCarrito(Integer idCarrito) {
        this.idCarrito = idCarrito;
    }

    public Integer getUsuarioIdUser() {
        return usuarioIdUser;
    }

    public void setUsuarioIdUser(Integer usuarioIdUser) {
        this.usuarioIdUser = usuarioIdUser;
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
