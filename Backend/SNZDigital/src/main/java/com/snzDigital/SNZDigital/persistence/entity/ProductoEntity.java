package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "STATUS")
    private Integer status; // 1 = Activo, 0 = Inactivo

    @Column(name = "IMAGEN", columnDefinition = "bytea", nullable = true)
    private byte[] imagen;

    @Column(name = "INVENTARIO", nullable = false)
    private Integer inventario;

    @Column(name = "INVENTARIO_DISPONIBLE", nullable = false)
    private Integer inventarioDisponible;

    @Column(name = "RESERVA", nullable = false)
    private Integer reserva;

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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
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
