package com.snzDigital.SNZDigital.controller.dto;

public class ProductoResponse {

    private String message;
    private int statusCode;
    private Object data;


    private Long productId;
    private String productName;
    private String descripcion;
    private Number Precio;
    private Long CategoriaCatId;
    private String imagen; // En formato Base64



    public ProductoResponse(String message, int statusCode, Object data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;



    }
    public ProductoResponse(Long productId,String productName, String descripcion, String imagen, String message, Long CategoriaCatId) {
        this.productId = productId;
        this.productName = productName;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.message = message;
        this.CategoriaCatId = CategoriaCatId;
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
}
