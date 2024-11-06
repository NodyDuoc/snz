package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ped_seq")
    @SequenceGenerator(name = "ped_seq", sequenceName = "PED_SEQ", allocationSize = 1)
    @Column(name = "PEDIDOID")
    private Long pedidoId;

    @Column(name = "USUARIOS_USERID", nullable = false)
    private Long usuariosUserId;

    @Column(name = "PRODUCTO_PRODUCTID", nullable = false)
    private Long productoProductId;

    @Column(name = "COMUNA", length = 100)
    private String comuna;

    @Column(name = "DIRECCION", length = 100)
    private String direccion;

    @Column(name = "DETALLE", length = 100)
    private String detalle;

    @Column(name = "PRECIO")
    private Double precio;

    @Column(name = "CANTIDAD", nullable = false)
    private Integer cantidad;

    @Column(name = "ESTADO", length = 100)
    private String estado;

    // Getters y Setters

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getUsuariosUserId() {
        return usuariosUserId;
    }

    public void setUsuariosUserId(Long usuariosUserId) {
        this.usuariosUserId = usuariosUserId;
    }

    public Long getProductoProductId() {
        return productoProductId;
    }

    public void setProductoProductId(Long productoProductId) {
        this.productoProductId = productoProductId;
    }

    public String getComuna() {
        return comuna;
    }

    public void setComuna(String comuna) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
