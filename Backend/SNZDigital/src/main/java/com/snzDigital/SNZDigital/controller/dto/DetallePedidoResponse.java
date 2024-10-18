package com.snzDigital.SNZDigital.controller.dto;

public class DetallePedidoResponse {

    private Integer detPedId;
    private Double precioUnitario;
    private Integer cantidad;
    private Long pedidoId;

    // Constructor vacío
    public DetallePedidoResponse() {}

    // Constructor con parámetros
    public DetallePedidoResponse(Integer detPedId, Double precioUnitario, Integer cantidad, Long pedidoId) {
        this.detPedId = detPedId;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.pedidoId = pedidoId;
    }

    // Getters y Setters
    public Integer getDetPedId() {
        return detPedId;
    }

    public void setDetPedId(Integer detPedId) {
        this.detPedId = detPedId;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }
}
