package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "DETALLE_CARRITO")
public class DetalleCarritoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "detail_car_seq")
    @SequenceGenerator(name = "detail_car_seq", sequenceName = "SNZ1.DETAIL_CAR_SEQ", allocationSize = 1)
    @Column(name = "ID_DETALLE_CARRITO")
    private Integer idDetalleCarrito;

    @Column(name = "ID_CARRITO", nullable = false)
    private Integer idCarrito;

    @Column(name = "PRODUCTID", nullable = false)
    private Integer productId;

    @Column(name = "CANTIDAD")
    private Integer cantidad;

    @Column(name = "COSTO_UNITARIO")
    private Double costoUnitario;

    @Column(name = "COSTO_TOTAL")
    private Double costoTotal;

    // Getters and Setters
    public Integer getIdDetalleCarrito() {
        return idDetalleCarrito;
    }

    public void setIdDetalleCarrito(Integer idDetalleCarrito) {
        this.idDetalleCarrito = idDetalleCarrito;
    }

    public Integer getIdCarrito() {
        return idCarrito;
    }

    public void setIdCarrito(Integer idCarrito) {
        this.idCarrito = idCarrito;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getCostoUnitario() {
        return costoUnitario;
    }

    public void setCostoUnitario(Double costoUnitario) {
        this.costoUnitario = costoUnitario;
    }

    public Double getCostoTotal() {
        return costoTotal;
    }

    public void setCostoTotal(Double costoTotal) {
        this.costoTotal = costoTotal;
    }
}
