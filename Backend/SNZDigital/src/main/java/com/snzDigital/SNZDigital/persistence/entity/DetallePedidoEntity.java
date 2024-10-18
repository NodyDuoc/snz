package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "DETALLEPEDIDO")
public class DetallePedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "detail_ped_seq")
    @SequenceGenerator(name = "detail_ped_seq", sequenceName = "SNZ1.DETAIL_PED_SEQ", allocationSize = 1)
    @Column(name = "DETPEDID")
    private Integer detPedId;

    @Column(name = "PRECIOUNITARIO")
    private Double precioUnitario;

    @Column(name = "CANTIDAD")
    private Integer cantidad;

    @Column(name = "PEDIDO_PEDIDOID")
    private Long pedidoId;

    // Getters y Setters
    public Integer getDetPedId() {
        return detPedId;
    }

    public void setDetPedId(Integer detPedId) {
        this.detPedId = detPedId;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }
}
