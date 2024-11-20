package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PROD_SEQ")
    @SequenceGenerator(name = "PROD_SEQ", sequenceName = "PROD_SEQ", allocationSize = 1)
    @Column(name = "PRODUCTID")
    private Long productId;

    @Column(name = "PRODUCTNAME", nullable = false)
    private String productName;

    @Column(name = "DESCRIPCION", columnDefinition = "CLOB")
    private String descripcion;

    @Column(name = "PRECIO", nullable = false)
    private Double precio;

    @Column(name = "CATEGORIA_CATID")
    private Long categoriaCatId;

    @Column(name = "MARCA")
    private String marca;

    @Column(name = "STATUS", nullable = false, columnDefinition = "NUMBER(1) DEFAULT 1")
    private Integer status = 1; //

    @Column(name = "IMAGEN", columnDefinition = "bytea", nullable = true)
    private byte[] imagen;

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

}
