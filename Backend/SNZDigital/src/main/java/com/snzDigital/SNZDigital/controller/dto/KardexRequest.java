package com.snzDigital.SNZDigital.controller.dto;

import java.time.LocalDate;

public class KardexRequest {

    private Long productoProductId; // ID del producto asociado
    private LocalDate fecha;        // Fecha del movimiento
    private Integer entrada;        // Cantidad que entra al inventario
    private Integer salida;         // Cantidad que sale del inventario
    private String detalle;         // Detalle o descripción del movimiento

    // Getters y Setters
    public Long getProductoProductId() {
        return productoProductId;
    }

    public void setProductoProductId(Long productoProductId) {
        this.productoProductId = productoProductId;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getEntrada() {
        return entrada;
    }

    public void setEntrada(Integer entrada) {
        this.entrada = entrada;
    }

    public Integer getSalida() {
        return salida;
    }

    public void setSalida(Integer salida) {
        this.salida = salida;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
}
