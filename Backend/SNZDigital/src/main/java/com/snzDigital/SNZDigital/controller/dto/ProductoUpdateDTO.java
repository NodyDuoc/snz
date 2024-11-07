package com.snzDigital.SNZDigital.controller.dto;

public class ProductoUpdateDTO {
    private String productName;
    private String descripcion;
    private Double precio;
    private byte[] imagen; // Almacena la imagen como un arreglo de bytes

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

    // Getters y Setters
}
