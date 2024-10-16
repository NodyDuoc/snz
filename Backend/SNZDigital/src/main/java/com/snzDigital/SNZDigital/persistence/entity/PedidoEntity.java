package com.snzDigital.SNZDigital.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pedido")
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pedido_seq")
    @SequenceGenerator(name = "pedido_seq", sequenceName = "PEDIDO_SEQ", allocationSize = 1)
    @Column(name = "PEDIDO_ID")
    private Long pedidoId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId; // Relación con usuario

    @Column(name = "PRODUCT_ID", nullable = false)
    private Long productId; // Relación con producto

    @Column(name = "CANTIDAD", nullable = false)
    private Integer cantidad;

    @Column(name = "TOTAL", nullable = false)
    private Double total;

    // Getters y Setters
    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
