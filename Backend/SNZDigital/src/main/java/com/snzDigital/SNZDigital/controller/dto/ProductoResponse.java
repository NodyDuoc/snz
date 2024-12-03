package com.snzDigital.SNZDigital.controller.dto;

public class ProductoResponse {

    private String message;
    private int statusCode;
    private Object data;

    private Long productId;
    private String productName;
    private String descripcion;
    private Integer status;
    private Number precio;
    private Long categoriaCatId;
    private String imagen; // En formato Base64
    private String marca; // Nuevo campo de marca
    private Integer inventario; // Nuevo campo inventario
    private Integer inventarioDisponible; // Nuevo campo inventarioDisponible
    private Integer reserva; // Nuevo campo reserva

    public ProductoResponse(String message, int statusCode, Object data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    public ProductoResponse(Long productId, String productName, String descripcion, Integer status, String imagen, String message,
                            Long categoriaCatId, String marca, Integer inventario, Integer inventarioDisponible, Integer reserva) {
        this.productId = productId;
        this.productName = productName;
        this.descripcion = descripcion;
        this.status = status;
        this.imagen = imagen;
        this.message = message;
        this.categoriaCatId = categoriaCatId;
        this.marca = marca;
        this.inventario = inventario;
        this.inventarioDisponible = inventarioDisponible;
        this.reserva = reserva;
    }

    // Getters y Setters
    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

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

    public Number getPrecio() {
        return precio;
    }

    public void setPrecio(Number precio) {
        this.precio = precio;
    }

    public Long getCategoriaCatId() {
        return categoriaCatId;
    }

    public void setCategoriaCatId(Long categoriaCatId) {
        this.categoriaCatId = categoriaCatId;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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
