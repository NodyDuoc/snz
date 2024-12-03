package com.snzDigital.SNZDigital.controller.dto;

public class ProductoInventarioResponse {
    private Integer inventario;
    private Integer inventarioDisponible;
    private Integer reserva;

    public ProductoInventarioResponse(Integer inventario, Integer inventarioDisponible, Integer reserva) {
        this.inventario = inventario;
        this.inventarioDisponible = inventarioDisponible;
        this.reserva = reserva;
    }

    public Integer getInventario() {
        return inventario;
    }

    public void setInventario(Integer inventario) {
        this.inventario = inventario;
    }

    public Integer getInventarioDisponible() {
        return inventarioDisponible;
    }

    public void setInventarioDisponible(Integer inventarioDisponible) {
        this.inventarioDisponible = inventarioDisponible;
    }

    public Integer getReserva() {
        return reserva;
    }

    public void setReserva(Integer reserva) {
        this.reserva = reserva;
    }
}
