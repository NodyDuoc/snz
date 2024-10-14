package com.snzDigital.SNZDigital.persistence.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class ProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "producto_seq")
    @SequenceGenerator(name = "producto_seq", sequenceName = "PRODUCTO_SEQ", allocationSize = 1)
    @Column(name = "PRODUCTID")
    private Long productId;

    @Column(name = "PRODUCTNAME", nullable = false)
    private String productName;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @Column(name = "PRECIO", nullable = false)
    private Double precio;

    @Column(name = "CATEGORIA_CATID")
    private Long categoriaCatId;

    // Getters y Setters

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

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Long getCategoriaCatId() {
        return categoriaCatId;
    }

    public void setCategoriaCatId(Long categoriaCatId) {
        this.categoriaCatId = categoriaCatId;
    }
}