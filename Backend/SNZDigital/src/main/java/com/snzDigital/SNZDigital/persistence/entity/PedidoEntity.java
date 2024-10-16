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

    @Column(name = "COMUNA", length = 40)
    private String comuna;

    @Column(name = "DIRECCION", length = 40)
    private String direccion;

    @Column(name = "DETALLE", length = 40)
    private String detalle;

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
}
