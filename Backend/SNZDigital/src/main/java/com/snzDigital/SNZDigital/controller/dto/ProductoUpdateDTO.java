package com.snzDigital.SNZDigital.controller.dto;

public class ProductoUpdateDTO {
    private String productName;
    private String descripcion;
    private Integer status;
    private Double precio;
    private byte[] imagen; // Almacena la imagen como un arreglo de bytes
    private String marca;
    private Integer inventario;
    private Integer inventarioDisponible;
    private Integer reserva;

    // Getters y Setters

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
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
